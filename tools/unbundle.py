#!/usr/bin/env python3
"""Turn a Claude Design *bundled* page export back into repo project-source form.

    tools/unbundle.py <bundle.html>              # whole-site bundle
    tools/unbundle.py <bundle.html> <page-name>  # single-page bundle

The "download as single file" export is one self-contained HTML: a loader
script plus three JSON islands — a manifest of every asset (base64, some
gzipped) keyed by uuid, the page template with those uuids substituted for
every src/href, and the external-resource list (React from unpkg).

tools/build.sh consumes the *project source* export instead: .dc.html pages
that link `_ds/<id>/...` and `assets/...`. This script bridges the two, so a
page authored in a different Claude Design project can land in the repo in the
same shape as the rest and be composed by tools/compose.sh:

  - assets already in the repo are recognised by content hash and keep their
    paths, so re-running produces no diff
  - <image-slot src> artwork that is already in image-slots.state.json loses
    its src attribute, which is how the project source carries it: the sidecar
    is the store, the bundle only inlines it to render standalone
  - helmet <style> blocks are written back out as the design-system stylesheets
    they were inlined from; the one that is the concatenation of the others is
    `styles.css` and becomes @imports again, so the page links it alone instead
    of loading every token sheet twice
  - webfonts are self-hosted as woff2. The bundle also carries woff/ttf/svg
    fallbacks for the icon font (~8MB) that no browser reaching this site would
    pick over woff2, so those sources are dropped from the src: list.

A *whole-site* bundle carries all eight pages instead of one. Its root template
is not a page at all — it is a hash router that mounts each page in turn so the
single file can be clicked through — so with no <page-name> the pages are taken
from the manifest and the router is used only for the design system and the
bridge stylesheet it inlines. Each page's own `_ds/<project-id>/` links are
repointed at the reconstructed design system; the runtime scripts the pages load
are expected to be in the repo already, and any that are not are named in the
report.
"""

import base64
import gzip
import hashlib
import json
import os
import re
import sys
from urllib.parse import unquote

UUID = r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

# Design-system stylesheet names, matched on the comment each sheet opens with.
# A sheet whose header matches nothing is written as tokens/part-<n>.css and
# named in the report, so an unrecognised one is visible rather than silent.
SHEET_NAMES = [
    ('Webfonts',       'tokens/fonts.css'),
    ('colour tokens',  'tokens/colors.css'),
    ('Type families',  'tokens/typography.css'),
    ('Spacing',        'tokens/spacing.css'),
    ('Shadows',        'tokens/shadows.css'),
    ('Icon substitut', 'tokens/icons.css'),
    ('component styles', 'tokens/components.css'),
]

SUBSET_RE = re.compile(r'/\*\s*([a-z0-9-]+)\s*\*/\s*$')

# The design system's bridge sheet — legacy token names mapped onto Vela Ranks
# values. The pages link it as a file; the router shell inlines it, so that is
# where a whole-site bundle carries it.
BRIDGE_MARK = 'legacy token names remapped onto Vela Ranks'
BRIDGE_PATH = 'vela-bridge.css'

# A relative src/href, i.e. one that names a file this repo has to ship. Skips
# absolute URLs, fragments and the runtime's {{ ... }} template vars.
LOCAL_REF = re.compile(r'(?:src|href)="(?!\{\{)([^"{}:#][^"{}:]*)"')


def page_name(res_id):
    """Repo page name for an ext-resource id like './Bina%2024%20Jam.dc.html'."""
    base = os.path.basename(unquote(res_id.split('?')[0]))
    stem = slug(re.sub(r'\.dc\.html$', '', base, flags=re.I))
    return 'index' if stem in ('bina-24-jam', 'home') else stem


def repoint_ds(text, DS):
    """Point a page's design-system links at the reconstructed one.

    A page out of the export links every token sheet *and* the styles.css that
    imports them, under the design system's full project id. The reconstruction
    lives under the short namespace id and its styles.css carries the imports,
    so the whole run of links collapses to that one sheet.
    """
    m = re.search(r'_ds/([^/"]+)/_ds_bundle\.js', text)
    if not m:
        return None
    src = '_ds/%s/' % m.group(1)
    link = re.compile(r'[ \t]*<link rel="stylesheet" href="%s[^"]*\.css">\n'
                      % re.escape(src))
    first = link.search(text)
    if not first:
        return None
    text = (text[:first.start()]
            + '<link rel="stylesheet" href="%s/styles.css">\n' % DS
            + link.sub('', text[first.start():]))
    return text.replace(src, DS + '/')


def slug(s):
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')


