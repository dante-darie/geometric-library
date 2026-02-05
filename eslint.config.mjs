import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        projectService: true
      }
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          extensions: ['.ts', '.tsx']
        })
      ]
    },
    rules: {
      indent: ['warn', 2, { SwitchCase: 1 }],
      'no-unused-vars': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/quotes': ['error', 'single'],
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off'
          }
        }
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: {
            order: 'alphabetically'
          }
        }
      ],
      quotes: 'off',
      semi: ['error', 'always'],
      'multiline-ternary': 'off',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'import-x/no-named-default': 'off',
      'import-x/no-unresolved': 'error',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-cycle': ['error', { maxDepth: 1 }]
    }
  },
  eslintConfigPrettier,
  {
    ignores: ['dist/**', 'node_modules/**']
  }
];
