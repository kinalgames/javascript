# javascript

Hướng dẫn này dựa theo tiêu chuẩn của **Airbnb**, xem đầy
đủ [JavaScript Style Guide](https://github.com/airbnb/javascript)

Đối với các dự án của Kinal, tất cả các đoạn mã không tuân theo tiêu chuẩn trên, team lead và reviewer cần reject PR và
yêu cầu dev sửa lại.

## Yêu cầu chung

- Các thư viện, hooks nên sử dụng kết hợp trong 1 project:
  - Prettier
  - CommitLint
  - ESLint
  - Husky
  - Lint-staged
- Luôn dùng `Typescript` (không dùng Javascript thuần ngoại trừ trường hợp viết thư viện hoặc các package)

## Hướng dẫn Cài đặt Prettier và ESLint

### 1. Prettier

#### Cài đặt

```shell
npm install --save-dev --save-exact prettier
or
yarn add --dev --exact prettier
```

#### Config

Tạo file `.prettierrc.json` hoặc `.prettierrc` trong project với nội dung như sau:

```json
{
  "trailingComma": "all",
  "semi": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxBracketSameLine": true
}
```

Trong `package.json` thêm nội dung sau vào phần `scripts`

```json
{
  "scripts": {
    "format": "prettier --write **/*.{js,jsx,ts,tsx,css,md,json} --ignore-path .gitignore",
    "format:check": "prettier --check **/*.{js,jsx,ts,tsx,css,md,json} --ignore-path .gitignore"
  }
}
```

#### Sử dụng

Check code

```shell
npm run format:check
```

Format code

```shell
npm run format
```

### 2. ESLint

#### Cài đặt ESLint

```shell
npm install eslint --save-dev

# or

yarn add eslint --dev
```

Cài đặt package của
Kinal: [eslint-config-kinal](https://github.com/kinal-co/javascript/tree/main/packages/eslint-config-kinal)

```shell
npx install-peerdeps --dev eslint-config-kinal
```

#### Config

Tạo tệp tin `.eslintrc.json`:

```json
{
  "extends": "eslint-config-kinal"
}
```

Một số cài đặt khác có thể tham khảo:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint-config-kinal",
  "rules": {
    "no-console": [
      "warn",
      {
        "allow": ["info", "warn", "error"]
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["./src"]
      }
    }
  }
}
```

Trong `package.json` thêm dòng sau vào phần `scripts`

```json
{
  "scripts": {
    "lint": "eslint . --ext=js,jsx,ts,tsx --ignore-path .gitignore",
    "lint:fix": "eslint . --ext=js,jsx,ts,tsx --fix --ignore-path .gitignore"
  }
}
```

#### Sử dụng

Check code

```shell
npm run lint
```

Format code

```shell
npm run lin:fix
```

## Kết hợp ESLint, Prettier, CommitLint với Husky và Lint-staged

### 1. Husky

#### Cài đặt

```shell
npm install husky --save-dev
# hoặc
yarn add husky --dev
```

#### Enable Git hooks

```shell
npx husky install
# hoặc
yarn husky install
```

#### Tự động enable git hooks mỗi khi cài đặt package

```shell
npm set-script prepare "husky install"
```

Sau khi chạy command trên, nội dung phần `scripts` trong file `package.json` sẽ được bổ sung thêm đoạn sau:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### 2. CommitLint

#### Cài đặt

```shell
npm install -g @commitlint/cli @commitlint/config-conventional
```

#### Config

Tạo tệp tin `.commitlintrc.json` với nội dung như sau

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Ngoài ra có thể thêm các tùy chọn nâng cao

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "subject-case": [2, "always", "sentence-case"],
    "type-enum": [
      2,
      "always",
      ["build", "release", "ci", "chore", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
    ]
  }
}
```

#### Thêm CommitLint vào Husky

```shell
# Thêm hook
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
# hoặc
yarn husky add .husky/commit-msg "commitlint --edit $1"
```

Chi tiết có thể xem thêm tại [trang chủ](https://commitlint.js.org/)

### 3. Lint-staged

#### Cài đặt

```shell
npm install --save-dev lint-staged
# hoặc
yarn add --dev lint-staged
```

#### Config

Thêm nội dung sau vào file `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
    "*.{json,yml,yaml,md}": "prettier --write"
  }
}
```

#### Thêm vào husky

```shell
npx husky add .husky/pre-commit "lint-staged"
# hoặc
yarn husky add .husky/pre-commit "lint-staged"
```

Sau khi thêm, mỗi khi commit lint-staged sẽ tự động chạy các câu lệnh trong section `lint-staged` của
file `package.json`

Như vậy, 1 project hoàn chỉnh sau khi cài đặt xong các plugin trên thì tệp tin `package.json` cần bổ sung các nội dung sau:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
    "*.{json,yml,yaml,md}": "prettier --write"
  },
  "scripts": {
    "lint": "eslint . --ext=js,jsx,ts,tsx --ignore-path .gitignore",
    "lint:fix": "eslint . --ext=js,jsx,ts,tsx --fix --ignore-path .gitignore",
    "format": "prettier --write **/*.{js,jsx,ts,tsx,css,md,json} --ignore-path .gitignore",
    "format:check": "prettier --check **/*.{js,jsx,ts,tsx,css,md,json} --ignore-path .gitignore",
    "prepare": "husky install"
  }
}
```

Để tìm hiểu thêm, hãy đọc chi tiết document của các thư viện trên và sử dụng tùy theo yêu cầu của dự án.
