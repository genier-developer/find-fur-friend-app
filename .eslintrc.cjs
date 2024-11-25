module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/display-name': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      '@typescript-eslint/no-unused-expressions': 'off',
  },
};
