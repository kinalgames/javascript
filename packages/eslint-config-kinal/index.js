import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

/**
 * KinalGames ESLint Configuration (Flat Config)
 * 
 * Based on ESLint 9+ flat config format with:
 * - ESLint recommended rules
 * - TypeScript-ESLint recommended + stylistic rules
 * - React + React Hooks rules
 * - JSX Accessibility rules
 * - Prettier compatibility
 * 
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  // Global ignores
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.d.ts',
    ],
  },

  // ESLint recommended
  eslint.configs.recommended,

  // TypeScript-ESLint recommended + stylistic
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // React recommended (includes jsx-runtime for React 17+)
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],

  // Prettier - must be last to override formatting rules
  prettierConfig,

  // Main configuration for all JS/TS files
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ESLint core rules
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-param-reassign': ['error', { props: false }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],

      // Disable base rules that have TS equivalents
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-redeclare': 'off',

      // TypeScript-ESLint rules
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // Note: prefer-optional-chain and prefer-nullish-coalescing require typed linting
      // Enable them in your project if you have typed linting configured
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
      ],

      // React rules
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/hook-use-state': 'warn',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/no-array-index-key': 'warn',
      'react/jsx-props-no-spreading': 'off', // Often useful in component libraries
      'react/require-default-props': 'off', // Not needed with TypeScript
      'react/display-name': 'off', // Can be annoying with HOCs

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX Accessibility rules (subset of recommended)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
    },
  },

  // TypeScript-specific overrides
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // Stricter rules for TypeScript files
      '@typescript-eslint/explicit-function-return-type': 'off', // Let TypeScript infer
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Let TypeScript infer
    },
  },

  // JavaScript-specific overrides (disable TS rules)
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Config files (more relaxed)
  {
    files: ['**/*.config.{js,ts,mjs,cjs}', '**/vite.config.*', '**/next.config.*', '**/tailwind.config.*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Test files
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}', '**/__tests__/**/*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