def read_bundle(path):
    """Pull the three JSON islands out of the bundle."""
    text = open(path, encoding='utf-8').read()
    out = {}
    for kind in ('manifest', 'template', 'ext_resources'):
        m = re.search(r'<script type="__bundler/%s">\s*(.*?)\s*</script>' % kind,
                      text, re.S)
        if not m:
            sys.exit('!! bundle has no __bundler/%s island' % kind)
        out[kind] = json.loads(m.group(1))
    return out


def decode(entry):
    raw = base64.b64decode(entry['data'])
    return gzip.decompress(raw) if entry.get('compressed') else raw


def repo_index(repo):
    """sha256 -> existing repo path, so known assets keep their names."""
    idx = {}
    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in ('.git', 'design-source')]
        for f in files:
            p = os.path.join(root, f)
            try:
                idx.setdefault(hashlib.sha256(open(p, 'rb').read()).hexdigest(),
                               os.path.relpath(p, repo))
            except OSError:
                pass
    return idx


def slot_artwork(repo):
    """sha256 -> slot id for artwork already stored in the image-slot sidecar."""
    out = {}
    path = os.path.join(repo, 'image-slots.state.json')
    if not os.path.exists(path):
        return out
    for sid, v in json.load(open(path)).items():
        u = (v or {}).get('u', '')
        if u.startswith('data:') and ',' in u:
            try:
                raw = base64.b64decode(u.split(',', 1)[1])
            except Exception:
                continue
            out[hashlib.sha256(raw).hexdigest()] = sid
    return out


def split_stylesheets(helmet):
    """Return (sheets, aggregate_index, import_order) for the helmet's styles.

    The design system's styles.css is only @imports, so the bundler inlined it
    as one block holding every other sheet concatenated. Finding that block
    tells us which blocks are design-system sheets and in what order they were
    imported; the rest are the page's own inline styles.
    """
    blocks = [(m.start(), m.end(), m.group(1))
              for m in re.finditer(r'<style>(.*?)</style>', helmet, re.S)]
    for i, (_, _, agg) in enumerate(blocks):
        order, pos, pool = [], 0, [j for j in range(len(blocks)) if j != i]
        while pos < len(agg) and pool:
            for j in pool:
                if agg.startswith(blocks[j][2], pos):
                    order.append(j)
                    pos += len(blocks[j][2])
                    pool.remove(j)
                    break
            else:
                if agg[pos] in ' \t\r\n':
                    pos += 1
                    continue
                break
        # The aggregate holds a subset: every design-system sheet, but not the
        # page's own inline styles. Success is having consumed all of it.
        if len(order) > 1 and not agg[pos:].strip():
            return blocks, i, order
    return blocks, None, []


