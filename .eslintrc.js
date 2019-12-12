module.exports = {
  extends: "airbnb",
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "no-plusplus": "off",
  },
  env: {
    browser: true,
    node: true,
  }
};