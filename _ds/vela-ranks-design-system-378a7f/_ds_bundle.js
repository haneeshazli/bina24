/* @ds-bundle: {"format":4,"namespace":"VelaRanksDesignSystem_378a7f","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"ButtonLink","sourcePath":"components/actions/ButtonLink.jsx"},{"name":"CaseStudyCard","sourcePath":"components/cards/CaseStudyCard.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/cards/TestimonialCard.jsx"},{"name":"FaqList","sourcePath":"components/disclosure/FaqList.jsx"},{"name":"HeroForm","sourcePath":"components/forms/HeroForm.jsx"},{"name":"SectionHeading","sourcePath":"components/headings/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/headings/StatBlock.jsx"},{"name":"StepItem","sourcePath":"components/headings/StepItem.jsx"},{"name":"Chip","sourcePath":"components/labels/Chip.jsx"},{"name":"ChipRow","sourcePath":"components/labels/ChipRow.jsx"},{"name":"Label","sourcePath":"components/labels/Label.jsx"},{"name":"RatingBar","sourcePath":"components/labels/RatingBar.jsx"},{"name":"Stars","sourcePath":"components/labels/Stars.jsx"},{"name":"TrustLine","sourcePath":"components/labels/TrustLine.jsx"},{"name":"Band","sourcePath":"components/layout/Band.jsx"},{"name":"VelaProvider","sourcePath":"components/layout/VelaProvider.jsx"},{"name":"MobileTabBar","sourcePath":"components/navigation/MobileTabBar.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"fe462cb995db","components/actions/ButtonLink.jsx":"2a6acd281dfe","components/cards/CaseStudyCard.jsx":"d4ce085d0bee","components/cards/ServiceCard.jsx":"91365efb3123","components/cards/TestimonialCard.jsx":"5409843cc938","components/disclosure/FaqList.jsx":"893cf89620c3","components/forms/HeroForm.jsx":"00f5f68e7234","components/headings/SectionHeading.jsx":"9e18cc9d8468","components/headings/StatBlock.jsx":"c17257629b27","components/headings/StepItem.jsx":"d1a75c61252f","components/labels/Chip.jsx":"dbb2779ca343","components/labels/ChipRow.jsx":"658ff076c651","components/labels/Label.jsx":"2f0b9e404122","components/labels/RatingBar.jsx":"3632e2092bf0","components/labels/Stars.jsx":"67bbe70a3d17","components/labels/TrustLine.jsx":"f2d0a514b119","components/layout/Band.jsx":"cdd0eabbcb59","components/layout/VelaProvider.jsx":"01612b8be260","components/navigation/MobileTabBar.jsx":"e8fe75731d53","ui_kits/website/Sections.jsx":"fd06c25f6db0","ui_kits/website/data.jsx":"6f434670d1ec"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VelaRanksDesignSystem_378a7f = window.VelaRanksDesignSystem_378a7f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
function inner(withDot, trailingArrow, children) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, withDot ? /*#__PURE__*/React.createElement("span", {
    className: "vr-btn__dot",
    "aria-hidden": "true"
  }) : null, children, trailingArrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192") : null);
}
function classes(variant, accent, block, className) {
  return cx("vr-btn", "vr-btn--" + variant, variant === "service" && accent ? "vr-accent-" + accent : null, block ? "vr-btn--block" : null, className);
}
/** A call to action rendered as a <button>. Use ButtonLink when it navigates. */
function Button({
  variant = "primary",
  accent,
  block,
  withDot,
  trailingArrow,
  className,
  children,
  type = "button",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: classes(variant, accent, block, className)
  }, rest), inner(withDot, trailingArrow, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/ButtonLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
function inner(withDot, trailingArrow, children) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, withDot ? /*#__PURE__*/React.createElement("span", {
    className: "vr-btn__dot",
    "aria-hidden": "true"
  }) : null, children, trailingArrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192") : null);
}
function classes(variant, accent, block, className) {
  return cx("vr-btn", "vr-btn--" + variant, variant === "service" && accent ? "vr-accent-" + accent : null, block ? "vr-btn--block" : null, className);
}
/** The same call to action rendered as an <a>. */
function ButtonLink({
  variant = "primary",
  accent,
  block,
  withDot,
  trailingArrow,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    className: classes(variant, accent, block, className)
  }, rest), inner(withDot, trailingArrow, children));
}
Object.assign(__ds_scope, { ButtonLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/ButtonLink.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/FaqList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The numbered accordion that closes the homepage. Multi-open. */
function FaqList({
  items = [],
  defaultOpen = [0],
  className,
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = i => setOpen(p => p.includes(i) ? p.filter(n => n !== i) : [...p, i]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-faq", className)
  }, rest), items.map((item, i) => {
    const isOpen = open.includes(i);
    return /*#__PURE__*/React.createElement("div", {
      key: item.number,
      className: cx("vr-faq__row", isOpen ? "vr-faq__row--open" : null)
    }, /*#__PURE__*/React.createElement("button", {
      className: "vr-faq__q",
      "aria-expanded": isOpen,
      onClick: () => toggle(i)
    }, /*#__PURE__*/React.createElement("h3", {
      className: "vr-faq__text"
    }, item.number, ". ", item.question), /*#__PURE__*/React.createElement("span", {
      className: "vr-faq__disc",
      "aria-hidden": "true"
    }, isOpen ? "▲" : "▼")), isOpen ? /*#__PURE__*/React.createElement("p", {
      className: "vr-faq__a"
    }, item.answer) : null);
  }));
}
Object.assign(__ds_scope, { FaqList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/FaqList.jsx", error: String((e && e.message) || e) }); }

// components/forms/HeroForm.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
function Field({
  field,
  variant
}) {
  const kind = field.kind ?? "text";
  const showLabel = variant === "full" && field.label;
  const withIcon = variant === "hero" && field.icon;
  const aria = field.label ?? field.placeholder;
  const control = kind === "select" ? /*#__PURE__*/React.createElement("select", {
    className: "vr-select",
    id: field.name,
    name: field.name,
    required: field.required,
    "aria-label": aria
  }, (field.options ?? []).map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))) : kind === "textarea" ? /*#__PURE__*/React.createElement("textarea", {
    className: "vr-textarea",
    id: field.name,
    name: field.name,
    placeholder: field.placeholder,
    required: field.required,
    "aria-label": aria
  }) : /*#__PURE__*/React.createElement("input", {
    className: "vr-input",
    id: field.name,
    type: kind,
    name: field.name,
    placeholder: field.placeholder,
    required: field.required,
    "aria-label": aria
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cx("vr-field", withIcon ? "vr-field--with-icon" : null)
  }, showLabel ? /*#__PURE__*/React.createElement("label", {
    className: "vr-field__label",
    htmlFor: field.name
  }, field.label, " ", field.required ? /*#__PURE__*/React.createElement("span", {
    className: "vr-field__req"
  }, "*") : null) : null, withIcon ? /*#__PURE__*/React.createElement("span", {
    className: "vr-field__icon"
  }, field.icon) : null, control);
}
/** The lead-capture panel. hero = three-field panel above the fold; full = labelled footer form. */
function HeroForm({
  variant = "hero",
  fields = [],
  submitLabel = "Get My Free Audit",
  note,
  className,
  onSubmit,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("form", _extends({
    className: cx("vr-form", "vr-form--" + variant, className),
    onSubmit: onSubmit
  }, rest), fields.map(f => /*#__PURE__*/React.createElement(Field, {
    key: f.name,
    field: f,
    variant: variant
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    variant: "primary",
    block: true
  }, submitLabel), note ? /*#__PURE__*/React.createElement("p", {
    className: "vr-form__note"
  }, note) : null);
}
Object.assign(__ds_scope, { HeroForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/HeroForm.jsx", error: String((e && e.message) || e) }); }

// components/headings/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The opening unit of every band: eyebrow, mixed-family headline, intro. */
function SectionHeading({
  eyebrow,
  title,
  intro,
  size = "lg",
  tone = "light",
  centered,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx(centered ? "vr-section--centered" : null, className)
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("p", {
    className: "vr-eyebrow vr-eyebrow--" + tone
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    className: "vr-heading vr-heading--" + size
  }, title), intro ? /*#__PURE__*/React.createElement("p", {
    className: "vr-intro"
  }, intro) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/headings/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/headings/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** A figure with its label, set in the display serif. */
function StatBlock({
  label,
  value,
  suffix,
  className,
  ...rest
}) {
  const spoken = rest["aria-label"] ?? ((typeof label === "string" ? label : "") + ": " + value + (suffix ?? "")).trim();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-stat", className)
  }, rest, {
    "aria-label": spoken
  }), /*#__PURE__*/React.createElement("p", {
    className: "vr-stat__label"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "vr-stat__figure"
  }, value, suffix ? /*#__PURE__*/React.createElement("span", {
    className: "vr-stat__suffix"
  }, suffix) : null));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/headings/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/headings/StepItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** One rung of the "How it works" ladder. */
function StepItem({
  marker,
  icon,
  title,
  children,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-step", className)
  }, rest), /*#__PURE__*/React.createElement("hr", {
    className: "vr-step__rule"
  }), /*#__PURE__*/React.createElement("p", {
    className: "vr-step__marker"
  }, marker), icon ? /*#__PURE__*/React.createElement("span", {
    className: "vr-step__icon"
  }, icon) : null, /*#__PURE__*/React.createElement("h3", {
    className: "vr-step__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "vr-step__copy"
  }, children));
}
Object.assign(__ds_scope, { StepItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/headings/StepItem.jsx", error: String((e && e.message) || e) }); }

// components/labels/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** A pill naming one deliverable. Never interactive. */
function Chip({
  tone = "outline",
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx("vr-chip", tone === "dark" ? "vr-chip--dark" : null, className)
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/Chip.jsx", error: String((e && e.message) || e) }); }

// components/labels/ChipRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** Wrapping flex row for Chips (8px gap). */
function ChipRow({
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-chip-row", className)
  }, rest), children);
}
Object.assign(__ds_scope, { ChipRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/ChipRow.jsx", error: String((e && e.message) || e) }); }

// components/labels/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The small uppercase line that introduces a chip list or a section. */
function Label({
  variant = "default",
  accent,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: cx("vr-label", variant === "mono" ? "vr-label--mono" : null, accent && variant !== "mono" ? "vr-label--accent-" + accent : null, className)
  }, rest), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/Label.jsx", error: String((e && e.message) || e) }); }

// components/cards/CaseStudyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** Proof, compressed: tag, client, the number, the mechanism, a screenshot, a key. */
function CaseStudyCard({
  accent = "mint",
  tag,
  client,
  result,
  mechanism,
  media,
  ctaLabel = "View Case Study",
  onCtaClick,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cx("vr-card", "vr-card--" + accent, className)
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Label, {
    className: "vr-case__tag",
    accent: accent
  }, tag), /*#__PURE__*/React.createElement("h3", {
    className: "vr-case__client"
  }, client), /*#__PURE__*/React.createElement("p", {
    className: "vr-case__result"
  }, result), /*#__PURE__*/React.createElement("p", {
    className: "vr-case__copy"
  }, mechanism), media ? /*#__PURE__*/React.createElement("div", {
    className: "vr-card__media"
  }, media) : null, ctaLabel ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "service",
    accent: accent,
    trailingArrow: true,
    onClick: onCtaClick
  }, ctaLabel) : null);
}
Object.assign(__ds_scope, { CaseStudyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CaseStudyCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The homepage workhorse: washed card with media, title, promise, chips and one accent key. */
function ServiceCard({
  accent = "mint",
  media,
  title,
  promise,
  chipsLabel = "What's included",
  chips = [],
  ctaLabel = "View Service Details",
  onCtaClick,
  feature,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cx("vr-card", feature ? "vr-card--feature" : "vr-card--" + accent, className)
  }, rest), feature ? /*#__PURE__*/React.createElement("span", {
    className: "vr-card__disc",
    "aria-hidden": "true"
  }, "\u2197") : null, media ? /*#__PURE__*/React.createElement("div", {
    className: "vr-card__media"
  }, media) : null, /*#__PURE__*/React.createElement("h3", {
    className: "vr-card__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "vr-card__promise"
  }, promise), chips.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("hr", {
    className: "vr-card__rule"
  }), /*#__PURE__*/React.createElement(__ds_scope.Label, {
    className: "vr-card__label",
    variant: feature ? "mono" : "default",
    accent: feature ? undefined : accent
  }, chipsLabel), /*#__PURE__*/React.createElement(__ds_scope.ChipRow, {
    className: "vr-card__chips"
  }, chips.map(c => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: c,
    tone: feature ? "dark" : "outline"
  }, c)))) : null, ctaLabel && !feature ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "service",
    accent: accent,
    trailingArrow: true,
    onClick: onCtaClick
  }, ctaLabel) : null);
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/labels/Stars.jsx
try { (() => {
/** Five decorative star glyphs. Always paired with the numeric score. */
function Stars({
  count = 5
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "vr-stars",
    "aria-hidden": "true"
  }, "★".repeat(Math.max(0, Math.min(5, Math.floor(count)))));
}
Object.assign(__ds_scope, { Stars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/Stars.jsx", error: String((e && e.message) || e) }); }

// components/cards/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** A review in the client's own words, always attributed to a named person. */
function TestimonialCard({
  tone = "dark",
  score = "5.0",
  quote,
  name,
  role,
  avatarSrc,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cx("vr-quote", "vr-quote--" + tone, className)
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "vr-quote__rate"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vr-quote__score"
  }, score), /*#__PURE__*/React.createElement(__ds_scope.Stars, null)), /*#__PURE__*/React.createElement("blockquote", {
    className: "vr-quote__body",
    style: {
      margin: "0 0 var(--vr-space-5)"
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    className: "vr-quote__who"
  }, avatarSrc ? /*#__PURE__*/React.createElement("img", {
    className: "vr-quote__avatar",
    src: avatarSrc,
    alt: ""
  }) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "vr-quote__name"
  }, name), /*#__PURE__*/React.createElement("p", {
    className: "vr-quote__role"
  }, role))));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/labels/RatingBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The trust pill above the hero: overlapping review-platform marks, score, stars. */
