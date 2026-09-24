#!/usr/bin/env node
/*
 * Bake a static snapshot of each page's rendered content into its HTML.
 *
 * The pages are rendered in the browser from an <x-dc> template, so the raw
 * HTML crawlers download holds template markup ({{ placeholders }}, both
 * sides of every conditional) and a visitor sees nothing until React boots.
 * This script renders every page in Chromium at desktop and mobile widths,
 * merges the two renders (they differ only where the template branches on
 * screen size) and writes the result into the page as real HTML:
 *
 *   <div id="b24-pr">…rendered page…</div>        what crawlers and first paint see
 *   <script type="application/json" id="b24-dc">  the template, inert until boot
 *
 * A small inline script turns the JSON back into <x-dc> before the runtime
 * boots and removes the snapshot once the live page has rendered, so the
 * page behaves exactly as before.
 *
 * Re-runnable: a page that was already processed is restored to its source
 * form first. Usage (from the repo root):
 *   node tools/prerender.js index.html about.html ...
 * Needs Playwright (global install is fine) and python3 for a static server.
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  const g = require('child_process').execSync('npm root -g').toString().trim();
  ({ chromium } = require(path.join(g, 'playwright')));
}

const ROOT = path.resolve(__dirname, '..');
const PORT = 8765;
const MOBILE_MAX = 767.98; // pages switch layout at innerWidth < 768

const PR_OPEN = '<div id="b24-pr">';
const PR_CLOSE = '</div><!--/b24-pr-->';
const MARK_HEAD = '<!-- b24:prerender -->';

const HEAD_SNIPPET = MARK_HEAD + `
<style>x-dc{display:none!important}@media (max-width:${MOBILE_MAX}px){#b24-pr [data-pr=d]{display:none!important}}@media (min-width:768px){#b24-pr [data-pr=m]{display:none!important}}.b24-noanim,.b24-noanim>*{transition:none!important}</style>
<script>(function(){
  // Remove the static snapshot once the live render has caught up with it.
  var done=false,pending=false;
  function txt(p){var n=p.textContent.length;p.querySelectorAll('style,noscript,[data-pr]').forEach(function(e){n-=e.textContent.length});return n}
  function swap(){
    if(done)return;var p=document.getElementById('b24-pr');var r=document.getElementById('dc-root');
    if(!p){done=true;return}
    if(!r||!r.firstElementChild)return;
    if(!swap.force&&r.textContent.length<(swap.n||(swap.n=txt(p)))*0.9)return;
    done=true;p.remove();
    // Content already on screen must not re-run its entrance animation.
    var h=innerHeight;
    r.querySelectorAll('[data-hero],[data-reveal],[data-stagger]').forEach(function(el){
      if(el.hasAttribute('data-hero')||el.getBoundingClientRect().top<h){el.classList.add('b24-noanim','reveal')}
    });
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      document.querySelectorAll('.b24-noanim').forEach(function(e){e.classList.remove('b24-noanim')})
    })});
  }
  function later(){if(pending||done)return;pending=true;requestAnimationFrame(function(){pending=false;swap()})}
  var mo=new MutationObserver(function(){swap();later();if(done)mo.disconnect()});
  document.addEventListener('DOMContentLoaded',function(){mo.observe(document.body,{childList:true,subtree:true})});
  setTimeout(function(){swap.force=true;swap();mo.disconnect()},4000);
})();</script>`;

const RESTORE = '<script>(function(){var s=document.getElementById("b24-dc"),x=document.createElement("x-dc");x.innerHTML=JSON.parse(s.textContent);s.parentNode.insertBefore(x,s);s.remove()})();</script>';

function toSource(html) {
  // Undo a previous run so the page can be re-rendered from its template.
  html = html.replace(MARK_HEAD, '');
  html = html.replace(/\n*<style>x-dc\{display:none!important\}[\s\S]*?<\/style>\n?<script>\(function\(\)\{\n  \/\/ Remove the static snapshot[\s\S]*?<\/script>\n?/, '');
  const a = html.indexOf(PR_OPEN);
  if (a >= 0) {
    const b = html.indexOf(PR_CLOSE, a) + PR_CLOSE.length;
    html = html.slice(0, a) + html.slice(b);
  }
  const m = /<script type="application\/json" id="b24-dc">([\s\S]*?)<\/script>/.exec(html);
  if (m) {
    const tpl = JSON.parse(m[1]);
    let rest = html.slice(m.index + m[0].length);
    if (rest.startsWith(RESTORE)) rest = rest.slice(RESTORE.length);
    html = html.slice(0, m.index) + '<x-dc>' + tpl + '</x-dc>' + rest;
  }
  return html;
}

// Runs in the page: merge the desktop and mobile renders of #dc-root.
function mergeInPage() {
  const tplKey = (n) => n.nodeType === 1 ? (n.getAttribute('data-dc-tpl') || ('~' + n.tagName)) : (n.nodeType === 3 ? '#t' : '#o');
  function merge(d, m) {
    const dc = [...d.childNodes], mc = [...m.childNodes];
    const same = dc.length === mc.length && dc.every((n, i) => tplKey(n) === tplKey(mc[i]));
    if (same) {
      dc.forEach((n, i) => { if (n.nodeType === 1) merge(n, mc[i]); });
      return;
    }
    // Keyed merge: keep shared nodes in order, tag the rest by breakpoint.
    const out = [];
    let i = 0, j = 0;
    const blank = (n) => n.nodeType !== 1 && n.textContent.trim() === '';
    while (i < dc.length || j < mc.length) {
      const a = dc[i], b = mc[j];
      if (a && b && tplKey(a) === tplKey(b)) {
        if (a.nodeType === 1) merge(a, b);
        out.push(a); i++; j++;
      } else if (a && !mc.slice(j).some((n) => tplKey(n) === tplKey(a))) {
        if (a.nodeType === 1) { a.setAttribute('data-pr', 'd'); out.push(a); } else if (blank(a)) out.push(a);
        i++;
      } else {
        if (b.nodeType === 1) { const c = b.cloneNode(true); c.setAttribute('data-pr', 'm'); out.push(c); }
        j++;
      }
    }
    while (d.firstChild) d.removeChild(d.firstChild);
    out.forEach((n) => d.appendChild(n));
  }
  merge(window.__b24D, window.__b24M);
  const root = window.__b24D;
  root.querySelectorAll('[data-reveal],[data-stagger],[data-hero]').forEach((el) => el.classList.add('reveal'));
  root.querySelectorAll('.rc-animating').forEach((el) => el.classList.remove('rc-animating'));
  root.querySelectorAll('header.hidden').forEach((el) => el.classList.remove('hidden'));
  root.querySelectorAll('iframe[src]').forEach((f) => { f.removeAttribute('src'); });
  root.querySelectorAll('[data-rc-img],[data-rc-loading],[data-rc-obs],[data-rc-hero],[data-rc-wired]').forEach((el) => {
    ['data-rc-img', 'data-rc-loading', 'data-rc-obs', 'data-rc-hero', 'data-rc-wired'].forEach((a) => el.removeAttribute(a));
  });
  // Crawlers that skip JavaScript never see <image-slot>'s shadow DOM.
  root.querySelectorAll('image-slot[src]').forEach((el) => {
    const alt = (el.getAttribute('placeholder') || '').replace(/"/g, '&quot;');
    el.insertAdjacentHTML('beforeend', '<noscript><img src="' + el.getAttribute('src') + '" alt="' + alt + '" loading="lazy" style="width:100%;height:100%;object-fit:cover"></noscript>');
  });
  root.querySelectorAll('[data-dc-tpl]').forEach((el) => el.removeAttribute('data-dc-tpl'));
  root.querySelectorAll('[class=""]').forEach((el) => el.removeAttribute('class'));
  return root.innerHTML;
}

async function snapshot(browser, url) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => { const r = document.getElementById('dc-root'); return r && r.firstElementChild; });
  await page.waitForTimeout(700);
  // Runtime-generated CSS (base styles, hover rules, hoisted helmet styles):
  // the snapshot must look right before the runtime has run.
  const css = await page.evaluate(() => {
    window.__b24D = document.getElementById('dc-root').firstElementChild.cloneNode(true);
    return [...document.head.querySelectorAll('style')].map((s) => s.textContent).filter((t) => t.trim());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  await page.evaluate(() => { window.__b24M = document.getElementById('dc-root').firstElementChild.cloneNode(true); });
  const outer = await page.evaluate(() => {
    const d = window.__b24D; const c = d.cloneNode(false); return c.outerHTML.replace(/<\/[^>]+>$/, '');
  });
  const inner = await page.evaluate(mergeInPage);
  await page.close();
  return { css, html: outer.replace(/ data-dc-tpl="[^"]*"/, '') + inner + '</' + outer.match(/^<([a-z0-9-]+)/i)[1] + '>' };
}

async function main(files) {
  const server = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 800));
  const browser = await chromium.launch();
  try {
    for (const file of files) {
      const full = path.join(ROOT, file);
      const src = toSource(fs.readFileSync(full, 'utf8'));
      if (!src.includes('<x-dc>')) { console.log('skip (no template):', file); continue; }
      const tmp = '__prerender_' + path.basename(file);
      fs.writeFileSync(path.join(ROOT, tmp), src);
      let snap;
      try { snap = await snapshot(browser, `http://localhost:${PORT}/${tmp}`); }
      finally { fs.unlinkSync(path.join(ROOT, tmp)); }

      const a = src.indexOf('<x-dc>'), b = src.lastIndexOf('</x-dc>');
      // Styles outside the template stay live; everything else goes into the snapshot.
      const outside = src.slice(0, a) + src.slice(b);
      const staticCss = new Set([...outside.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]));
      const css = [...new Set(snap.css)].filter((t) => !staticCss.has(t)).join('\n').replace(/<\/style/gi, '<\\/style');
      const tpl = src.slice(a + '<x-dc>'.length, b);
      const json = JSON.stringify(tpl).replace(/</g, '\\u003c');
      let out = src.slice(0, a) +
        PR_OPEN + '<style>' + css + '</style>' + snap.html + PR_CLOSE +
        '<script type="application/json" id="b24-dc">' + json + '</script>' + RESTORE +
        src.slice(b + '</x-dc>'.length);
      // The snapshot supersedes the old <noscript> fallback.
      out = out.replace(/<noscript><main[\s\S]*?<\/main><\/noscript>/, '');
      out = out.replace('</head>', HEAD_SNIPPET + '\n</head>');
      fs.writeFileSync(full, out);
      console.log(`${file}: ${src.length} -> ${out.length} bytes`);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

module.exports = { toSource };
if (require.main === module) {
  main(process.argv.slice(2)).catch((e) => { console.error(e); process.exit(1); });
}
