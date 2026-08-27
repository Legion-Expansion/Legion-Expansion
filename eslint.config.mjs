import js from "@eslint/js";
import esX from "eslint-plugin-es-x";
import lodash from "eslint-plugin-lodash";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      // A parser setting, not a claim about PA - restrict-to-es5 below does that.
      ecmaVersion: 6,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.amd,
        api: "readonly",
        model: "readonly",
        _: "readonly",
        loc: "readonly",
        locTree: "readonly",
        ko: "readonly",
        engine: "readonly",
        loadCSS: "readonly",
        loadHtml: "readonly",
        loadScript: "readonly",
        Build: "readonly",
        handlers: "readonly",
      },
      sourceType: "script",
    },
    plugins: { js, lodash },
    extends: ["js/recommended", "lodash/v3"],
    rules: {
      curly: ["error", "all"],
      "lodash/prefer-lodash-method": ["error", { ignoreMethods: ["split"] }],
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
    },
  },
  {
    // Shipped game code. This forbids every post-ES5 feature, syntax and builtins
    // alike; the block below whitelists back what Chrome 40 has. The inversion is
    // deliberate - a new builtin is unavailable until proven otherwise.
    files: ["src/**/*.js"],
    ...esX.configs["flat/restrict-to-es5"],
  },
  {
    // Exhaustive, not as-needed: no entry means no. Each trailing comment is the
    // Chrome release that shipped the feature, which must be <= 40.
    files: ["src/**/*.js"],
    rules: {
      // Array.prototype.values is deliberately absent - Chrome 66.
      "es-x/no-array-prototype-entries": "off", // Chrome 38
      "es-x/no-array-prototype-keys": "off", // Chrome 38
      "es-x/no-for-of-loops": "off", // Chrome 38
      "es-x/no-generators": "off", // Chrome 39
      "es-x/no-map": "off", // Chrome 38
      "es-x/no-math-acosh": "off", // Chrome 38
      "es-x/no-math-asinh": "off", // Chrome 38
      "es-x/no-math-atanh": "off", // Chrome 38
      "es-x/no-math-cbrt": "off", // Chrome 38
      "es-x/no-math-clz32": "off", // Chrome 38
      "es-x/no-math-cosh": "off", // Chrome 38
      "es-x/no-math-expm1": "off", // Chrome 38
      "es-x/no-math-fround": "off", // Chrome 38
      "es-x/no-math-hypot": "off", // Chrome 38
      "es-x/no-math-imul": "off", // Chrome 28
      "es-x/no-math-log10": "off", // Chrome 38
      "es-x/no-math-log1p": "off", // Chrome 38
      "es-x/no-math-log2": "off", // Chrome 38
      "es-x/no-math-sign": "off", // Chrome 38
      "es-x/no-math-sinh": "off", // Chrome 38
      "es-x/no-math-tanh": "off", // Chrome 38
      "es-x/no-math-trunc": "off", // Chrome 38
      "es-x/no-number-epsilon": "off", // Chrome 34
      "es-x/no-number-isfinite": "off", // Chrome 19
      "es-x/no-number-isinteger": "off", // Chrome 34
      "es-x/no-number-isnan": "off", // Chrome 25
      "es-x/no-number-issafeinteger": "off", // Chrome 34
      "es-x/no-number-maxsafeinteger": "off", // Chrome 34
      "es-x/no-number-minsafeinteger": "off", // Chrome 34
      "es-x/no-number-parsefloat": "off", // Chrome 34
      "es-x/no-number-parseint": "off", // Chrome 34
      "es-x/no-object-getownpropertysymbols": "off", // Chrome 38
      "es-x/no-object-is": "off", // Chrome 19
      "es-x/no-object-setprototypeof": "off", // Chrome 34
      "es-x/no-promise": "off", // Chrome 32
      "es-x/no-set": "off", // Chrome 38
      "es-x/no-string-prototype-normalize": "off", // Chrome 34
      "es-x/no-symbol": "off", // Chrome 38
      "es-x/no-typed-arrays": "off", // Chrome 7
      "es-x/no-weak-map": "off", // Chrome 36
      "es-x/no-weak-set": "off", // Chrome 36
    },
  },
  {
    // Already errors via restrict-to-es5. Restated so each reads as deliberate
    // rather than as an oversight next to the whitelist.
    files: ["src/**/*.js"],
    rules: {
      "es-x/no-block-scoped-variables": "error",
      "es-x/no-block-scoped-functions": "error",
      // PA's own polyfill makes these one-argument, so they return a wrong answer
      // rather than throwing. Use _.startsWith / _.endsWith.
      "es-x/no-string-prototype-startswith": "error",
      "es-x/no-string-prototype-endswith": "error",
    },
  },
  {
    // Tooling config, not shipped, so not bound by the Chrome 40 constraint. The
    // block above targets **/*.js, which does not match .mjs, so this restates
    // js/recommended rather than overriding it.
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      curly: ["error", "all"],
    },
  },
  // Prettier config last to disable conflicting rules
  prettier,
]);
