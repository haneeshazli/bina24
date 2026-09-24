# Site tools

The pages were exported as self-extracting bundles (every asset base64-inlined
and unpacked in the browser). They have been converted to plain HTML with
content-hashed files in `/assets`, which Vercel caches for a year, and each
page carries a pre-rendered snapshot of its content for search engines and
instant first paint.

After re-exporting or editing a page, run in this order:

1. `python3 tools/unbundle.py page.html` — only for a fresh bundle export.
2. `python3 tools/optimize.py page.html` — charset first, favicon, font
   preloads, `lang="ms"`.
3. `node tools/prerender.js page.html` — renders the page in Chromium
   (desktop + mobile) and bakes the result into the HTML. Re-runnable; run it
   after any content change so the snapshot stays in sync.
4. `python3 tools/seo.py` — titles, descriptions, logo, FAQ schema.

`make_privacy.py` rebuilds `privacy.html` from `terms.html`'s layout (run it
on the un-prerendered source, then steps 3–4).

This folder is excluded from deployment via `.vercelignore`.
