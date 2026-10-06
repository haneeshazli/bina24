#!/usr/bin/env bash
#
# Refresh the repo from a Claude Design project-source export, then compose.
#
#   tools/build.sh <path-to-extracted-export>
#
# The export is the unzipped download of the "Bina 24 Jam" Claude Design
# project: .dc.html pages plus the dc-runtime (support.js), the _ds design
# system, assets/, widgets/ and the .image-slots.state.json sidecar. It
# contains no SEO metadata and is not directly deployable, so this script
# copies in the runtime, the design system and only the assets pages
# reference, refreshes design-source/pages/ from it, and hands off to
# tools/compose.sh to build the shippable *.html.
#
# The HOMEPAGE is not refreshed from here. It is authored in a separate
# Claude Design project on the Vela Ranks design system and arrives as a
# single-file bundle, which tools/unbundle.py converts into
# design-source/pages/index.dc.html. Point this script at the RealCraft
# export and it leaves the homepage alone; both then compose together.
#
# Re-running with no design changes must produce no git diff.

set -euo pipefail

EXPORT="${1:-}"
[ -n "$EXPORT" ] && [ -d "$EXPORT" ] || { echo "usage: tools/build.sh <path-to-extracted-export>" >&2; exit 2; }
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

# The homepage is absent on purpose; see the note above.
PAGES=(about contact faq how-it-works packages portfolio terms)

DS="_ds/copy-of-realcraft-design-system-01c972fb-e7bb-4005-a8ab-c2098a65e911"
RUNTIME=(support.js image-slot.js rc-motion.js i18n.js i18n-en.js i18n-en-2.js i18n-en-terms.js)
# Only these images are referenced; the export also carries ~150MB of
# uploads/ and scraps/ working material that must not ship.
LOGOS=(bina-logo-header-v2.png bina-logo-footer-v2.png)

need () { [ -e "$EXPORT/$1" ] || { echo "!! export is missing $1" >&2; exit 1; }; }
need "$DS/_ds_bundle.js"; need support.js
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

echo "==> page sources"
mkdir -p design-source/pages
for p in "${PAGES[@]}"; do
  src="$EXPORT/$p.dc.html"
  [ -f "$src" ] || { echo "!! export is missing $p.dc.html" >&2; exit 1; }
  cp "$src" "design-source/pages/$p.dc.html"
done

echo "==> pages"
tools/compose.sh

echo "==> done. Verify locally before pushing:"
echo "    tools/serve.ps1   (mimics the vercel.json rewrites on :8099)"
