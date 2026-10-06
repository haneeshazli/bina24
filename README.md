# Bina 24 Jam

Marketing site for Bina 24 Jam. Static, no build step at serve time — the files
in the repo root are what ships.

Production: <https://bina24jam.vercel.app>

## Deploying

**Pushing to `main` does not update the Vercel site.** There are no commit
statuses on pushes and past commits on `main` have no deployment at all, so a
push leaves production serving whatever was deployed last. Production is
deployed on demand.

Vercel *can* read this repo, so a deploy does not need the files uploaded — it
pulls the commit itself:

```bash
vercel --scope goldkey1 deploy --prod          # from a checkout
```

or, against the API, POST a deployment for project `bina24` with
`gitSource: {type: github, org: haneeshazli, repo: bina24, ref: main}` and
`target: production`. Either way the build takes seconds (nothing to compile)
and the deployment picks up the `bina24jam.vercel.app` alias.

Check which build is actually live:

```bash
curl -s -o /dev/null -w '%{http_code}\n' \
  https://bina24jam.vercel.app/_ds/vela-ranks-design-system-378a7f/styles.css
```

`200` means the current homepage is live; `404` means production is still on a
build from before the Vela Ranks redesign.

`main` also auto-builds to GitHub Pages at
<https://haneeshazli.github.io/bina24/>. That is useful for checking a build on a
real host, but it is not the branded domain and its extensionless links 404 there
— only `vercel.json` supplies those rewrites.

## Updating the design

Pages are authored in Claude Design and land here as `design-source/pages/*.dc.html`.
`tools/compose.sh` turns those into the shippable `*.html`: it adds the SEO
partials and the crawlable `<noscript>` fallback, points the dc-runtime at
vendored React, and rewrites cross-page links to clean URLs. Run it directly
after editing an SEO partial.

How a page source is refreshed depends on which Claude Design project it comes
from, because the homepage and the other seven pages are now separate projects
on different design systems.

**The seven inner pages** (RealCraft design system) come from a *project source*
export: `.dc.html` pages plus the dc-runtime, design system and assets. That
export is not directly deployable — it carries no SEO metadata, pulls React from
a CDN, and ships ~150MB of working material that must not go live.

```bash
tools/build.sh ~/path/to/extracted-export
```

That copies in the runtime, design system and referenced assets, refreshes
`design-source/pages/`, then composes. It leaves the homepage alone.

**The homepage** (Vela Ranks design system) is downloaded as a *single-file
bundle* instead — one HTML file carrying the page template plus every asset
inlined as base64.

```bash
tools/unbundle.py ~/Downloads/Bina\ 24\ Jam.html index
tools/compose.sh
```

`unbundle.py` unpacks it back into project-source shape: it writes
`design-source/pages/index.dc.html`, splits the inlined CSS back into the
`_ds/vela-ranks-design-system-378a7f/` stylesheets, self-hosts the webfonts as
woff2, and recognises assets the repo already has by content hash so they keep
their paths. Image-slot artwork that is already in `image-slots.state.json`
loses its inlined `src` — the sidecar is the store. Anything it cannot place is
named in its report rather than passed over silently.

Re-running either script with unchanged input produces no diff.

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
| `design-source/pages/` | The `.dc.html` sources the pages were built from. |
| `design-source/seo/` | Per-page `<head>` and `<noscript>` partials. Hand-maintained. |
| `_ds/copy-of-realcraft-…/` | Design system for the seven inner pages. |
| `_ds/vela-ranks-…/` | Design system for the homepage, reconstructed by `unbundle.py`. |
| `assets/brands/` | Platform logos in the homepage's "dibina, dijejak dan dibayar" row. |
| `support.js`, `i18n*.js`, `image-slot.js`, `rc-motion.js` | dc-runtime, copied from the export. |
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
