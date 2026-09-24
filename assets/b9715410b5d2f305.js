(function () {
  if (window.B24_i18n) return;
  var KEY = 'b24-lang';
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  var dict = null;
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  function getDict() {
    if (!dict) { dict = {}; var src = window.B24_EN || {}; for (var k in src) dict[norm(k)] = src[k]; }
    return dict;
  }
  function lang() { try { return localStorage.getItem(KEY) || 'bm'; } catch (e) { return 'bm'; } }
  function tr(src) { var t = getDict()[norm(src)]; return t == null ? null : src.match(/^\s*/)[0] + t + src.match(/\s*$/)[0]; }
  function txNode(n, L) {
    var p = n.parentNode; if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return;
    var v = n.nodeValue;
    if (n.__b24out !== v) n.__b24src = v;
    var src = n.__b24src; if (!src || !src.trim()) return;
    var out = L === 'en' ? tr(src) : src; if (out == null) out = src;
    n.__b24out = out; if (v !== out) n.nodeValue = out;
  }
  function txAttrs(el, L) {
    if (!el.getAttribute) return;
    var st = el.__b24attr || (el.__b24attr = {});
    ATTRS.forEach(function (a) {
      var v = el.getAttribute(a); if (v == null) return;
      var s = st[a] || (st[a] = {});
      if (s.out !== v) s.src = v;
      var out = L === 'en' ? (tr(s.src) || s.src) : s.src;
      s.out = out; if (v !== out) el.setAttribute(a, out);
    });
  }
  function walk(root, L) {
    if (root.nodeType === 3) return txNode(root, L);
    if (root.nodeType !== 1) return;
    txAttrs(root, L);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) txNode(n, L);
    root.querySelectorAll('[placeholder],[aria-label],[alt],[title]').forEach(function (el) { txAttrs(el, L); });
  }
  function paintToggles(L) {
    document.querySelectorAll('[data-b24-lang]').forEach(function (b) {
      var v = b.getAttribute('data-b24-lang'); if (v === 'toggle') return;
      var on = v === L;
      b.style.background = on ? 'var(--accent-lime)' : 'transparent';
      b.style.color = on ? '#101913' : 'rgba(255,255,255,0.8)';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  var obs = null;
  function apply() {
    var L = lang();
    document.documentElement.lang = L === 'en' ? 'en' : 'ms';
    if (obs) obs.disconnect();
    walk(document.body, L); paintToggles(L);
    observe();
  }
  function observe() {
    if (!obs) obs = new MutationObserver(function (muts) {
      var L = lang(); obs.disconnect();
      muts.forEach(function (m) {
        if (m.type === 'characterData') txNode(m.target, L);
        else if (m.type === 'attributes') txAttrs(m.target, L);
        else m.addedNodes.forEach(function (n) { walk(n, L); });
      });
      paintToggles(L); observe();
    });
    obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  function setLang(L) { try { localStorage.setItem(KEY, L); } catch (e) {} apply(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-b24-lang]'); if (!b) return;
    e.preventDefault();
    var v = b.getAttribute('data-b24-lang');
    setLang(v === 'toggle' ? (lang() === 'en' ? 'bm' : 'en') : v);
  }, true);
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(); });
  window.B24_i18n = { refresh: function () { dict = null; if (document.body) apply(); }, setLang: setLang, lang: lang };
  if (document.body) apply(); else document.addEventListener('DOMContentLoaded', apply);
})();
