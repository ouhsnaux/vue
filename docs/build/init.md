# 初始化

## 使用脚手架创建项目

```cmd
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue
```

修改配置

```js
{
  "dev": "vite --port=3000",
}
```

## 代码规范

### EditorConfig

添加文件 `.editorconfig`

```bash
root = true

[*]

end_of_line = LF
charset = utf-8
max_line_length = 100
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

### Eslint + Prettier

开发环境安装相关依赖，

```json
{
  "@vue/eslint-config-prettier": "^7.0.0",
  "eslint": "^8.7.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-plugin-import": "^2.25.4",
  "eslint-plugin-prettier": "^4.0.0",
  "eslint-plugin-vue": "^8.3.0",
  "prettier": "^2.5.1",
}
```

添加配置文件 `.eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    'airbnb-base',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 1,
    'no-param-reassign': 0,
    'func-names': 0,

    // import规则目前未添加 vite.config.js
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/vite.config.js'] }],
    'import/prefer-default-export': 0,

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
};
```

### 格式化

修改 `package.json` 在 `scripts` 中添加

```json
{
  "lint": "eslint --ext .js,.vue ./",
  "lint:fix": "eslint --fix --ext .js,.vue ./"
}
```

## 别名

### 项目配置

修改 `vite.config.js`，添加

```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

### 编辑器配置

添加 `jsconfig.json` 或 `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### Eslint配置

安装依赖 `npm i -D eslint-import-resolver-alias`

`.eslintrc.js` 文件后添加

```js
{
  ...
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
}
```

## TS

`tsc --init` 生成 `tsconfig.json`, 配置别名，添加 `allowJs: true`。

## 环境变量

添加 `.env.development` 和 `.env.production`

```bash
VITE_API_BASE_URL = '/'
VITE_API_TIME_OUT = 6000
```
