#!/usr/bin/env bash
#
# Compose the shippable pages from the committed project sources.
#
#   tools/compose.sh
#
# Each *.html in the repo root is design-source/pages/<page>.dc.html plus the
# hand-maintained SEO partials in design-source/seo/: the <head> metadata, the
# crawlable <noscript> fallback, and the window.__resources map that points the
# dc-runtime at vendored React instead of unpkg. Cross-page "<page>.dc.html"
# links become the clean URLs vercel.json rewrites.
#
# tools/build.sh refreshes design-source/pages/ from a Claude Design project
# export and then calls this. Run it directly after editing an SEO partial, or
# after tools/unbundle.py has brought in a page from a bundled export.
#
# Composing with unchanged sources must produce no git diff.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

PAGES=(index about contact faq how-it-works packages portfolio terms)

for p in "${PAGES[@]}"; do
  src="design-source/pages/$p.dc.html"
  head="design-source/seo/$p.head.html"
  nos="design-source/seo/$p.noscript.html"
  [ -f "$src" ]  || { echo "!! no page source for $p" >&2; exit 1; }
  [ -f "$head" ] || { echo "!! no SEO head partial for $p" >&2; exit 1; }
  [ -f "$nos" ]  || { echo "!! no noscript partial for $p" >&2; exit 1; }

  # The source head is fixed at 5 lines (doctype .. viewport), then support.js
  # on line 6, </head> on 7, <body> on 8. Bail if a source departs from that.
  sed -n '6p' "$src" | grep -q 'support\.js' || {
    echo "!! $p: unexpected source head layout" >&2; exit 1; }

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
