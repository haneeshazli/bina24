# Site tools

The pages were exported as self-extracting bundles (every asset base64-inlined
and unpacked in the browser). They have been converted to plain HTML with
content-hashed files in `/assets`, which Vercel caches for a year.

- `unbundle.py page.html ...` — convert a freshly exported bundle page in place.
  Run this whenever you re-export a page from the design tool, then run
  `optimize.py` on it.
- `optimize.py page.html ...` — idempotent head clean-up (charset first,
  favicon, font preloads, `lang="ms"`).
- `make_privacy.py` — rebuilds `privacy.html` from `terms.html`'s layout.

This folder is excluded from deployment via `.vercelignore`.
