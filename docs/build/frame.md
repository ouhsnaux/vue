# 项目结构

## 基本结构

```dir
|-- public
  |-- favicon.ico
  |-- iconfont.js // 图标
|-- src
  |-- api // 接口，根据来源分类
  |-- assets // 公用资源
    |-- images 
    |-- styles // 详细见下一节
  |-- const // 公用常量
  |-- services // 服务
    |-- error // 错误收集并上报
    |-- log // 日志上报
    |-- request // axios封装
    |-- token // 身份验证
    |-- storage // 存储相关
  |-- utils // 工具
    |-- format.js // 格式化
    |-- _.js // 常用函数，比如防抖，深拷贝等
```

## 样式结构

* reset 重置浏览器样式
* common 通用，与业务无关，多个项目可复用
* global 业务中重复使用的样式
* animation 动画
* variable SCSS 变量
* element-ui ele样式重置

## 环境变量

### 定义

位置 .env, .env.development, .env.production 添加变量，必须以 `VITE_` 开头。

在 `src/vite-node.d.ts` 中定义环境变量类型

```ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string,
  readonly VITE_API_TIME_OUT: number,
  readonly VITE_USE_MOCK: boolean,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 类型转换

<!-- TODO 转换函数目前校验报错 -->

环境变量默认都是字符串类型，需要进行类型转换

添加 `build/index.ts` 文件

```ts
const numberTypeKey = ['VITE_API_TIME_OUT'];
export const useEnv = (env: Recordable): ImportMetaEnv =>
  Object.keys(env).reduce((acc, key) => {
    let value = env[key];
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (numberTypeKey.includes(key)) {
      value = +value;
    }
    acc[key] = value;
    return acc;
  }, {});
```

修改 `tsconfig.json` 的 `include`，添加

```json
include: ["build/**/*.ts"]
```
