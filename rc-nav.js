/* Sticky-nav chrome for header[data-rc-nav]. Sets the two states the pages style:
     data-nav-scrolled  the glass background, once the page has left the top
     data-nav-hidden    off-screen, while the reader is scrolling down
   The header starts transparent, so without this it stays transparent over the
   page content — the scrolled state is what makes it readable, not a flourish.

   Self-wiring, because the dc runtime renders the header after this loads. The
   header is claimed when it first appears; claiming sets data-rc-wired, which
   is also the flag rc-motion.js checks before wiring a nav of its own. */
(function () {
  if (window.__rcNav) return;
  window.__rcNav = true;

  var SCROLLED = 8;     /* px scrolled before the background comes in */
  var HIDE_AT = 100;    /* px before a downward scroll may hide the header */
  var DEAD = 5;         /* px of scroll jitter to ignore */

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function offset() {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  var hdr = null, lastY = offset(), hidden = false, ticking = false;

  function header() {
    if (hdr && hdr.isConnected) return hdr;
    hdr = document.querySelector('header[data-rc-nav]');
    if (hdr) hdr.setAttribute('data-rc-wired', '1');
    return hdr;
  }

  function update() {
    ticking = false;
    var h = header();
    if (!h) return;

    var y = offset();
    if (y > SCROLLED) h.setAttribute('data-nav-scrolled', '');
    else h.removeAttribute('data-nav-scrolled');

    var dy = y - lastY;
    if (reduce || Math.abs(dy) < DEAD) return;
    lastY = y;
    if (dy > 0 && y > HIDE_AT && !hidden) {
      hidden = true;
      h.setAttribute('data-nav-hidden', '');
    } else if (dy < 0 && hidden) {
      hidden = false;
      h.removeAttribute('data-nav-hidden');
      h.classList.remove('hidden');   /* rc-motion.js's flag for the same state */
    }
  }

  function tick() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });

  /* Paint the state once the header exists: a page opened on an #anchor, or
     reloaded part-way down, is already scrolled before the first scroll event. */
  function claim() {
    if (!header()) return false;
    update();
    return true;
  }

  function watch() {
    if (claim()) return;
    var mo = new MutationObserver(function () { if (claim()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 10000);
  }

  if (document.body) watch();
  else document.addEventListener('DOMContentLoaded', watch);
})();
