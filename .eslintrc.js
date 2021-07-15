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
    "arrow-body-style": "off",
    "for-direction": "off",
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
    "max-len": "off",
    "no-console": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/require-default-props": "off",
    "react/prefer-stateless-function": "warn",
    "react/prop-types": "warn",
    "@typescript-eslint/brace-style": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "warn",


  },
  ignorePatterns: ['.eslintrc.js']
};
