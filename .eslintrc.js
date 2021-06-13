module.exports = {
  extends: ['airbnb-typescript'],
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
    "arrow-body-style": "always",
  },
  ignorePatterns: ['.eslintrc.js']
};
