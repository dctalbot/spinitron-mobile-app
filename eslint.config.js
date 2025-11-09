// module.exports = {
//   env: {
//     browser: false,
//     es2021: true,
//   },
//   extends: "eslint:recommended",
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
// };

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const custom = {
  rules: {
    // use tsc instead
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text"],
            message: "Use AppText instead.",
          },
          {
            name: "@expo/html-elements",
            importNames: ["A"],
            message: "Use AppLink instead.",
          },
          {
            name: "expo-image",
            importNames: ["Image", "ImageProps"],
            message: "Use AppImage instead.",
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

const ignore = {
  ignores: [".expo", "babel.config.js", "babel.config.cjs"],
};

const langOptions = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
    },
  },
};

const defaults = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
);

export default defaults.concat(
  reactRecommended,
  reactHooks.configs.flat.recommended,
  custom,
  ignore,
  langOptions,
);
