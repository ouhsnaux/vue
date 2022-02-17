# 基础

## 创建

* 通过根组件，创建应用实例 `const app = createApp(根组件)`
* 挂载到HTML `app.mount('#app')`
* 配置 `app.config`
* 全局注册组件 `app.component(componentName, component)`

## 模板语法

结构与 `HTML` 相同

### 标签

* `HTML` 标签
* 自定义组件

### 内容

* 嵌套 `HTML` 或组件
* 文本
  * 普通字符串
  * 使用双大括号包含表达式（包括变量）
* 字符串渲染 `HTML`，使用指令 `v-html`，注意 `XSS`

### 属性

* 字符串型直接传递
* 动态值或非字符串型使用 `v-bind`，简写 `:`

### 指令

以 `v-` 开头的特殊属性，当表达式更新时，动态修改 `DOM`，包含4部分：

* 指令名
* 参数，只能是 `string` 或 `null`，支持动态，表达式中不要出现单引号和空格
* 值
* 修饰符

::: tip
`JS` 表达式可以用在文本插值或指令中，只能访问内置 `JS` 全局属性，可以通过 `app.config.globalProperties` 添加。
:::

## 响应式

### 技术方案

Vue2 使用 `getter/setter`

Vue3 `reactive` 对象使用 `proxy`，`ref` 使用 `getter/setter`

### 响应时机

当响应式数据变化后，DOM更新并不是同步调整的。
而是在 `next tick` 修改 `DOM`。确保 `DOM` 值合并更新一次。

需要等 `DOM` 更新完毕后再执行的代码，给全局函数 `nextTick` 传递回调函数。

### Option Api

* 通过 `data` 函数定义响应数据，后续新增的属性将不具备响应能力。
* 通过 `methods` 添加方法，已绑定 `this`，不要使用箭头函数。

::: tip
`methods` 等对象的属性是所有组件公用的，如果创建了闭包（比如通过`debounce`），可能不符合你的预期。

可以通过 `created` 声明周期动态添加。
:::

### Composition Api

#### reactive

使用 `reactive` 创建响应式对象。

* 如果参数为普通对象，返回一个新的 `Proxy`，并且递归修改子属性
* 如果是 `proxy` 返回该 `proxy`

::: tip
局限：

1. 参数只能是引用类型，不能是原始类型。
2. 替换，解构赋值，甚至是将属性传递给参数都会造成响应性丢失。
:::

#### ref

将原始类型数据转化为响应式对象。
使用时需要调用 `value` 属性。
`template` 中可以直接使用，但是如果响应式作为别的属性，仍然需要调用 `value` 属性。
作为 `reactive` 对象的属性也可以自动解

## 计算属性

* 缓存结果，只在响应式依赖对象发生变化时计算
* 支持 `get` 和 `set`
* `getter` 不应该有副作用，否则应该使用 `watch`

## 绑定类与样式

除了字符串，还支持对象和数组。
给组件传递，会自动添加到根元素。多根组件需要通过 `$attrs.class` 指定。

Vue会根据当前浏览器环境自动给 `style` 添加需要的前缀。

## 条件渲染与列表渲染

* `v-if`
* `v-else`
* `v-else-if`
* `v-show`
* `v-for`

如果多个元素需要使用相同的条件，可以在外层添加 `<template>`，这个元素最终不会渲染。

`v-show` 控制 `display` 样式是否显示，不能在 `<template>` 上使用，也不能和 `v-else` 一起使用。

`v-if` 是真正的条件渲染。

`v-for` 除了遍历数组还支持对象和数字，介词除了 `in` 还可以使用 `of`。
支持与 `<template>` 配合。

`v-for` 与 `v-if` 最好不要同时使用。会优先使用 `v-if`。

`v-for` 通过指定 `key` 属性显示决定如何复用。

## 事件

可以传递函数名，函数调用，甚至是内联函数内容。

函数调用中，使用 `$event` 表示函数调用的原参数。

修饰符

## 双向绑定

`v-model`, `modalValue` 属性和 `update:modalValue` 事件的结合。
支持传递其它属性。

## 生命周期

[生命周期图](./lifecycle.png)

## watchers

当状态变化时执行副作用。

可以监听 `ref`, `reactive`，`getter`函数，或是多个资源的数组。使用第三个参数配置 `deep` 深度监听。

::: tip
不能监听 `reactive` 对象的属性，而使用 `getter` 函数。
:::

## TODO

* 被复用组件不执行什么声明周期，什么数据会变，什么数据不会变。
* 测试 `key` 使用 `symbol`

进度

<https://vuejs.org/guide/essentials/watchers.html#watcheffect>
