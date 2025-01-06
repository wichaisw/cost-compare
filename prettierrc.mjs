/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-typescript",
    "prettier-plugin-tailwindcss",
  ],

  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro",
      },
    },
    {
      files: ["*.tsx"],
      options: {
        parser: "typescript",
      },
    },
  ],
  tailwindConfig: "./tailwind.config.mjs",
  tailwindAttributes: ["tw"],
  tailwindFunctions: ["tw"],
};
