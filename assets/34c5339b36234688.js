/* @ds-bundle: {"format":4,"namespace":"RealcraftDesignSystem_0a0125","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"AIChatInput","sourcePath":"components/marketing/AIChatInput.jsx"},{"name":"StatsBar","sourcePath":"components/marketing/StatsBar.jsx"},{"name":"TemplateGalleryCard","sourcePath":"components/marketing/TemplateGalleryCard.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"591a353b57a4","components/core/Button.jsx":"9be8ac382495","components/core/Card.jsx":"a7f62a9d98bd","components/core/Input.jsx":"14ca46605e55","components/marketing/AIChatInput.jsx":"7a943caca119","components/marketing/StatsBar.jsx":"d35dfaa319d7","components/marketing/TemplateGalleryCard.jsx":"19a22410dc6c","components/navigation/NavBar.jsx":"ccf92f8a129e","ui_kits/marketing-site/App.jsx":"e90cda512804"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RealcraftDesignSystem_0a0125 = window.RealcraftDesignSystem_0a0125 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'outline',
  children,
  style,
  ...props
}) {
  const tones = {
    outline: {
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-secondary)',
      background: 'transparent'
    },
    lime: {
      border: 'none',
      color: 'var(--color-charcoal)',
      background: 'var(--accent-lime-soft)'
    },
    dark: {
      border: 'none',
      color: 'var(--text-on-dark)',
      background: 'var(--surface-dark)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption-size)',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 12px',
      display: 'inline-flex',
      alignItems: 'center',
      ...tones[tone],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-button-size)',
  fontWeight: 400,
  padding: '8px 16px',
  borderRadius: 'var(--radius-standard)',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  transition: 'opacity .12s ease'
};
const variants = {
  primary: {
    background: 'var(--color-charcoal)',
    color: 'var(--text-on-dark)',
    borderRadius: 'var(--radius-pill)'
  },
  accent: {
    background: 'var(--accent-lime)',
    color: 'var(--color-charcoal)',
    borderRadius: 'var(--radius-pill)',
    fontWeight: 600
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-interactive)',
    borderRadius: 'var(--radius-pill)'
  },
  surface: {
    background: 'var(--color-white)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-pill)'
  },
  pill: {
    background: 'var(--surface-dark)',
    color: 'var(--text-on-dark)',
    borderRadius: 'var(--radius-pill)',
    width: 40,
    height: 40,
    padding: 0
  }
};
function Button({
  variant = 'primary',
  size = 'default',
  children,
  style,
  ...props
}) {
  const s = {
    ...base,
    ...variants[variant],
    ...(size === 'small' ? {
      fontSize: 'var(--text-button-small-size)',
      padding: '6px 12px'
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: s,
    onMouseDown: e => {
      e.currentTarget.style.opacity = 0.8;
    },
    onMouseUp: e => {
      e.currentTarget.style.opacity = variant === 'pill' ? 0.5 : 1;
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  size = 'standard',
  tone = 'light',
  children,
  style,
  ...props
}) {
  const radius = size === 'compact' ? 'var(--radius-comfortable)' : size === 'featured' ? 'var(--radius-container)' : 'var(--radius-card)';
  const tones = {
    light: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-primary)'
    },
    tint: {
      background: 'var(--surface-card-tint)',
      border: 'none',
      color: 'var(--text-primary)'
    },
    dark: {
      background: 'var(--surface-dark)',
      border: 'none',
      color: 'var(--text-on-dark)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...tones[tone],
      borderRadius: radius,
      padding: 'var(--space-4)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-size)',
      background: 'var(--color-cream)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-standard)',
      padding: '8px 12px',
      outline: 'none',
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/AIChatInput.jsx
try { (() => {
function AIChatInput({
  placeholder = 'Describe the site you want to build…',
  suggestions = ['Portfolio site', 'SaaS landing page', 'Restaurant site'],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-white)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: 16,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    placeholder: placeholder,
    rows: 2,
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-large-size)',
      color: 'var(--text-primary)',
      resize: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, suggestions.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 12px',
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "pill",
    style: {
      opacity: 1,
      fontSize: 12
    },
    "aria-label": "Voice input"
  }, "\u25CF"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    size: "small"
  }, "Build"))));
}
Object.assign(__ds_scope, { AIChatInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/AIChatInput.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatsBar.jsx
try { (() => {
function StatsBar({
  stats = [{
    value: '120+',
    label: 'Clients accompanied'
  }, {
    value: '2.5M+',
    label: 'Leads generated'
  }, {
    value: '350+',
    label: 'Projects delivered'
  }],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: 'var(--space-5)',
      background: 'var(--surface-dark)',
      borderRadius: 'var(--radius-container)',
      padding: 'var(--space-5) var(--space-6)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-comfortable)',
      background: 'var(--accent-lime)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 'var(--radius-xs,4px)',
      background: 'var(--surface-dark)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sub-heading-size)',
      fontWeight: 'var(--weight-heading)',
      color: 'var(--text-on-dark)',
      lineHeight: 1
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.6)',
      marginTop: 2
    }
  }, s.label)))));
}
Object.assign(__ds_scope, { StatsBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatsBar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TemplateGalleryCard.jsx
try { (() => {
function TemplateGalleryCard({
  title = 'Portfolio',
  category = 'Personal',
  image,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      background: 'var(--surface-card-tint)',
      width: 240,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      background: image ? `url(${image}) center/cover` : 'var(--color-charcoal-4)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, category)));
}
Object.assign(__ds_scope, { TemplateGalleryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TemplateGalleryCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  logoSerif = 'Real',
  logoSans = 'Craft',
  links = ['Services', 'Work', 'Testimonials', 'About', 'Contact'],
  tone = 'light',
  style
}) {
  const onDark = tone === 'dark';
  const textColor = onDark ? 'var(--text-on-dark)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      background: onDark ? 'transparent' : 'var(--bg-page)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 'var(--radius-xs)',
      background: onDark ? 'var(--accent-lime)' : 'var(--accent-green)',
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: onDark ? 'var(--text-on-dark)' : 'var(--color-charcoal)',
      letterSpacing: '-0.3px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display-italic)',
      fontStyle: 'italic',
      fontWeight: 500
    }
  }, logoSerif), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600
    }
  }, logoSans))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: textColor,
      fontSize: 15,
      textDecoration: 'none'
    }
  }, l)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: onDark ? 'accent' : 'primary',
    size: "small"
  }, "Get in touch")));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/App.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  NavBar,
  StatsBar
} = window.RealcraftDesignSystem_0a0125;
const CASE_STUDIES = [{
  name: 'Al-Baghdadi Learning Centre',
  category: 'Education',
  desc: 'Enrolment-focused funnel for a kindergarten & Quran learning centre in Shah Alam.'
}, {
  name: 'Cafe Nosh',
  category: 'Food & Beverage',
  desc: 'Warm, appetite-driven site for a cozy coffee & brunch spot.'
}, {
  name: 'Prokitch',
  category: 'Home & Renovation',
  desc: 'Lead-generation site for a custom kitchen & interior design specialist.'
}];
const CHECKS = ['Copy makes sense for your actual business, not generic AI phrasing', 'Mobile layout tested on real devices', 'Contact flow (WhatsApp/form) tested end-to-end', 'On-page SEO basics in place', 'Final human sign-off before the link is sent to you'];
const PRICING_ITEMS = ['AI-drafted design + copy', 'Human review & edit pass', 'Mobile + on-page SEO setup', 'Domain + hosting (1 year)', 'WhatsApp contact integration'];
function CheckRow({
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-xs,4px)',
      background: 'var(--accent-lime)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--surface-dark)',
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, text));
}
function Homepage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      borderRadius: '0 0 var(--radius-container) var(--radius-container)'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    tone: "dark",
    links: ['Pricing', 'Work', 'How It Works', 'FAQ']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-5) var(--space-9)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "dark",
    style: {
      border: '1px solid rgba(255,255,255,0.25)'
    }
  }, "AI-Powered, Human-Finished \xB7 Malaysia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-display-hero-size)',
      fontWeight: 'var(--weight-heading)',
      lineHeight: 'var(--text-display-hero-lh)',
      letterSpacing: 'var(--text-display-hero-ls)',
      color: 'var(--text-on-dark)',
      marginTop: 'var(--space-4)'
    }
  }, "See a real website, ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display-italic)',
      fontStyle: 'italic',
      fontWeight: 500,
      letterSpacing: 'var(--text-display-accent-ls)'
    }
  }, "reviewed by a real team,"), " before you pay anything."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-large-size)',
      color: 'rgba(255,255,255,0.72)',
      marginTop: 'var(--space-4)',
      maxWidth: 760,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "AI drafts your site in minutes. Our Malaysian design team checks, edits, and approves every page before it reaches you \u2014 live in 24 hours, from RM299. Pay 30% to start; the balance is only due once you've approved the finished site."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      display: 'flex',
      gap: 12,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent"
  }, "Get Started \u2014 RM299"), /*#__PURE__*/React.createElement(Button, {
    variant: "surface",
    style: {
      color: 'var(--text-primary)'
    }
  }, "See Live Client Sites \u2193")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 14,
      color: 'rgba(255,255,255,0.55)'
    }
  }, "Lebih selesa dalam Bahasa Malaysia? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--accent-lime)'
    }
  }, "Versi BM di sini \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 'var(--radius-card)',
      aspectRatio: '16/9',
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.5)',
      fontSize: 14
    }
  }, "Live client site preview / screen recording"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(StatsBar, {
    stats: [{
      value: '90+',
      label: 'PageSpeed score, tested at launch'
    }, {
      value: '100%',
      label: 'Mobile-checked on real devices'
    }, {
      value: '24h',
      label: 'Average brief-to-live-link time'
    }, {
      value: '1yr',
      label: 'Domain + hosting included'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-7)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "How this is different from an AI builder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sub-heading-size)',
      fontWeight: 'var(--weight-heading)',
      letterSpacing: 'var(--text-sub-heading-ls)',
      color: 'var(--text-primary)',
      marginTop: 'var(--space-3)'
    }
  }, "If you've tried a self-serve AI website builder before, here's what's different"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--text-body)',
      lineHeight: 1.6,
      marginTop: 'var(--space-4)'
    }
  }, "Self-serve AI builders hand you a draft and leave the editing, troubleshooting, and judgment calls to you. Realcraft works the other way round: our AI engine produces the first draft in minutes \u2014 then a real member of our team reviews every page, fixes what doesn't work, and only sends it to you once it's genuinely ready to launch."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      fontStyle: 'italic',
      marginTop: 'var(--space-4)'
    }
  }, "If your business needs something Realcraft genuinely isn't built for \u2014 a large custom platform, complex integrations \u2014 we'll tell you that upfront, before you pay a deposit, not after.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 8
    }
  }, "What our team checks before you see your site"), CHECKS.map(c => /*#__PURE__*/React.createElement(CheckRow, {
    key: c,
    text: c
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "What We Do"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-section-heading-size)',
      fontWeight: 'var(--weight-heading)',
      letterSpacing: 'var(--text-section-heading-ls)',
      color: 'var(--text-primary)',
      marginTop: 'var(--space-3)'
    }
  }, "Agency quality. Startup speed. Honest prices."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--text-body)',
      maxWidth: 680,
      margin: 'var(--space-3) auto 0'
    }
  }, "Most agencies charge RM3,000\u201310,000 and take weeks. Our AI engine does the heavy lifting; our humans do the polish \u2014 so you get both craft and speed, at a fraction of the cost."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "tint"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-comfortable)',
      background: 'var(--accent-lime)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-xs,4px)',
      background: 'var(--surface-dark)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 16
    }
  }, "Built in 24 Hours"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "AI drafts in minutes; our team finishes in hours, not days.")), /*#__PURE__*/React.createElement(Card, {
    tone: "tint"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-comfortable)',
      background: 'var(--accent-lime)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-xs,4px)',
      background: 'var(--surface-dark)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 16
    }
  }, "Designed to Convert"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "Every page is checked against a conversion checklist before it's sent to you.")), /*#__PURE__*/React.createElement(Card, {
    tone: "tint"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-comfortable)',
      background: 'var(--accent-lime)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-xs,4px)',
      background: 'var(--surface-dark)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 16
    }
  }, "Zero Hassle, Zero Risk"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "A 30% deposit starts your build. You see the real, live site before the balance is invoiced.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "What You're Actually Paying For"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sub-heading-size)',
      fontWeight: 'var(--weight-heading)',
      color: 'var(--text-primary)',
      marginTop: 'var(--space-3)'
    }
  }, "Transparent pricing"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      textAlign: 'left'
    }
  }, PRICING_ITEMS.map(i => /*#__PURE__*/React.createElement(CheckRow, {
    key: i,
    text: i
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 'var(--space-4)'
    }
  }, "SME Digitalisation Grant eligible \u2014 ask us how to apply it toward your package.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "How It Works"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sub-heading-size)',
      fontWeight: 'var(--weight-heading)',
      color: 'var(--text-primary)',
      marginTop: 'var(--space-3)'
    }
  }, "Live in three simple steps")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--accent-green)'
    }
  }, "1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 8
    }
  }, "Tell us about your business"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "Pick a package, create your account, and share what you do and what you want customers to do.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--accent-green)'
    }
  }, "2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 8
    }
  }, "We design & build"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "AI drafts it, our team finishes it \u2014 within 24 hours you get a link to your live website.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--accent-green)'
    }
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 8
    }
  }, "Approve & go live"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, "Love it? We connect your domain. Not quite right? We refine it until you approve."))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "See the Full Process \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "Why Realcraft")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "DIY AI Builder"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "You edit and troubleshoot it yourself", /*#__PURE__*/React.createElement("br", null), "Ongoing subscription, often auto-billed", /*#__PURE__*/React.createElement("br", null), "No human review of the output", /*#__PURE__*/React.createElement("br", null), "Hosting/domain usually separate")), /*#__PURE__*/React.createElement(Card, {
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "Traditional Agency"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "Weeks of back-and-forth", /*#__PURE__*/React.createElement("br", null), "50\u2013100% paid before you see anything", /*#__PURE__*/React.createElement("br", null), "Human-built, but slow and expensive", /*#__PURE__*/React.createElement("br", null), "Hosting and maintenance sold separately")), /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    style: {
      border: '2px solid var(--accent-lime)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--accent-lime)'
    }
  }, "Realcraft"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.85)',
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "AI drafts, our team finishes \u2014 you just approve", /*#__PURE__*/React.createElement("br", null), "30% deposit, balance only after you approve", /*#__PURE__*/React.createElement("br", null), "Human-reviewed, fast, and affordable", /*#__PURE__*/React.createElement("br", null), "Free domain + hosting for 1 year")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max-width)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "Featured Work"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sub-heading-size)',
      fontWeight: 'var(--weight-heading)',
      color: 'var(--text-primary)',
      marginTop: 'var(--space-3)'
    }
  }, "Real businesses. Real, checkable results.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, CASE_STUDIES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.name,
    tone: "tint"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      background: 'rgba(0,0,0,0.06)',
      borderRadius: 'var(--radius-comfortable)',
      marginBottom: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: 1
    }
  }, c.category), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginTop: 4
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 6
    }
  }, c.desc), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 14,
      color: 'var(--accent-green)',
      textDecoration: 'underline',
      marginTop: 8,
      display: 'inline-block'
    }
  }, "View live site \u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "View Full Portfolio \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-5)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "lime"
  }, "What Clients Say"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      aspectRatio: '16/9',
      background: 'var(--surface-card-tint)',
      borderRadius: 'var(--radius-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      fontSize: 14
    }
  }, "Client video reaction placeholder"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      color: 'var(--text-primary)',
      marginTop: 'var(--space-5)',
      fontStyle: 'italic'
    }
  }, "\"I saw my actual site before I paid the rest \u2014 that alone sold me.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginTop: 8
    }
  }, "\u2014 Amir, Prokitch")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      padding: 'var(--space-9) var(--space-5)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-section-heading-size)',
      fontWeight: 'var(--weight-heading)',
      letterSpacing: 'var(--text-section-heading-ls)',
      color: 'var(--text-on-dark)'
    }
  }, "Tomorrow, your website could look like this."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.7)',
      maxWidth: 600,
      margin: 'var(--space-3) auto 0'
    }
  }, "Start with a 30% deposit today. AI drafts it, our team finishes it, and you only pay the rest once you've seen and approved the real, live site."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      display: 'flex',
      gap: 12,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent"
  }, "Choose a Package"), /*#__PURE__*/React.createElement(Button, {
    variant: "surface",
    style: {
      color: 'var(--text-primary)'
    }
  }, "Get Started \u2014 RM299"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      padding: 'var(--space-6) var(--space-5)',
      display: 'flex',
      justifyContent: 'space-between',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 14,
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display-italic)',
      fontStyle: 'italic',
      fontWeight: 500
    }
  }, "Real"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Craft")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-on-dark)'
    }
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-on-dark)'
    }
  }, "Work"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-on-dark)'
    }
  }, "FAQ"))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Homepage, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/App.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.AIChatInput = __ds_scope.AIChatInput;

__ds_ns.StatsBar = __ds_scope.StatsBar;

__ds_ns.TemplateGalleryCard = __ds_scope.TemplateGalleryCard;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
