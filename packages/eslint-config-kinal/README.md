# eslint-config-kinal

Modern ESLint configuration for React + TypeScript projects using the flat config format (ESLint 9+).

## Features

- ✅ ESLint 9+ flat config format
- ✅ TypeScript-ESLint recommended + stylistic rules
- ✅ React + React Hooks rules
- ✅ JSX Accessibility (a11y) rules
- ✅ Prettier compatibility (no formatting conflicts)
- ✅ Sensible defaults with escape hatches
- ✅ Separate configs for tests and config files

## Requirements

- Node.js >= 20.0.0
- ESLint >= 9.0.0
- Prettier >= 3.0.0
- TypeScript >= 5.0.0

## Installation

```bash
npm install --save-dev eslint prettier typescript eslint-config-kinal
```

Or with other package managers:

```bash
# Yarn
yarn add --dev eslint prettier typescript eslint-config-kinal

# pnpm
pnpm add --save-dev eslint prettier typescript eslint-config-kinal

# Bun
bun add --dev eslint prettier typescript eslint-config-kinal
```

## Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) in your project root:

```js
import kinalConfig from 'eslint-config-kinal';

export default [...kinalConfig];
```

### With custom rules

```js
import kinalConfig from 'eslint-config-kinal';

export default [
  ...kinalConfig,
  {
    rules: {
      // Your custom rules
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

### With additional ignores

```js
import kinalConfig from 'eslint-config-kinal';

export default [
  {
    ignores: ['generated/**', 'legacy/**'],
  },
  ...kinalConfig,
];
```

## What's Included

### Base Rules

- **ESLint Recommended**: Core JavaScript best practices
- **TypeScript-ESLint**: Type-aware linting rules
- **React**: React-specific best practices
- **React Hooks**: Rules of Hooks enforcement
- **JSX A11y**: Accessibility checks for JSX

### Key Rules Enabled

| Category | Rules |
|----------|-------|
| Code Quality | `prefer-const`, `no-var`, `eqeqeq`, `curly` |
| TypeScript | `consistent-type-imports`, `no-unused-vars`, `naming-convention` |
| React | `rules-of-hooks`, `exhaustive-deps`, `jsx-no-useless-fragment` |
| Accessibility | `alt-text`, `anchor-is-valid`, `aria-props` |

### File-specific Configs

- **TypeScript files** (`.ts`, `.tsx`): Full TypeScript rules
- **JavaScript files** (`.js`, `.jsx`): TypeScript type-checking disabled
- **Config files** (`*.config.*`): Relaxed rules (e.g., `no-console` off)
- **Test files** (`*.test.*`, `*.spec.*`): Relaxed rules for testing

## Migration from v2.x

Version 3.0.0 introduces breaking changes due to the new ESLint flat config format.

### Steps to migrate:

1. **Update ESLint** to version 9.x or later
2. **Rename** `.eslintrc.js` or `.eslintrc.json` to `eslint.config.js` (or `.mjs`)
3. **Update** the config format:

**Before (v2.x - eslintrc format):**
```json
{
  "extends": "kinal"
}
```

**After (v3.x - flat config):**
```js
import kinalConfig from 'eslint-config-kinal';

export default [...kinalConfig];
```

4. **Remove** any `eslintIgnore` from `package.json` (use `ignores` in config instead)

## Prettier Integration

This config includes `eslint-config-prettier` to disable all ESLint rules that might conflict with Prettier. Just make sure Prettier is configured in your project.

Create a `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## VS Code Setup

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and add to your `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.useFlatConfig": true
}
```

## License

MIT
