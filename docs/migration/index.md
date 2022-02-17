# 迁移问题

只记录升级过程中遇到的各官方网站未明确说明的问题。

## vue

* 使用解构赋值会失去响应式。
* 打包可能有些依赖被定义为外部依赖。
* $nextTick 等需要手动引用，

## vite

### 动态导入的两种方式

1. `makeRaw(defineAsyncComponent(() => import())`
2. `import.meta.glob`

## element-plus

1. el-submenu => el-sub-menu
2. 默认是英文，需要手动改为中文，WTF
