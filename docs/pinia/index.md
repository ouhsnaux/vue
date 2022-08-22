# pinia

下一代 Vue 状态管理工具。

## 对比 Vuex

* 更轻量
* 去除 `mutations`
* 去除命名空间和模块化，每个仓库单独使用
* 更好地支持TS

## 使用

### app注册

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
```

### 定义

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
})
```

### 引用

```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()
    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  },
}
```

### storeToRefs

不能使用解构赋值，需要使用 `storeToRefs` 处理

## State

数据

### 定义

* state作为输出返回对象的函数

### 读

* 在 `setup` 中，运行定义返回的函数获取 `store`，直接访问store的属性，可以读写
* 在 `setup` 外，通过 `mapState` 访问，见下方

### 写

* 在 `setup` 中，运行定义返回的函数获取 `store`，直接访问store的属性，可以读写
* `mapWritableState` 可以直接修改值
* `store.$patch` 修改 `store`
* `store.$reset` 重置
* 修改 `store.$state`，替换整个仓库的所有状态

### 监听变化

`store.$subscribe`

第一个参数是一个函数，包含两个参数，
第一个参数有三个属性，

* type 修改类型，direct/patch object/patch function
* storeId
* payload

第二个参数是新的 `state`。

第二个参数配置 `detached: true` 在组件卸载后仍存在。

TODO
<https://pinia.vuejs.org/core-concepts/state.html#mutating-the-state>

## Getters

获取派生数据或函数

### 定义

作为一个对象，每个属性的值都是通过 `state` 获取数据或函数的函数。
通过 `this` 获取根 `Store`，从而访问其它 `getters`，这需要你显示指定输出类型。
通过其它 `store` 提供的函数访问其它 `store` 的 `state` 和 `getters`

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.counter * 2
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
```

### 读

同 `state`

## Actions

提供修改 `state` 的方法，支持同步和异步。通过 `this` 访问 `state/getters/actions`。
通过其它 `store` 提供的函数，获取实例，直接调用其中的 `state/getters/actions`

### 调用

* 在 `setup` 中，获取仓库实例，直接作为其方法调用
* 在 `setup` 外，通过 `mapActions` 获取方法

### 订阅

`store.$onAction` 第一个参数是回调，第二个参数传递 `true` 当组件卸载后依然存在。
回调会在 `action` 执行前执行。

参数是一个对象，包含以下属性

* name actionName
* store 仓库实例
* args 参数
* after 接收一个函数，action执行后调用
* onError 错误回调

## 插件

## TODO

为什么pinia把vuex的所有限制都给抛到脑后