def main():
    if len(sys.argv) not in (2, 3):
        sys.exit('usage: tools/unbundle.py <bundle.html> [page-name]')
    bundle_path = sys.argv[1]
    page = sys.argv[2] if len(sys.argv) == 3 else None
    repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    b = read_bundle(bundle_path)
    manifest, template = b['manifest'], b['template']
    ext = {e['uuid']: e['id'] for e in b['ext_resources']}

    known, slots = repo_index(repo), slot_artwork(repo)
    blob = {u: decode(e) for u, e in manifest.items()}
    sha = {u: hashlib.sha256(d).hexdigest() for u, d in blob.items()}

    hs, he = template.index('<helmet>'), template.index('</helmet>')
    helmet, body = template[hs + len('<helmet>'):he], template[he:]
    blocks, agg_i, order = split_stylesheets(helmet)
    if agg_i is None:
        sys.exit('!! could not identify the aggregate stylesheet in <helmet>')

    # ── design system id, from the namespace the component bundle declares ──
    ds_uuid = next((u for u, d in blob.items()
                    if d[:40].startswith(b'/* @ds-bundle:')), None)
    if not ds_uuid:
        sys.exit('!! bundle carries no _ds_bundle.js')
    meta = json.loads(re.search(r'/\* @ds-bundle:\s*(\{.*?\}) \*/',
                                blob[ds_uuid].decode('utf-8'), re.S).group(1))
    ns = meta['namespace']                      # e.g. VelaRanksDesignSystem_378a7f
    name, _, tag = ns.rpartition('_')
    DS = '_ds/%s-%s' % (slug(re.sub(r'(?<!^)(?=[A-Z])', '-', name)), tag)

    plan, report = {}, []                       # uuid -> repo path (or None)
    written = []

    def write(path, data):
        full = os.path.join(repo, path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        mode = 'wb' if isinstance(data, bytes) else 'w'
        with open(full, mode, **({} if isinstance(data, bytes)
                                 else {'encoding': 'utf-8'})) as fh:
            fh.write(data)
        written.append(path)

    # ── stylesheets ────────────────────────────────────────────────────────
    sheet_path, fonts = {}, {}                  # block index -> css path
    for n, j in enumerate(order):
        css = blocks[j][2]
        head = css.strip()[:200]
        path = next((p for key, p in SHEET_NAMES if key in head), None)
        if path is None:
            path = 'tokens/part-%d.css' % n
            report.append('  ? unrecognised stylesheet -> %s/%s' % (DS, path))
        sheet_path[j] = path

    # Self-host webfonts as woff2 and drop the fallback sources.
    fallbacks = set()
    for j, path in sheet_path.items():
        css = blocks[j][2]

        def one_face(m):
            face = m.group(0)
            fam = re.search(r"font-family:\s*['\"]?([^;'\"]+)", face)
            wt = re.search(r'font-weight:\s*([^;]+)', face)
            st = re.search(r'font-style:\s*([^;]+)', face)
            fam = fam.group(1).strip() if fam else 'font'
            wt = (wt.group(1).strip() if wt else '400').split()[0]
            italic = bool(st and 'italic' in st.group(1))
            # An svg-font source carries a #<family> fragment after the uuid.
            srcs = re.findall(r'url\("(%s)(?:#[^"]*)?"\)\s*format\('
                              r'\s*[\'"]?([a-z0-9]+)' % UUID, face)
            keep = [(u, f) for u, f in srcs if f == 'woff2'] or srcs[:1]
            fallbacks.update(u for u, _ in srcs if (u, _) not in keep)
            parts = []
            for u, fmt in keep:
                # One name per file, not per face: Google's css2 output serves
                # the same woff2 for every weight of a family+subset, so naming
                # by weight would promise files that were never written.
                if u in fonts:
                    base = os.path.basename(fonts[u])
                else:
                    sub = ''
                    # css2 comments each face with the subset it covers.
                    pre = css[:m.start()].rstrip().rsplit('\n', 1)[-1]
                    sm = SUBSET_RE.search(pre.strip())
                    if sm:
                        sub = '-' + sm.group(1)
                    base = '%s-%s%s%s.%s' % (slug(fam), wt,
                                             '-italic' if italic else '', sub,
                                             fmt)
                    fonts[u] = '%s/fonts/%s' % (DS, base)
                parts.append('url("../fonts/%s") format(\'%s\')' % (base, fmt))
            return re.sub(r'src:[^;]+;', 'src: %s;' % ', '.join(parts), face,
                          count=1)

        css = re.sub(r'@font-face\s*\{[^}]*\}', one_face, css, flags=re.S)
        write('%s/%s' % (DS, path), css)
        blocks[j] = (blocks[j][0], blocks[j][1], css)

    for u, rel in fonts.items():
        write(rel, blob[u])
    dropped = sorted(fallbacks - set(fonts))
    for u in dropped:
        plan[u] = None

    # styles.css: the @import list the aggregate block was expanded from.
    write('%s/styles.css' % DS,
          ''.join('@import "%s";\n' % sheet_path[j] for j in order))

    # ── scripts ────────────────────────────────────────────────────────────
    plan[ds_uuid] = '%s/_ds_bundle.js' % DS
    write(plan[ds_uuid], blob[ds_uuid])

    # ── every other asset ──────────────────────────────────────────────────
    for u in manifest:
        if u in plan or u in fonts:
            continue
        if u in ext:                       # React: support.js maps it at runtime
            plan[u] = ext[u]
            continue
        h = sha[u]
        if h not in known and manifest[u]['mime'].endswith('javascript'):
            alt = blob[u].replace(b"'.image-slots.state.json'",
                                  b"'image-slots.state.json'")
            h2 = hashlib.sha256(alt).hexdigest()
            if h2 in known:
                h = h2
        if h in slots:                     # artwork lives in the sidecar
            plan[u] = None
            continue
        if h in known:                     # already in the repo under its name
            plan[u] = known[h]
            continue
        mime = manifest[u]['mime']
        if mime == 'image/svg+xml':
            m = re.search(r'<[a-z]+ title="([^"]+)"[^>]*>(?:(?!</?[a-z]+ title=)'
                          r'[\s\S]){0,4000}?<img src="%s"' % u, template)
            label = m.group(1) if m else u[:8]
            plan[u] = 'assets/brands/%s.svg' % slug(label)
            write(plan[u], blob[u])
            continue
        plan[u] = 'assets/%s.%s' % (u[:8], mime.rsplit('/', 1)[-1])
        write(plan[u], blob[u])
        report.append('  ? unidentified asset -> %s' % plan[u])

    # ── the pages ──────────────────────────────────────────────────────────
    if page is None:
        pages = [(page_name(e['id']), e['uuid']) for e in b['ext_resources']
                 if re.search(r'\.dc\.html$', unquote(e['id']), re.I)]
        if not pages:
            sys.exit('!! bundle carries no pages; name one to unbundle its '
                     'root template as that page instead')

        bridge = next((css for n, (_s, _e, css) in enumerate(blocks)
                       if n != agg_i and n not in sheet_path
                       and BRIDGE_MARK in css), None)
        if bridge is None:
            sys.exit('!! router shell inlines no bridge stylesheet')
        write(BRIDGE_PATH, bridge.strip() + '\n')

        refs = set()
        for name, uuid in sorted(pages):
            src = repoint_ds(blob[uuid].decode('utf-8'), DS)
            if src is None:
                sys.exit('!! %s links no design system' % name)
            if '_ds/%s/' % os.path.basename(DS) not in src:
                sys.exit('!! %s: design-system links did not repoint' % name)
            write('design-source/pages/%s.dc.html' % name, src)
            refs.update(r.lstrip('./') for r in LOCAL_REF.findall(src))

        # The export leaves out the runtime scripts it did not itself generate,
        # so a page naming a file the repo lacks is a 404 in production. Name
        # them rather than let the build pass quietly.
        for r in sorted(refs):
            if r.endswith('.dc.html'):          # compose.sh rewrites these
                continue
            if not os.path.exists(os.path.join(repo, r)):
                report.append('  ! referenced but not in the repo: %s' % r)

        print('==> design system: %s' % DS)
        print('==> wrote %d files' % len(written))
        for p in sorted(written):
            print('    %-58s %8d B'
                  % (p, os.path.getsize(os.path.join(repo, p))))
        print('==> dropped %d font fallback sources (woff/ttf/svg), %d B'
              % (len(dropped), sum(len(blob[u]) for u in dropped)))
        if report:
            print('==> review:')
            print('\n'.join(report))
        return

    # ── rebuild the page ───────────────────────────────────────────────────
    new_helmet = []
    cut = 0
    for n, (s, e, css) in enumerate(blocks):
        new_helmet.append(helmet[cut:s])
        if n == agg_i:
            new_helmet.append('<link rel="stylesheet" href="%s/styles.css">'
                              % DS)
        elif n in sheet_path:
            pass                           # folded into styles.css
        else:
            new_helmet.append('<style>%s</style>' % css)
        cut = e
    new_helmet.append(helmet[cut:])
    page_src = template[:hs + len('<helmet>')] + ''.join(new_helmet) + body

    # uuid refs -> real paths; a slot whose artwork is in the sidecar and a
    # dropped font fallback lose the attribute that pointed at them.
    page_src = re.sub(r'\s+src="(%s)"' % UUID,
                      lambda m: '' if plan.get(m.group(1)) is None
                      else ' src="%s"' % plan[m.group(1)], page_src)
    page_src = re.sub(r'"(%s)"' % UUID,
                      lambda m: '"%s"' % (plan.get(m.group(1)) or m.group(1)),
                      page_src)
    # The page's own runtime is linked the way the project source links it.
    page_src = page_src.replace('<script src="support.js">',
                                '<script src="./support.js">')
    for f in ('image-slot.js', 'rc-motion.js'):
        page_src = page_src.replace('<script src="%s">' % f,
                                    '<script src="./%s">' % f)

    # The composers address the head by line number (doctype..viewport, then
    # support.js, </head>, <body>), which is how the project-source export
    # lays it out. The bundler emits <html><head> on one line; split it so the
    # generated source is the same shape as every other page's.
    page_src = page_src.replace('<html><head>\n', '<html>\n<head>\n', 1)

    left = re.findall(UUID, page_src)
    if left:
        sys.exit('!! %d unresolved uuid refs remain, first: %s'
                 % (len(left), left[0]))

    write('design-source/pages/%s.dc.html' % page, page_src)

    print('==> design system: %s' % DS)
    print('==> wrote %d files' % len(written))
    for p in sorted(written):
        print('    %-58s %8d B' % (p, os.path.getsize(os.path.join(repo, p))))
    print('==> dropped %d font fallback sources (woff/ttf/svg), %d B'
          % (len(dropped), sum(len(blob[u]) for u in dropped)))
    print('==> %d image-slot srcs folded into image-slots.state.json'
          % sum(1 for u, p in plan.items() if p is None and u not in dropped))
    if report:
        print('==> review:')
        print('\n'.join(report))


if __name__ == '__main__':
    main()
