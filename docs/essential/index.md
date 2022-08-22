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

函数调用中，使用 `$event` 表示原始DOM事件。

修饰符，注意顺序问题

* .stop
* .prevent
* .capture
* .self
* .once
* .passive

### 按键事件

`@key-up.enter`
`@key-up.enter.ctrl`
`@key-up.enter.ctrl.exact`

### 鼠标修饰符

`.left`
`.right`
`.middle`

## 双向绑定

`v-model`, `modalValue` 属性和 `update:modalValue` 事件的结合。
支持传递其它属性。

v-model也可以传递修饰符，其实是多传了一个属性 `modalModifiers` 完全可以写其它属性传递。在响应事件前，做下判断。

* `.lazy`
* `.number`
* `.trim`

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

## 组件

### 定义组件

SFC
template，render，mount(selector)

### 使用组件

组件内注册，setup自动注册，全局注册

`defineProps` 定义 `props` 并返回实际的 `props`
`defineEmits` 定义事件，并返回触发函数。
`slots`
动态组件

`DOM` 中写模板的限制：

1. 标签只能小写
2. 标签结束不能使用自关闭

### 属性继承

未明确声明的属性和方法会被透传，并最终应用到根 `DOM` 元素。
使用 `inheritAttrs: false` 明确不透传，setup不支持。
使用 `$attrs` 操作未明确声明的属性和方法。属性大小写和连字符不会转化，事件名首字母大写并添加前缀 `on`。
setup通过 `ctx.attrs` 或 `useAttrs` 获取。
多根组件需要明确表明谁来继承属性。
`$attrs` 内容是响应式的，但是本身不能被监听。

### 其它

单向数据流

### 插槽

1. 在子组件中使用在父组件添加的子节点
2. 作用域插槽，由于插槽在父组件定义，不能使用子组件的数据，子组件可以将数据通过属性的方式传递给插槽。这使得一些组件可以封装逻辑，又叫无渲染组件，不过这种组件都可以使用组合式API封装。
3. 后备内容，如果父组件没有提供插槽将显示
4. 具名插槽，支持传递多个插槽，通过命名区分
5. 动态插槽名

### Provide/Inject

不要异步调用

`provide(key, value)`，app.provide，可以提供全局注入，对开发插件有帮助。
`inject(key, defaultValue)`，默认值支持传递函数，只在需要的时候调用。
如果后代组件需要修改值，可以再传递一个操作函数。通过readonly函数，控制属性只读。

`key` 除了字符串还支持 `symbol`，可以在一个新的文件中定义常量并调用。

### 异步组件

`defineAsyncComponent` 接收一个返回 `promise` 的函数。resolve中加载组件或reject原因。

示例：`defineAsyncComponent(() => import('./components/MyComponent.vue'))`

也可以传递一个对象

* loader: 异步加载函数
* loadingComponent: 加载中组件
* delay 延迟后显示加载中组件，默认200ms
* errorComponent: 出错组件
* timeout 超时后显示出错组件，默认无穷大

## 复用

### Composable

无状态复用使用函数，有状态复用使用 `Composable`。
通过返回响应式数据复用逻辑，可以相互嵌套使用。

命名以use开头，入参最好使用 `unref` 兼容响应式数据。
使用 `watch` 和 `watchEffect` 监控数据变化并产生副作用。
如果对 `composable` 函数使用结构赋值，返回时最好都是用ref创建，而不是reactive，否则使用结构赋值会失去响应式。

比如添加事件监听，需要在卸载时清理。

限制：只能在setup中同步调用。

还可以用来按照功能重新组织代码。

完全可以替代 `mixins` 和逻辑组件

### 自定义指令

为了公用访问原始 `DOM` 的逻辑。
`setup` 中 `v` 开头的变量被解析为指令。生命周期没有beforeCreate

参数：

* el: DOM
* binding
  * value 指令传入的值
  * oldValue 更新前的值，只在更新阶段的2个函数中可用
  * arg 参数，`:`后的值，一般时自定义
  * modifiers 修饰符，一般是预定义的bool类型
  * instance 组件实例
  * dir // TODO ???
* vnode
* prevNode

只读，不要修改，如果需要共享数据，使用原生的dataset

如果只需在 `mounted` 和 `updated` 中执行相同逻辑的处理，可以直接传递处理函数。

```js
app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value
})
```

指令如果在组件中使用，最终会绑定在根节点，如果是多根组件会报错，不建议将指令用在组件上。

### 插件

返回一个包含 `install` 方法的对象，或直接该方法本身。接收组件实例和自定义配置。
插件本身没有明确的定义，一般有以下应用场景：

1. 全局注册组件和指令
2. 全局数据注入
3. 添加全局属性
4. 上面操作的组合，比如 `vue-router`

### 进度

<https://vuejs.org/guide/essentials/watchers.html#watcheffect>

## 动态组件

* <component :is>
* v-if/v-else-if
* render函数中判断

## render 函数

作用：

* 透传所有slot
* 实现动态组件的另一种方式

this.$slots.default 表示所有子节点

### 与slot联动

模板语法

```vue
<template #A><p>123</p></template>
<template #A="{a}"><p>{{ a }}</p></template>
```

render语法

```vue
<script>
render(h) {
  return h('p', { slot: 'A' }, '123');
}
render(h) {
  return h('p', { scopedSlots: {
    A: (props) => props.a
  }});
}
</script>
```

模板语法

```vue
<slot></slot>
<slot name="A"></slot>
<slot name="A" a="a"></slot>
```

render语法

```vue
<script>
render(h) {
  return h('p', this.$slots.default);
}
render(h) {
  return h('p', this.$slots.A);
}
render(h) {
  return h('p', this.$scopedSlots.A({ a: 'a' }));
}
</script>
```

## 函数式组件

functional

## 错误处理

选项钩子：
errorCaptured,

全局配置：
Vue.config.errorHandler
