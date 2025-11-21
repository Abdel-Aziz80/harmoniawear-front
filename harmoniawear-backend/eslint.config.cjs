// harmoniawear-backend/eslint.config.cjs
const globals = {
  require: "readonly",
  module: "readonly",
  process: "readonly",
  __dirname: "readonly",
  console: "readonly",
  Buffer: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
};

module.exports = [
  {
    files: ["**/*.js"],
    // remplace l'ancien .eslintignore
    ignores: ["node_modules/**", "dist/**", "build/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // CommonJS
      globals,
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "off",
    },
  },
];
