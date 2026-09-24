#!/usr/bin/env python3
"""Idempotent head clean-up for the unbundled pages.

- <meta charset> and viewport come first in <head> (charset must be early).
- Drop the fonts.gstatic.com preconnect: every font is self-hosted in /assets.
- Favicon / apple-touch-icon links.
- Preload the Latin font files the first screen uses, so they download in
  parallel with the scripts instead of after the page has rendered.

Usage: python3 tools/optimize.py page.html [page.html ...]
"""
import re
import sys

MARK = '<!-- b24:head -->'
CHARSET = '<meta charset="utf-8">'
VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1">'
ICONS = ('<link rel="icon" href="/favicon.svg" type="image/svg+xml">'
         '<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">'
         '<link rel="apple-touch-icon" href="/apple-touch-icon.png">')
# Latin subsets: Poppins 400/500/600 and Playfair Display italic.
PRELOAD_FONTS = [
    '/assets/3dc5d0c52428fe16.woff2',
    '/assets/289e0afc8be731a8.woff2',
    '/assets/872e862918591a9e.woff2',
    '/assets/c68530044e7c4ce6.woff2',
]


def optimize(src):
    if MARK in src:
        return src.replace('<html>', '<html lang="ms">', 1)
    src = src.replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">\n', '')
    src = src.replace(CHARSET + '\n', '', 1).replace(VIEWPORT + '\n', '', 1)
    fonts = ''.join('<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' % f
                    for f in PRELOAD_FONTS if f in src)
    head = '\n'.join([CHARSET, VIEWPORT, MARK, ICONS + fonts, ''])
    src = src.replace('<html>', '<html lang="ms">', 1)
    m = re.search(r'<head[^>]*>', src, re.I)
    return src[:m.end()] + head + src[m.end():]


def main(paths):
    for path in paths:
        src = open(path, encoding='utf-8').read()
        if not re.search(r'<head[^>]*>', src, re.I):
            continue
        out = optimize(src)
        if out != src:
            open(path, 'w', encoding='utf-8').write(out)
            print('optimized', path)


if __name__ == '__main__':
    main(sys.argv[1:])
