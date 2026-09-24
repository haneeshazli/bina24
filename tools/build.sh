#!/usr/bin/env bash
#
# Rebuild the site from a Claude Design project-source export.
#
#   tools/build.sh <path-to-extracted-export>
#
# The export is the unzipped "Bina 24 Jam" download: .dc.html pages plus the
# dc-runtime (support.js), the _ds design system, assets/, widgets/ and the
# .image-slots.state.json sidecar. It contains no SEO metadata and is not
# directly deployable, so this script assembles the shippable site:
#
#   - copies the runtime, design system and only the assets pages reference
#   - composes each page from the export + the SEO partials in design-source/seo
#   - rewrites "x.dc.html" links to the clean URLs vercel.json rewrites
#   - vendors React/ReactDOM and maps them via window.__resources, so the
#     runtime never reaches out to unpkg at page load
#   - renames the image-slot sidecar off its dotfile name
#
# It refreshes design-source/pages/ from the export too, so the committed
# sources always match what shipped. SEO partials are hand-maintained: the
# design tool never round-trips them.
#
# Re-running with no design changes must produce no git diff.

set -euo pipefail

EXPORT="${1:-}"
[ -n "$EXPORT" ] && [ -d "$EXPORT" ] || { echo "usage: tools/build.sh <path-to-extracted-export>" >&2; exit 2; }
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

PAGES=(index about contact faq how-it-works packages portfolio terms)
# The homepage keeps its Claude Design document name inside the export.
export_page () { [ "$1" = index ] && echo "Bina 24 Jam.dc.html" || echo "$1.dc.html"; }

DS="_ds/copy-of-realcraft-design-system-01c972fb-e7bb-4005-a8ab-c2098a65e911"
RUNTIME=(support.js image-slot.js rc-motion.js i18n.js i18n-en.js i18n-en-2.js i18n-en-terms.js)
# Only these images are referenced; the export also carries ~150MB of
# uploads/ and scraps/ working material that must not ship.
LOGOS=(bina-logo-header-v2.png bina-logo-footer-v2.png)

need () { [ -e "$EXPORT/$1" ] || { echo "!! export is missing $1" >&2; exit 1; }; }
need "$(export_page index)"; need "$DS/_ds_bundle.js"; need support.js
need widgets; need .image-slots.state.json; need assets/portfolio

echo "==> runtime + design system"
mkdir -p "$DS/tokens"
cp "$EXPORT/$DS/_ds_bundle.js" "$EXPORT/$DS/styles.css" "$DS/"
cp "$EXPORT/$DS/tokens/"*.css "$DS/tokens/"
for f in "${RUNTIME[@]}"; do cp "$EXPORT/$f" "$f"; done

echo "==> assets"
mkdir -p assets/portfolio widgets
for f in "${LOGOS[@]}"; do cp "$EXPORT/assets/$f" "assets/$f"; done
cp "$EXPORT/assets/portfolio/"*.jpg assets/portfolio/
# The homepage capability cards embed these in iframes through a runtime
# template var, so nothing in the page source names them statically.
cp "$EXPORT/widgets/"*.html widgets/

echo "==> image-slot sidecar"
# Ships as a dotfile, which some static hosts refuse to serve. Rename it and
# repoint the one const that reads it.
cp "$EXPORT/.image-slots.state.json" image-slots.state.json
sed -i "s|const STATE_FILE = '\.image-slots\.state\.json';|const STATE_FILE = 'image-slots.state.json';|" image-slot.js
grep -q "const STATE_FILE = 'image-slots.state.json';" image-slot.js || { echo "!! STATE_FILE patch did not apply" >&2; exit 1; }

echo "==> vendored react"
mkdir -p vendor
[ -f vendor/react.production.min.js ] && [ -f vendor/react-dom.production.min.js ] || {
  echo "!! vendor/ is missing; re-download the UMD builds pinned in support.js" >&2; exit 1; }

echo "==> pages"
mkdir -p design-source/pages
for p in "${PAGES[@]}"; do
  src="$EXPORT/$(export_page "$p")"
  head="design-source/seo/$p.head.html"
  nos="design-source/seo/$p.noscript.html"
  [ -f "$src" ]  || { echo "!! export is missing $(export_page "$p")" >&2; exit 1; }
  [ -f "$head" ] || { echo "!! no SEO head partial for $p" >&2; exit 1; }
  [ -f "$nos" ]  || { echo "!! no noscript partial for $p" >&2; exit 1; }
  cp "$src" "design-source/pages/$p.dc.html"

  # Export head is fixed at 5 lines (doctype .. viewport), then support.js on
  # line 6, </head> on 7, <body> on 8. Bail if a future export changes that.
  sed -n '6p' "$src" | grep -q 'support\.js' || { echo "!! $p: unexpected export head layout" >&2; exit 1; }

  {
    sed -n '1,5p' "$src"
    cat "$head"
    # Relative, so this resolves from / and from a clean URL like /packages,
    # and also when the site is served under a subpath (GitHub Pages).
    cat <<'RES'
<script>window.__resources = {
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js": "vendor/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": "vendor/react-dom.production.min.js"
};</script>
RES
    sed -n '6,8p' "$src"
    cat "$nos"
    tail -n +9 "$src"
  } | sed -e 's|href="Bina 24 Jam\.dc\.html"|href="/"|g' \
          -e 's|href="\([a-z0-9-]*\)\.dc\.html"|href="/\1"|g' > "$p.html"

  grep -q '\.dc\.html' "$p.html" && { echo "!! $p: unrewritten .dc.html link" >&2; exit 1; }
  printf '    %-14s %sB\n' "$p.html" "$(wc -c < "$p.html")"
done

echo "==> done. Verify locally before pushing:"
echo "    tools/serve.ps1   (mimics the vercel.json rewrites on :8099)"
