// PA renders its UI with Coherent UI, which embeds Chrome 40. Shipped CSS is not
// built, bundled or autoprefixed, and the engine drops what it cannot parse
// silently - no error, no console warning, just a declaration that never applies.
//
// Two nets catch that. The plugin below checks every declaration against caniuse
// for .browserslistrc's `chrome 40`. The hand-written rules cover what it cannot
// see: at-rules, selectors, and the notation rules stylelint-config-standard
// otherwise *forces* into syntax the engine rejects.
//
// Unlike eslint.config.mjs's ES5 whitelist, these lists are curated rather than
// exhaustive - CSS-since-2015 is not a finite gap. The plugin is the exhaustive
// half. See docs/constraints.md.
//
// Every `Chrome NN` below is the release that shipped the unprefixed feature, so
// an entry qualifies when NN > 40. All CSS in this repo is shipped to the engine,
// so there is no `overrides` block; Node-side CSS, if it ever appears, would need
// one.

export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    // The automatic net. severity is "error" against the plugin's own advice:
    // there is no fallback tier here, and stylelint exits 0 on warnings, which
    // would make it decorative in lint:css - a CI hard gate.
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "error",
        // Partial support is exactly what needs reporting here.
        ignorePartialSupport: false,
        ignore: [
          // Fires on any overflow-x/overflow-y, because caniuse marks the whole
          // feature partial for Chrome 40 on account of `overflow: clip` and
          // the two-value shorthand. Both of those are handled by hand below -
          // `clip` is in declaration-property-value-disallowed-list, and the
          // shorthand cannot be reached because overflow is in
          // declaration-block-no-redundant-longhand-properties' ignoreShorthands.
          "css-overflow",
          // caniuse marks Chrome 40 "a x" - partial, prefixed. The -webkit-
          // form is the one that works, and property-no-vendor-prefix above
          // allows only that while property-disallowed-list bans the bare one.
          "css-masks",
          // Fires on any border-image, because caniuse marks the feature
          // partial over `fill` and `repeat: space`. Verified working in the
          // engine, and the base game leans on it for every panel frame.
          "border-image",
          // Fires on `word-break: break-all`, which works. The one value the
          // engine drops is keep-all, banned by hand below.
          "word-break",
          // Flat false positive: fires on `text-decoration: none`, which is
          // CSS1. The Chrome 57 part is the multi-value shorthand, and its
          // longhands are banned by hand below.
          "mdn-text-decoration-shorthand",
          // Fires on -webkit-appearance, which is the form that works here;
          // the bare property is banned by hand below.
          "css-appearance",
          // Fires on any text-indent. The partial is each-line/hanging; a plain
          // length works.
          "css-text-indent",
          // caniuse's "pointer" is Pointer Events, which Chrome 40 lacks - but
          // the only CSS it owns is touch-action, which shipped in Chrome 36
          // and is verified working here.
          "pointer",
        ],
      },
    ],

    // --- Standard-config rules that force Chrome-40-invalid syntax ----------
    // These are the dangerous ones. Left alone, `stylelint --fix` rewrites
    // working CSS into CSS the engine drops.

    // Unprefixed @keyframes is Chrome 43. @-webkit-keyframes is the only form
    // that parses here, and the base game ships 41 of them and 0 unprefixed.
    "at-rule-no-vendor-prefix": null,
    // Range syntax `(width >= 600px)` is Chrome 104; only min-/max- parse.
    "media-feature-range-notation": "prefix",
    // Multi-argument and complex :not() is Chrome 88.
    "selector-not-notation": "simple",
    // `deg` inside legacy hsl() is CSS Color 4, Chrome 65.
    "hue-degree-notation": "number",
    // Space-separated rgb(0 0 0 / 50%) is Chrome 65.
    "color-function-notation": "legacy",
    // Standard's "without-alpha" rewrites rgba() to a 4-argument rgb(), Chrome
    // 65. "with-alpha" is wrong too: Chrome 40's rgba() takes exactly 4.
    "color-function-alias-notation": null,
    // Percentage alpha (rgba(0, 0, 0, 50%)) is Chrome 65.
    "alpha-value-notation": "number",
    // 4- and 8-digit hex is Chrome 62. Not in standard; this is what bans it.
    "color-hex-alpha": "never",
    // Multi-keyword `display: block flow` is Chrome 115. Not in standard.
    "display-notation": "short",
    // These three prefixed selectors are the whole -webkit- half of stylelint's
    // autoprefixer table, and each unprefixed form is out of reach: ::placeholder
    // is Chrome 57, :any-link 65, :fullscreen 71. -moz-/-ms- stay rejected.
    "selector-no-vendor-prefix": [
      true,
      {
        ignoreSelectors: [
          "::-webkit-input-placeholder",
          ":-webkit-any-link",
          ":-webkit-full-screen",
        ],
      },
    ],
    // Unprefixed intrinsic sizing keywords are Chrome 46. Standard's
    // ignoreValues of box/inline-box is dropped - -webkit-box is not in the
    // rule's table at all, so those entries never matched anything.
    "value-no-vendor-prefix": [
      true,
      {
        ignoreValues: [
          "-webkit-fit-content",
          "-webkit-min-content",
          "-webkit-max-content",
        ],
      },
    ],

    // --- Standard's value is already the Chrome 40 one ----------------------
    // Restated so each reads as deliberate rather than as an oversight.

    // Chrome 40's hsl() requires a % lightness; "number" would be CSS Color 4.
    "lightness-notation": "percentage",
    // Both from/to and 0%/100% parse here, including inside @-webkit-keyframes.
    "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
    // resolution/dppx is Chrome 29, so -webkit-min-device-pixel-ratio is dead
    // weight rather than a compatibility need.
    "media-feature-name-no-vendor-prefix": true,
    // Blink has taken :: on ::before/::after/::first-letter/::first-line since
    // long before 40. A deliberate divergence from stock, which writes :before.
    "selector-pseudo-element-colon-notation": "double",

    // --- The -webkit- prefixes Chrome 40 actually requires ------------------
    // Anything not listed has an unprefixed form the engine already has, so its
    // prefix is legacy cruft and stays rejected - including the ones stock
    // carries in bulk: -webkit-transition (Chrome 26), -webkit-transform (36),
    // -webkit-box-shadow (10), -webkit-border-radius (4), -webkit-box-sizing
    // (10), the -webkit-flex family (29) and -webkit-object-fit (32).
    //
    // ignoreProperties only filters stylelint's fixed autoprefixer table, so
    // -webkit-text-fill-color, -webkit-box-orient, -webkit-line-clamp and
    // -webkit-font-smoothing are absent deliberately: all four work in the
    // engine, but the rule cannot flag them and listing them would be dead
    // config.
    //
    // Absent for the opposite reason - the engine drops the prefixed form too,
    // so "unprefix it" would be the wrong advice and the property is banned
    // outright below: -webkit-hyphens, -webkit-text-decoration-color,
    // -webkit-text-size-adjust, -webkit-overflow-scrolling.
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: [
          "/^-webkit-animation/", // animation-* is Chrome 43
          "-webkit-appearance", // Chrome 84
          "-webkit-background-clip", // background-clip: text is Chrome 120
          "-webkit-box-decoration-break", // Chrome 130
          "-webkit-clip-path", // Chrome 55
          "/^-webkit-column/", // column-*/columns is Chrome 50
          "-webkit-filter", // Chrome 53
          "-webkit-font-feature-settings", // Chrome 48
          "/^-webkit-mask/", // mask-* is Chrome 120
          "/^-webkit-text-emphasis/", // Chrome 99
          "-webkit-user-select", // Chrome 54
          "-webkit-writing-mode", // Chrome 48
        ],
      },
    ],

    // --- At-rules ----------------------------------------------------------
    // at-rule-no-unknown *knows* all of these, so it lets them through; it also
    // skips vendor-prefixed at-rules outright, which is what lets
    // @-webkit-keyframes past this list.
    //
    // Not listed, deliberately, because Chrome 40 has them and their absence
    // from the base game is an Uber-era habit rather than a constraint:
    // @supports (Chrome 28), @media, @font-face, @import, @charset, @namespace.
    "at-rule-disallowed-list": [
      "container", // Chrome 105
      "counter-style", // Chrome 91
      "custom-media", // never shipped
      "custom-selector", // never shipped
      "document", // never shipped in Blink, dropped from the spec
      "font-feature-values", // Chrome 78
      "font-palette-values", // Chrome 101
      "keyframes", // Chrome 43 - use @-webkit-keyframes
      "layer", // Chrome 99
      "position-try", // Chrome 125
      "property", // Chrome 85
      "scope", // Chrome 118
      "starting-style", // Chrome 117
      "view-transition", // Chrome 111
      "viewport", // never shipped in Blink
    ],

    // --- Properties the parser drops ---------------------------------------
    // Not listed, because Chrome 40 has them and a reader will assume otherwise:
    // object-fit/object-position (32), will-change (36), touch-action (36), all
    // (37), shape-outside/shape-margin (37), background-blend-mode (35),
    // font-kerning (33), font-variant-ligatures (34), tab-size (21),
    // text-underline-position (33), paint-order (35), border-image (16),
    // overflow-wrap (23), transition* (26), transform* (36), box-shadow (10),
    // border-radius (4), box-sizing (10) and flexbox in full (29).
    //
    // The `text-decoration` shorthand is also left alone - only its Chrome 57
    // longhands are banned, which additionally stops
    // declaration-block-no-redundant-longhand-properties proposing the
    // multi-value shorthand.
    "property-disallowed-list": [
      "/^--/", // custom properties - Chrome 49
      "/^animation(-|$)/", // Chrome 43 - use -webkit-animation
      "appearance", // Chrome 84 - use -webkit-appearance
      "aspect-ratio", // Chrome 88
      "backdrop-filter", // Chrome 76
      "-webkit-backdrop-filter", // also Chrome 76 - the prefix does not help
      "caret-color", // Chrome 57
      "clip-path", // Chrome 55 - use -webkit-clip-path
      "/^columns?(-|$)/", // Chrome 50 - use -webkit-column-*
      "contain", // Chrome 52
      "content-visibility", // Chrome 85
      "filter", // Chrome 53 - use -webkit-filter
      "font-feature-settings", // Chrome 48
      "/^font-synthesis/", // Chrome 97
      "gap", // flex gap - Chrome 84
      "row-gap", // Chrome 84
      "column-gap", // Chrome 84
      "/^grid(-|$)/", // Chrome 57
      "hyphens", // Chrome 88, and -webkit-hyphens is dropped here too
      "-webkit-hyphens",
      "/^inset(-|$)/", // Chrome 87
      "isolation", // Chrome 41
      "justify-items", // Chrome 57
      "justify-self", // Chrome 57
      "line-clamp", // Chrome 129 - use -webkit-line-clamp
      "/^mask(-|$)/", // Chrome 120 - use -webkit-mask-*
      "mix-blend-mode", // Chrome 41
      "/^offset(-|$)/", // Chrome 55
      "/^overscroll-behavior/", // Chrome 63
      // Never implemented in desktop Blink; the base game ships three inert
      // uses of it.
      "-webkit-overflow-scrolling",
      "/^place-(content|items|self)$/", // Chrome 59
      "rotate", // independent transforms - Chrome 104
      "scale", // Chrome 104
      "translate", // Chrome 104
      "scroll-behavior", // Chrome 61
      "/^scroll-(snap|padding|margin)/", // Chrome 69
      "text-align-last", // Chrome 47
      // Chrome 57, and -webkit-text-decoration-color is dropped here too.
      "/^(-webkit-)?text-decoration-(color|line|style|thickness|skip)/",
      "/^text-emphasis/", // Chrome 99 - use -webkit-text-emphasis
      "text-orientation", // Chrome 48
      // Never shipped unprefixed, and the prefixed form is dropped here too.
      "text-size-adjust",
      "-webkit-text-size-adjust",
      "transform-box", // Chrome 64
      "user-select", // Chrome 54 - use -webkit-user-select
      "writing-mode", // Chrome 48 - use -webkit-writing-mode
      "/^(margin|padding|border)-(block|inline)/", // logical - Chrome 69/87
      "/^(min-|max-)?(block|inline)-size$/", // logical sizing - Chrome 57
    ],

    // --- Functions ---------------------------------------------------------
    // Kept, so the omission reads as deliberate: calc() (Chrome 26, and the base
    // game uses it ~40 times), attr(), url(), format(), local(), counter(),
    // rgb()/rgba()/hsl()/hsla(), the linear/radial/repeating gradient family and
    // their -webkit- forms, cubic-bezier(), steps(), the transform functions
    // (36), the filter functions used inside -webkit-filter, and the basic
    // shapes used inside -webkit-clip-path.
    "function-disallowed-list": [
      "abs", // CSS math - Chrome 125
      "acos",
      "asin",
      "atan",
      "atan2",
      "cos",
      "exp",
      "hypot",
      "log",
      "mod",
      "pow",
      "rem",
      "round",
      "sign",
      "sin",
      "sqrt",
      "tan",
      "anchor", // Chrome 125
      "anchor-size", // Chrome 125
      "clamp", // Chrome 79
      "min", // Chrome 79
      "max", // Chrome 79
      "color", // Chrome 111
      "color-mix", // Chrome 111
      "lab", // Chrome 111
      "lch", // Chrome 111
      "oklab", // Chrome 111
      "oklch", // Chrome 111
      "hwb", // Chrome 101
      "conic-gradient", // Chrome 69
      "repeating-conic-gradient", // Chrome 69
      "constant", // iOS-only alias of env()
      "cross-fade", // unprefixed - Chrome 121
      "element", // Firefox only
      "env", // Chrome 69
      "fit-content", // the grid track function - Chrome 57
      "image-set", // unprefixed - Chrome 113
      "light-dark", // Chrome 123
      "linear", // linear() easing - Chrome 113
      "minmax", // grid - Chrome 57
      "repeat", // grid - Chrome 57
      "paint", // Houdini - Chrome 65
      "scroll", // scroll-driven animations - Chrome 115
      "view", // Chrome 115
      "var", // Chrome 49
    ],

    // --- Units -------------------------------------------------------------
    // This rule's primary takes strings only - no regex - so entries are exact
    // and lower case. Kept: px, %, em, ex, ch (27), rem (4), vw/vh/vmin/vmax
    // (26), s, ms, deg, rad, grad, turn (25), pt, pc, in, cm, mm, dpi, dpcm,
    // dppx/x (29).
    "unit-disallowed-list": [
      "cap", // font-relative - Chrome 127
      "ic",
      "lh",
      "rlh",
      "rex",
      "rch",
      "ric",
      "cqb", // container query - Chrome 105
      "cqh",
      "cqi",
      "cqmax",
      "cqmin",
      "cqw",
      "dvh", // dynamic viewport - Chrome 108
      "dvmax",
      "dvmin",
      "dvw",
      "svh",
      "svmax",
      "svmin",
      "svw",
      "lvh",
      "lvmax",
      "lvmin",
      "lvw",
      "vi", // logical viewport - Chrome 108
      "vb",
      "fr", // grid - Chrome 57
      "q", // Chrome 49
    ],

    // --- Selectors ---------------------------------------------------------
    "selector-pseudo-class-disallowed-list": [
      "any-link", // Chrome 65 - use :-webkit-any-link
      "autofill", // Chrome 110
      "defined", // Chrome 54
      "dir", // Chrome 120
      "focus-visible", // Chrome 86
      "focus-within", // Chrome 60
      "fullscreen", // Chrome 71 - use :-webkit-full-screen
      "has", // Chrome 105
      "is", // Chrome 88
      "local-link", // never shipped
      "matches", // never shipped - the :is() proposal name
      "modal", // Chrome 105
      "picture-in-picture", // Chrome 110
      "placeholder-shown", // Chrome 47
      "popover-open", // Chrome 114
      "target-within", // never shipped
      "user-invalid", // Chrome 119
      "user-valid", // Chrome 119
      "where", // Chrome 88
    ],
    // ::before/::after/::first-letter/::first-line/::selection, ::backdrop and
    // every ::-webkit- form are untouched - all present in Chrome 40. So are
    // :host and :host-context, from shadow DOM v0; they are unbannable on
    // compatibility grounds, and nothing in PA has a shadow root anyway.
    "selector-pseudo-element-disallowed-list": [
      "details-content", // Chrome 131
      "file-selector-button", // Chrome 89
      "grammar-error", // never shipped
      "spelling-error", // never shipped
      "highlight", // Chrome 105
      "marker", // Chrome 86
      "part", // Chrome 73
      "placeholder", // Chrome 57 - use ::-webkit-input-placeholder
      "/^scroll-/", // ::scroll-marker and friends - Chrome 135
      "slotted", // Chrome 50
      "target-text", // Chrome 89
      "/^view-transition/", // Chrome 111
    ],

    // --- Values the parser drops -------------------------------------------
    // 8-digit hex is handled by color-hex-alpha and multi-keyword display by
    // display-notation, rather than by regexes here.
    "declaration-property-value-disallowed-list": {
      "background-clip": ["text"], // Chrome 120 - use -webkit-background-clip
      display: [
        "contents", // Chrome 65
        "flow-root", // Chrome 58
        "grid", // Chrome 57
        "inline-grid", // Chrome 57
      ],
      "image-rendering": ["pixelated"], // Chrome 41
      // The nastiest entry here. Chrome 40's *parser* accepts all six and
      // getComputedStyle reports them back, but flex layout ignores them and
      // falls back to flex-start - measured, they lay out identically to a
      // bogus value. CSS.supports() says yes and the page is still wrong.
      // space-around and space-between are genuinely implemented and stay.
      "justify-content": [
        "end", // box alignment L3 - Chrome 57
        "left",
        "normal",
        "right",
        "start",
        "space-evenly", // Chrome 60
      ],
      // Chrome 56; -webkit-sticky was removed again in Chrome 37.
      position: ["-webkit-sticky", "sticky"],
      "white-space": ["break-spaces"], // Chrome 76
      "word-break": ["keep-all"], // Chrome 44
      // box alignment L3 - Chrome 57. flex-start/flex-end/center/baseline/
      // stretch are the Chrome 40 spelling and stay legal.
      "/^(align-items|align-self|justify-items|justify-self)$/": [
        "end",
        "normal",
        "self-end",
        "self-start",
        "start",
      ],
      // Chrome 46 - use the -webkit- forms.
      "/^(width|height|min-width|max-width|min-height|max-height|flex-basis)$/":
        ["fit-content", "max-content", "min-content", "stretch"],
      // Chrome 90; it computes to `visible` here. `overlay` is left alone - it
      // is non-standard, but this engine does honour it.
      "/^overflow(-x|-y)?$/": ["clip"],
    },

    // no-unknown-animations is deliberately not enabled: it cannot see
    // -webkit-animation-name, and unprefixed animation-name is banned above, so
    // it would only give false assurance.

    // --- House style -------------------------------------------------------
    // Deliberately stricter than the base game, which mixes snake_case, kebab
    // and uppercase in both classes and ids. The mod's own names stay lower
    // case; the pattern never sees the stock names it selects.
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)((_|-)[a-z0-9]+)*$",
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case or snake_case`,
      },
    ],
    "selector-id-pattern": [
      "^([a-z][a-z0-9]*)((_|-)[a-z0-9]+)*$",
      {
        message: (selector) =>
          `Expected id selector "${selector}" to be kebab-case or snake_case`,
      },
    ],
    // This rule proposes a shorthand purely from the longhands present, with no
    // regard for whether the shorthand itself is banned above - so left
    // unrestricted it rewrites working CSS into declarations the engine drops.
    // Measured against the base game, it wanted `inset` 38 times and
    // `place-content` 12. Every shorthand it can emit that Chrome 40 cannot
    // parse is therefore listed here; the full set it draws from is
    // stylelint's longhandSubPropertiesOfShorthandProperties.
    "declaration-block-no-redundant-longhand-properties": [
      true,
      {
        ignoreShorthands: [
          "overflow", // the 2-value shorthand is Chrome 68
          "animation", // Chrome 43
          "/^(columns|column-rule)$/", // Chrome 50
          "gap", // Chrome 84
          "/^grid/", // Chrome 57
          "/^inset/", // Chrome 87
          "mask", // Chrome 120
          "overscroll-behavior", // Chrome 63
          "/^place-/", // Chrome 59
          "/^scroll-(margin|padding)/", // Chrome 69
          "text-decoration", // the multi-value shorthand is Chrome 57
          "text-emphasis", // Chrome 99
          "font-synthesis", // Chrome 97
          "font-variant", // the multi-value shorthand is Chrome 52
          "/-(block|inline)(-|$)/", // logical shorthands - Chrome 69/87
        ],
      },
    ],
  },
};
