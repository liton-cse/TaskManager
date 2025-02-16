module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true, node: true,},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module',    ecmaFeatures: {
    jsx: true, // Enable JSX for React
  },
 },
  settings: { react: { version: '18.2' } },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
