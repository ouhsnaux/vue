# Enhance Concepts

## Vue3改动

### 优点

* Composition API
* TS 支持
* 响应式
* 其它
  * 生命周期
  * 指令

#### Composition API

Option API 与 Composition API 相比非常像对象直接量与通过构造函数生产对象的对比。

* 目的
  * 复用有状态逻辑代码
  * 内置变量（defineProps等）
  * 自动导出

局限：

`props, emits, name, inheritAttrs` 仍需要 `Option API`

### 缺点

* 响应式带来的新问题
  * 需要考虑要不要加 `.value`
  * 解构赋值会造成响应式丢失，写起来十分麻烦
* 数组中使用ref，基本必须使用内联函数

## 响应式原理

TODO

<https://vuejs.org/guide/extras/reactivity-in-depth.html>

## TODO

VueUse
