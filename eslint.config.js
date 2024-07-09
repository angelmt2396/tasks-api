import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: true,
        },
      ],
    },
  },
  {
    ignores: ["eslint.config.js"],
  },
];
