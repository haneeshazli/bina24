# Bina 24 Jam

Marketing site for Bina 24 Jam. Static, no build step at serve time — the files
in the repo root are what ships.

Production: <https://bina24jam.vercel.app>

## Deploying

**Pushing to `main` does not update the Vercel site.** The Vercel project is not
Git-connected to this repo: there are no webhooks and no commit statuses, so a
push leaves production serving whatever was deployed last. After pushing, deploy
from Vercel manually (or connect the repo so pushes ship on their own).

Check which build is actually live:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://bina24jam.vercel.app/support.js
```

`200` means the current source-built site is live; `404` means production is
still on an older bundle.

`main` also auto-builds to GitHub Pages at
<https://haneeshazli.github.io/bina24/>. That is useful for checking a build on a
real host, but it is not the branded domain and its extensionless links 404 there
— only `vercel.json` supplies those rewrites.

## Updating the design

The site is authored in Claude Design and downloaded as a *project source*
export: `.dc.html` pages plus the dc-runtime, design system and assets. That
export is not directly deployable — it carries no SEO metadata, pulls React from
a CDN, and ships ~150MB of working material that must not go live.

```bash
tools/build.sh ~/path/to/extracted-export
```

That composes each page from the export and the SEO partials, rewrites
cross-page links to clean URLs, vendors React, and refreshes
`design-source/pages/`. Re-running it with an unchanged export produces no diff.

Then preview before pushing:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
```

It mimics the `vercel.json` rewrites on <http://localhost:8099>, so clean URLs
behave as they do in production. Two 404s are expected locally:
`/_vercel/insights/script.js` (Vercel-only) and `/favicon.ico` (none shipped).

## Layout

| Path | What it is |
| --- | --- |
| `*.html` | The eight built pages. Generated — edit the design, not these. |
| `design-source/pages/` | The `.dc.html` exports the pages were built from. |
| `design-source/seo/` | Per-page `<head>` and `<noscript>` partials. Hand-maintained. |
| `_ds/`, `support.js`, `i18n*.js`, `image-slot.js`, `rc-motion.js` | Design system and dc-runtime, copied from the export. |
| `widgets/` | Embedded as iframes by the homepage capability cards. |
| `image-slots.state.json` | Image-slot artwork. Renamed off its dotfile name so static hosts serve it. |
| `vendor/` | React + ReactDOM UMD, mapped via `window.__resources`. |
| `vercel.json` | Clean-URL rewrites and `.html` redirects. |

### SEO partials

`design-source/seo/` holds the titles, descriptions, canonicals, Open Graph and
Twitter tags, JSON-LD (pricing, breadcrumbs, `ProfessionalService`), the
crawlable `<noscript>` fallback and the Vercel Analytics snippet. The design tool
never round-trips these, so they are maintained by hand here and re-applied on
every build. Edit them when copy, pricing or business details change.
