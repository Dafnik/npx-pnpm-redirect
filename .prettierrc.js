module.exports = {
  plugins: [
    "prettier-plugin-organize-attributes",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-sort-json",
  ],
  printWidth: 100,
  singleQuote: true,
  bracketSpacing: false,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: "ignore",
  jsonRecursiveSort: true,
  overrides: [
    {
      files: ["*.tsx"],
      options: {
        parser: "babel-ts",
      },
    },
  ],
};
