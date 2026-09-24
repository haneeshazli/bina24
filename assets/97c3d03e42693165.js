/* RealCraft motion — one shared IntersectionObserver, CSS transitions only, no libraries.
   Reveals are one-shot (unobserved after firing). Only transform/opacity animate. */
(function () {
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var io = null;

  function clearWillChange(e) {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.remove('rc-animating');
      e.currentTarget.removeEventListener('transitionend', clearWillChange);
    }
  }

  function fire(el) {
    el.classList.add('rc-animating', 'reveal');
    el.addEventListener('transitionend', clearWillChange);
    setTimeout(function () { el.classList.remove('rc-animating'); }, 1600);
  }

  function observeAll(root) {
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.intersectionRatio < 0.15 && !(en.isIntersecting && en.boundingClientRect.height > (window.innerHeight || 800) * 0.85)) return;
          io.unobserve(en.target);
          fire(en.target);
        });
      }, { threshold: [0.15] });
    }
    root.querySelectorAll('[data-reveal],[data-stagger]').forEach(function (el) {
      if (el.getAttribute('data-rc-obs')) return;
      el.setAttribute('data-rc-obs', '1');
      if (reduce) { el.classList.add('reveal'); return; }
      io.observe(el);
    });
  }

  function hero(root) {
    var h = root.querySelector('[data-hero]');
    if (!h || h.getAttribute('data-rc-hero')) return;
    h.setAttribute('data-rc-hero', '1');
    var go = function () {
      h.classList.add('rc-animating', 'reveal');
      setTimeout(function () { h.classList.remove('rc-animating'); }, 1000);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
    else requestAnimationFrame(go);
  }

  function nav(root) {
    var hdr = root.querySelector('header[data-rc-nav]');
    if (!hdr || reduce || hdr.getAttribute('data-rc-wired')) return;
    hdr.setAttribute('data-rc-wired', '1');
    var lastY = window.pageYOffset, hidden = false, ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset, dy = y - lastY;
      if (Math.abs(dy) < 5) return;
      lastY = y;
      if (dy > 0 && y > 100 && !hidden) { hidden = true; hdr.classList.add('hidden'); }
      else if (dy < 0 && hidden) { hidden = false; hdr.classList.remove('hidden'); }
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* images: lazy + fade in on load, no scale/clip reveals */
  function images(root) {
    root.querySelectorAll('img').forEach(function (img) {
      if (img.getAttribute('data-rc-img')) return;
      img.setAttribute('data-rc-img', '1');
      if (!img.hasAttribute('fetchpriority') && !img.closest('[data-hero]')) {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      }
      if (img.complete && img.naturalWidth) return;
      img.setAttribute('data-rc-loading', '');
      var clear = function () { img.removeAttribute('data-rc-loading'); };
      img.addEventListener('load', clear, { once: true });
      img.addEventListener('error', clear, { once: true });
      /* safety: a src swapped in after load (offline bundles, blob URLs) can miss the event */
      var poll = setInterval(function () {
        if (img.naturalWidth > 0 || !img.hasAttribute('data-rc-loading')) { clearInterval(poll); clear(); }
      }, 200);
      setTimeout(function () { clearInterval(poll); clear(); }, 4000);
    });
  }

  window.RCMotion = {
    init: function (root) {
      root = root || document.body;
      hero(root);
      observeAll(root);
      nav(root);
      images(root);
    }
  };
})();
