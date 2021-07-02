module.exports = {
  extends: ['airbnb-typescript'],
  env: {
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    // disable rules from base configurations
    "for-direction": "off",
    "react/prefer-stateless-function": "warn",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-props-no-spreading": "warn",
    "arrow-body-style": "off",
    "jsx-a11y/label-has-associated-control": ["error", {
      "required": {
        "some": ["nesting", "id"],
      },
    }],
    "jsx-a11y/label-has-for": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/brace-style": "off",
    "max-len": "off",

  },
  ignorePatterns: ['.eslintrc.js']
};
