module.exports = {
  extends: "airbnb",
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "arrow-parens": ["error", "as-needed"],
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "no-plusplus": "off",
  },
  env: {
    browser: true,
    node: true,
  }
};