import js from "@eslint/js";
import lodash from "eslint-plugin-lodash";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 6, // only some ES6 support - PA uses Chrome 40
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
    },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  // Prettier config last to disable conflicting rules
  prettier,
]);