function RatingBar({
  marks = [],
  score = "5.0",
  className,
  ...rest
}) {
  const platforms = marks.map(m => m.name).join(", ");
  const spoken = platforms ? "Rated " + score + " out of 5 across " + platforms : "Rated " + score + " out of 5";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-rating", className),
    "aria-label": spoken
  }, rest), marks.length > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "vr-rating__marks",
    "aria-hidden": "true"
  }, marks.slice(0, 5).map(m => m.src ? /*#__PURE__*/React.createElement("img", {
    key: m.name,
    className: "vr-rating__mark",
    src: m.src,
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", {
    key: m.name,
    className: "vr-rating__mark"
  }, m.name.charAt(0).toUpperCase()))) : null, /*#__PURE__*/React.createElement("span", {
    className: "vr-rating__score"
  }, score), /*#__PURE__*/React.createElement(__ds_scope.Stars, null));
}
Object.assign(__ds_scope, { RatingBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/RatingBar.jsx", error: String((e && e.message) || e) }); }

// components/labels/TrustLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The bordered pill under the hero with a leading ★. */
function TrustLine({
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx("vr-trustline", className)
  }, rest), children);
}
Object.assign(__ds_scope, { TrustLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/labels/TrustLine.jsx", error: String((e && e.message) || e) }); }

// components/layout/Band.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** A full-width page section. Alternate dark and light grounds — never two of the same back to back. */
function Band({
  ground = "light",
  className,
  children,
  ...rest
}) {
  const tone = ground === "ink" || ground === "forest" ? "vr-on-ink" : "vr-on-light";
  return /*#__PURE__*/React.createElement("section", _extends({
    className: cx("vr-band", "vr-band--" + ground, tone, className)
  }, rest), children);
}
Object.assign(__ds_scope, { Band });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Band.jsx", error: String((e && e.message) || e) }); }

// components/layout/VelaProvider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** Root wrapper for every Vela Ranks surface. Sets .vr-root and data-vr-theme. */
function VelaProvider({
  theme = "light",
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-root", className),
    "data-vr-theme": theme
  }, rest), children);
}
Object.assign(__ds_scope, { VelaProvider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/VelaProvider.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileTabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(" ");
/** The fixed four-item mobile bar with the logo orb overhanging its top edge. */
function MobileTabBar({
  items = [],
  orbHref = "/",
  orbSrc,
  fixed,
  onItemClick,
  className,
  ...rest
}) {
  const render = t => /*#__PURE__*/React.createElement("a", {
    key: t.label,
    href: t.href,
    onClick: onItemClick ? e => onItemClick(t, e) : undefined,
    className: cx("vr-tabbar__item", t.active ? "vr-tabbar__item--active" : null),
    "aria-current": t.active ? "page" : undefined
  }, t.icon, /*#__PURE__*/React.createElement("span", null, t.label));
  const [a, b, c, d] = items;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx("vr-tabbar__wrap", className)
  }, rest), /*#__PURE__*/React.createElement("a", {
    className: "vr-tabbar__orb",
    href: orbHref,
    "aria-label": "Vela Ranks home"
  }, orbSrc ? /*#__PURE__*/React.createElement("img", {
    src: orbSrc,
    alt: "",
    width: 40,
    height: 40
  }) : "V"), /*#__PURE__*/React.createElement("nav", {
    className: cx("vr-tabbar", fixed ? "vr-tabbar--fixed" : null)
  }, a ? render(a) : /*#__PURE__*/React.createElement("span", null), b ? render(b) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), c ? render(c) : /*#__PURE__*/React.createElement("span", null), d ? render(d) : /*#__PURE__*/React.createElement("span", null)));
}
Object.assign(__ds_scope, { MobileTabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileTabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  VelaProvider,
  Band,
  Button,
  ButtonLink,
  SectionHeading,
  ServiceCard,
  CaseStudyCard,
  TestimonialCard,
  FaqList,
  StepItem,
  StatBlock,
  RatingBar,
  TrustLine,
  HeroForm
} = window.VelaRanksDesignSystem_378a7f;
const kitStack = {
  display: "grid",
  gap: "var(--vr-space-6)",
  marginTop: "var(--vr-space-8)"
};
function Hero({
  onSubmit,
  sent
}) {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "ink",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(RatingBar, {
    marks: [{
      name: "Google"
    }, {
      name: "Yelp"
    }, {
      name: "Facebook"
    }],
    score: "5.0"
  })), /*#__PURE__*/React.createElement(SectionHeading, {
    size: "xl",
    tone: "dark",
    centered: true,
    eyebrow: "DMV digital marketing",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "More Calls From Google. ", /*#__PURE__*/React.createElement("em", null, "Fewer Wasted Dollars.")),
    intro: "Ads, SEO and websites built as one system for local businesses across DC, Maryland and Virginia."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, sent ? /*#__PURE__*/React.createElement(ThankYou, null) : /*#__PURE__*/React.createElement(HeroForm, {
    fields: VR_HERO_FIELDS,
    note: "Free audit. No contracts.",
    onSubmit: onSubmit
  })));
}
function ThankYou() {
  return /*#__PURE__*/React.createElement("div", {
    className: "vr-form vr-form--hero",
    style: {
      textAlign: "center",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "vr-label vr-label--mono",
    style: {
      margin: 0
    }
  }, "Request received"), /*#__PURE__*/React.createElement("h3", {
    className: "vr-heading vr-heading--lg",
    style: {
      color: "#fff",
      margin: "8px 0 0",
      fontSize: 28,
      lineHeight: 1.15
    }
  }, "We'll call you ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--vr-brand-bright)"
    }
  }, "within one business day.")));
}
function Services({
  go,
  all
}) {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(TrustLine, null, "Trusted by 50+ businesses across DMV")), /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Our digital marketing services",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Pick The Service You Need Most Or ", /*#__PURE__*/React.createElement("em", null, "Hand Us All Of It.")),
    intro: "Every service below is part of one system."
  }), /*#__PURE__*/React.createElement("div", {
    style: kitStack
  }, (all ? VR_SERVICES : VR_SERVICES.slice(0, 2)).map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    onCtaClick: () => go("contact")
  }))), /*#__PURE__*/React.createElement(ServiceCard, _extends({
    feature: true
  }, VR_FEATURE, {
    chipsLabel: "Everything included:"
  })), all ? null : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    trailingArrow: true,
    onClick: () => go("services")
  }, "See All Services"))));
}
function Cases({
  ground = "mint"
}) {
  return /*#__PURE__*/React.createElement(Band, {
    ground: ground
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Case studies",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Numbers First. ", /*#__PURE__*/React.createElement("em", null, "Then The Story."))
  }), /*#__PURE__*/React.createElement("div", {
    style: kitStack
  }, VR_CASES.map(c => /*#__PURE__*/React.createElement(CaseStudyCard, _extends({
    key: c.client
  }, c)))));
}
function Stats() {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "forest"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "Recognition",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Ranked Against 15,000 Agencies. ", /*#__PURE__*/React.createElement("em", null, "Still Local."))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 20,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    label: "Agencies ranked against",
    value: "15,000",
    suffix: "+"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "Businesses served",
    value: "50",
    suffix: "+"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "Average review score",
    value: "5.0"
  })));
}
function Steps() {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "light"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "How it works",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Three Steps To ", /*#__PURE__*/React.createElement("em", null, "A Fuller Calendar."))
  }), /*#__PURE__*/React.createElement("div", {
    style: kitStack
  }, VR_STEPS.map(s => /*#__PURE__*/React.createElement(StepItem, {
    key: s.marker,
    marker: s.marker,
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph-light " + s.icon
    }),
    title: s.title
  }, s.copy))));
}
function Quotes() {
  return /*#__PURE__*/React.createElement(VelaProvider, {
    theme: "dark"
  }, /*#__PURE__*/React.createElement(Band, {
    ground: "ink"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "Testimonials",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "In Their ", /*#__PURE__*/React.createElement("em", null, "Own Words."))
  }), /*#__PURE__*/React.createElement("div", {
    style: kitStack
  }, VR_QUOTES.map((q, i) => /*#__PURE__*/React.createElement(TestimonialCard, _extends({
    key: i
  }, q))))));
}
function Faq() {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "mint"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "FAQ",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Questions We ", /*#__PURE__*/React.createElement("em", null, "Hear Most."))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(FaqList, {
    items: VR_FAQ
  })));
}
function ContactBand({
  onSubmit,
  sent
}) {
  return /*#__PURE__*/React.createElement(Band, {
    ground: "ink"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    centered: true,
    eyebrow: "Get started",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Tell Us Where You Want ", /*#__PURE__*/React.createElement("em", null, "To Be Found.")),
    intro: "Fill this in and a strategist will reply within one business day."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, sent ? /*#__PURE__*/React.createElement(ThankYou, null) : /*#__PURE__*/React.createElement(HeroForm, {
    variant: "full",
    fields: VR_FULL_FIELDS,
    submitLabel: "Book My Strategy Call",
    onSubmit: onSubmit
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(ButtonLink, {
    href: "#",
    variant: "pill",
    withDot: true
  }, "Book 15 Minute Call With Us")));
}
Object.assign(window, {
  Hero,
  Services,
  Cases,
  Stats,
  Steps,
  Quotes,
  Faq,
  ContactBand
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.jsx
try { (() => {
// Sample content for the Vela Ranks website kit. Strings marked in README as
// placeholder where the source did not supply them.
const VR_SERVICES = [{
  accent: "sky",
  title: "Google Ads & PPC",
  promise: "Campaigns that reach customers searching right now.",
  chips: ["Search Ads", "Local Services Ads", "Landing pages", "Retargeting", "Call tracking", "Monthly report"]
}, {
  accent: "mint",
  title: "Local SEO",
  promise: "Show up in the map pack when neighbours search for what you do.",
  chips: ["Google Business Profile", "Citations", "Reviews", "On-page SEO", "Location pages", "Rank tracking"]
}, {
  accent: "cream",
  title: "Website Design",
  promise: "A fast site built to turn visits into booked calls.",
  chips: ["Custom design", "Copywriting", "Mobile-first", "Speed tuning", "Lead forms", "Hosting"]
}, {
  accent: "lilac",
  title: "Meta Ads",
  promise: "Stay in front of local buyers between searches.",
  chips: ["Facebook Ads", "Instagram Ads", "Creative", "Audiences", "Retargeting", "Lead forms"]
}];
const VR_FEATURE = {
  title: "Vela 360",
  promise: "Every service above, run as one system by one team, with one report.",
  chips: ["Google Ads", "Local SEO", "Website", "Meta Ads", "Reviews", "Reporting"]
};
const VR_CASES = [{
  accent: "cream",
  tag: "Junk removal",
  client: "Client A",
  result: "$39K to $75K /Months",
  mechanism: /*#__PURE__*/React.createElement(React.Fragment, null, "Rebuilt Local Services Ads and the landing page, lifting booked jobs ", /*#__PURE__*/React.createElement("strong", null, "92%"), ".")
}, {
  accent: "sky",
  tag: "Drone services",
  client: "Dronify DMV",
  result: "2X revenue in just 3 Months",
  mechanism: /*#__PURE__*/React.createElement(React.Fragment, null, "Search campaigns plus a new quote form doubled qualified leads to ", /*#__PURE__*/React.createElement("strong", null, "2X"), ".")
}];
const VR_STEPS = [{
  marker: "Step 01",
  icon: "ph-magnifying-glass",
  title: "Audit what you have",
  copy: "We review your ads, site and listings and show you where the leads are leaking."
}, {
  marker: "Step 02",
  icon: "ph-target",
  title: "Build the system",
  copy: "Campaigns, pages and tracking go live together, not one at a time."
}, {
  marker: "Step 03",
  icon: "ph-trend-up",
  title: "Scale what works",
  copy: "Budget moves to what produces calls. You see every number."
}];
const VR_QUOTES = [{
  quote: "They answered every question, and the calls started in week two.",
  name: "Client name",
  role: "CEO — Dronify DMV"
}, {
  quote: "First agency that showed me exactly where my money went.",
  name: "Client name",
  role: "Owner — Local services"
}];
const VR_FAQ = [{
  number: "01",
  question: "How fast will I see results?",
  answer: "Paid campaigns usually produce calls in the first two weeks. SEO compounds over months."
}, {
  number: "02",
  question: "Do I have to sign a long contract?",
  answer: "No. Month to month."
}, {
  number: "03",
  question: "Who will I actually work with?",
  answer: "A named strategist who knows your account."
}, {
  number: "04",
  question: "Do you only work in the DMV?",
  answer: "Most clients are in DC, Maryland and Virginia."
}];
const VR_HERO_FIELDS = [{
  name: "name",
  placeholder: "Your name",
  icon: /*#__PURE__*/React.createElement("i", {
    className: "ph-light ph-user"
  })
}, {
  name: "phone",
  kind: "tel",
  placeholder: "Phone number",
  icon: /*#__PURE__*/React.createElement("i", {
    className: "ph-light ph-phone"
  })
}, {
  name: "site",
  kind: "url",
  placeholder: "Website URL",
  icon: /*#__PURE__*/React.createElement("i", {
    className: "ph-light ph-globe"
  })
}];
const VR_FULL_FIELDS = [{
  name: "fname",
  label: "Full name",
  required: true,
  placeholder: "Jane Smith"
}, {
  name: "email",
  label: "Email",
  kind: "email",
  required: true,
  placeholder: "you@business.com"
}, {
  name: "need",
  label: "What do you need?",
  kind: "select",
  options: ["Google Ads & PPC", "Local SEO", "Website Design", "Meta Ads", "Vela 360"]
}, {
  name: "msg",
  label: "Anything else?",
  kind: "textarea",
  placeholder: "Tell us about your business"
}];
Object.assign(window, {
  VR_SERVICES,
  VR_FEATURE,
  VR_CASES,
  VR_STEPS,
  VR_QUOTES,
  VR_FAQ,
  VR_HERO_FIELDS,
  VR_FULL_FIELDS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonLink = __ds_scope.ButtonLink;

__ds_ns.CaseStudyCard = __ds_scope.CaseStudyCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.FaqList = __ds_scope.FaqList;

__ds_ns.HeroForm = __ds_scope.HeroForm;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.StepItem = __ds_scope.StepItem;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ChipRow = __ds_scope.ChipRow;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.RatingBar = __ds_scope.RatingBar;

__ds_ns.Stars = __ds_scope.Stars;

__ds_ns.TrustLine = __ds_scope.TrustLine;

__ds_ns.Band = __ds_scope.Band;

__ds_ns.VelaProvider = __ds_scope.VelaProvider;

__ds_ns.MobileTabBar = __ds_scope.MobileTabBar;

})();
