#!/usr/bin/env python3
"""Convert self-extracting design-tool page bundles into plain static HTML.

Each exported page ships every image, font and script as gzip+base64 inside
the HTML and unpacks them in the browser before anything renders. This script
writes those resources out as content-hashed files under /assets (so Vercel
can cache them forever and pages share them) and emits the page template as
ordinary HTML that the browser can stream and render directly.

Usage: python3 tools/unbundle.py page.html [page.html ...]
Pages are rewritten in place; a page that is no longer a bundle is skipped.
"""
import base64
import gzip
import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSET_DIR = os.path.join(ROOT, 'assets')

EXT = {
    'image/svg+xml': 'svg', 'image/webp': 'webp', 'image/png': 'png',
    'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/avif': 'avif',
    'font/woff2': 'woff2', 'font/woff': 'woff', 'font/ttf': 'ttf',
    'text/javascript': 'js', 'application/javascript': 'js',
    'text/css': 'css', 'text/html': 'html', 'application/json': 'json',
}
REACT_IDS = (
    'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
)


def block(src, kind):
    m = re.search(r'<script type="__bundler/%s">(.*?)</script>' % re.escape(kind), src, re.S)
    return m.group(1) if m else None


def is_bundle(src):
    return block(src, 'manifest') is not None and block(src, 'template') is not None


def write_asset(data, mime):
    ext = EXT.get(mime.split(';')[0].strip(), 'bin')
    name = '%s.%s' % (hashlib.sha256(data).hexdigest()[:16], ext)
    os.makedirs(ASSET_DIR, exist_ok=True)
    path = os.path.join(ASSET_DIR, name)
    if not os.path.exists(path):
        with open(path, 'wb') as f:
            f.write(data)
    return '/assets/' + name


def unbundle(src, extra_head='', body_prefix=''):
    """Return plain HTML for a bundle's template, writing its assets out."""
    manifest = json.loads(block(src, 'manifest'))
    ext_res = json.loads(block(src, 'ext_resources') or '[]')
    template = json.loads(block(src, 'template'))

    urls = {}
    for uuid, entry in manifest.items():
        data = base64.b64decode(entry['data'])
        if entry.get('compressed'):
            data = gzip.decompress(data)
        if entry['mime'] == 'text/html' and is_bundle(data.decode('utf-8')):
            data = unbundle(data.decode('utf-8')).encode('utf-8')
        urls[uuid] = write_asset(data, entry['mime'])

    for uuid, url in urls.items():
        template = template.replace(uuid, url)
    # Same as the runtime loader: assets are ours and same-origin now.
    template = re.sub(r'\s+integrity="[^"]*"', '', template, flags=re.I)

    resources = {e['id']: urls[e['uuid']] for e in ext_res if e['uuid'] in urls}
    head = '<script>window.__resources=%s;</script>' % json.dumps(resources).replace('</', '<\\/')
    # Load React as ordinary parser-blocking scripts ahead of the runtime so it
    # is fetched in parallel with everything else instead of on demand.
    react = [resources[i] for i in REACT_IDS if i in resources]
    head += ''.join('<script src="%s"></script>' % u for u in react)
    head += extra_head

    m = re.search(r'<head[^>]*>', template, re.I)
    if m:
        template = template[:m.end()] + head + template[m.end():]
    if body_prefix:
        m = re.search(r'<body[^>]*>', template, re.I)
        if m:
            template = template[:m.end()] + body_prefix + template[m.end():]
    return template


def outer_parts(src):
    """Pieces of the outer bundle page the template doesn't carry."""
    head = ''
    if '/_vercel/insights/script.js' in src:
        head += ('<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};</script>'
                 '<script defer src="/_vercel/insights/script.js"></script>')
    body = ''
    m = re.search(r'<body>\s*(<noscript><main.*?</main></noscript>)', src, re.S)
    if m:
        body = m.group(1)
    return head, body


def main(paths):
    for path in paths:
        src = open(path, encoding='utf-8').read()
        if not is_bundle(src):
            print('skip (not a bundle):', path)
            continue
        head, body = outer_parts(src)
        out = unbundle(src, head, body)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(out)
        print('%s: %d -> %d bytes' % (path, len(src), len(out)))


if __name__ == '__main__':
    main(sys.argv[1:])
