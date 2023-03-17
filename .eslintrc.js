module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    // 'standard-with-typescript',
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/recommended', 
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: '.',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src'],
      },
    },
  },
  rules: {
    'linebreak-style': 'off',
    'no-console':'off',
    // Disallow the `any` type.
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    // 'react-hooks/exhaustive-deps': 'off',
    // // Enforce the use of the shorthand syntax.
    // 'object-shorthand': 'error',
    // 'no-console': 'warn',
    // // Existing rules
    // 'comma-dangle': 'off', // https://eslint.org/docs/rules/comma-dangle
    // 'function-paren-newline': 'off', // https://eslint.org/docs/rules/function-paren-newline
    // 'global-require': 'off', // https://eslint.org/docs/rules/global-require
    // 'import/no-dynamic-require': 'off', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    // 'no-inner-declarations': 'off', // https://eslint.org/docs/rules/no-inner-declarations
    // // New rules
    // 'class-methods-use-this': 'off',
    // 'import/extensions': 'off',
    // 'import/prefer-default-export': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // // allow jsx syntax in js files (for next.js project)
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], //should add ".ts" if typescript project
    "react/react-in-jsx-scope": "off",
    'react/function-component-definition': 'off',
    'react/self-closing-comp': ["error", { "component": true, "html": true }],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    'import/prefer-default-export': 'off',
    "prefer-const": "off"
  },
};
