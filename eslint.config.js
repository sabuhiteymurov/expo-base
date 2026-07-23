const { defineConfig } = require('eslint/config');
const universeNative = require('eslint-config-universe/flat/native');
const typescriptAnalysis = require('eslint-config-universe/flat/shared/typescript-analysis');

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'coverage/**',
      'dist/**',
      'cli/**',
    ],
  },
  universeNative,
  typescriptAnalysis,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './e2e/tsconfig.json'],
      },
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'import/extensions': 'off',
      'import/order': [
        'error',
        {
          groups: [['external', 'builtin', 'internal', 'type']],
          pathGroups: [
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
          ],
        },
      ],
      'padded-blocks': 'off',
      'no-underscore-dangle': 'off',
      'max-len': [1, 1000, 4],
      quotes: [2, 'single'],
      'linebreak-style': 0,
      semi: [1, 'always'],
      'no-console': [0],
      'no-loop-func': [0],
      'new-cap': [0],
      'no-trailing-spaces': [0],
      'no-param-reassign': [0],
      'func-names': [0],
      'comma-dangle': [0],
      'no-unused-expressions': [0],
      'block-scoped-var': [0],
      'no-nested-ternary': 'off',
      'no-multiple-empty-lines': [2, { max: 2 }],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-unresolved': 'off',
      'import/no-named-as-default-member': 'off',
      'no-void': ['warn', { allowAsStatement: true }],
      'no-use-before-define': 'off',
      'prefer-arrow-callback': 'off',
      camelcase: 'off',
    },
  },
  {
    files: ['e2e/**'],
    languageOptions: {
      globals: {
        device: 'readonly',
        element: 'readonly',
        by: 'readonly',
        waitFor: 'readonly',
        detox: 'readonly',
      },
    },
  },
]);
