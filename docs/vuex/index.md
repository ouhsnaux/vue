# Vuex

- [State](#state)
  - [单一状态树](#单一状态树)
  - [组件中使用](#组件中使用)
  - [mapState](#mapstate)
- [Getter](#getter)
  - [参数](#参数)
  - [返回值](#返回值)
  - [mapGetters](#mapgetters)
- [Mutation](#mutation)
  - [定义](#定义)
  - [其它](#其它)
- [Action](#action)
  - [与 `Mutation` 的不同](#与-mutation-的不同)
  - [定义](#定义-1)
  - [TODO 测试普通的dispatch是否也返回promise](#todo-测试普通的dispatch是否也返回promise)
- [模块化](#模块化)
  - [局部状态](#局部状态)
  - [命名空间](#命名空间)
    - [绑定函数](#绑定函数)
  - [动态注册](#动态注册)
  - [保留state](#保留state)
  - [模块重用](#模块重用)
- [其它](#其它-1)
- [TODO](#todo)

## State

### 单一状态树

每个应用只包含一个 `store` 实例。

### 组件中使用

通过计算属性获取，使用 `this.$store` 避免多次导入。

### mapState

当映射名称与 `state` 子节点名称相同时，可以传递数组。

传递对象时，值数据类型：

- 箭头函数
- 字符串
- 常规函数，如果需要使用 `this`

## Getter

store 的计算属性，根据 `state` 派生出的多处复用，可缓存的值。

### 参数

1. state
2. getters

### 返回值

1. 普通值
2. 函数，支持传递参数，不会缓存结果

### mapGetters

同 `mapState`

## Mutation

更改 `state` 的唯一方法，非常类似于事件。

### 定义

`mutation` 函数的接收参数第一个是 `state`，后面的与传入参数相同。

通过 `store.commit` 调用 `mutation`，第一个参数为 `mutation` 的名称。后面是需要传递的参数，如果需要传递多个参数，最好使用一个对象包裹。

支持对象风格。

### 其它

- 使用常量替代 `Mutation` 事件类型
- 必须是同步函数
- 调用方式：`this.$store.commit` 或 `mapMutations`

## Action

### 与 `Mutation` 的不同

- `Action` 提交 `mutation`，而不是直接修改状态
- `Action` 可以包含异步操作

### 定义

`action` 函数的第一个参数是与 `store` 实例具有相同方法和属性的 `context` 对象，后面的与传入参数相同。

通过 `store.dispatch` 调用 `action`，第一个参数为 `action` 的名称。后面是需要传递的参数，如果需要传递多个参数，最好使用一个对象包裹。

支持对象风格。

调用方式：`this.$store.dispatch` 或 `mapActions`

### TODO 测试普通的dispatch是否也返回promise

## 模块化

当应用非常复杂时 `store` 会变得臃肿。通过模块化将 `store` 切分为多个子模块。

每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

### 局部状态

通过 `store.state.moduleA` 获取局部状态。

对于 `mutation` 和 `getter` 接受的第一个参数是局部的。

对于  `action`，`state` 表示局部，`rootState` 表示根节点状态

对于 `getter` 第三个参数是根节点

### 命名空间

模块内部的 `action`、`mutation` 和 `getter` 默认是全局注册的，通过添加 `namespaced: true` 使其成为带命名空间的模块。使用时需要根据模块注册的路径调整命名。

#### 绑定函数

`mapState`, `mapGetters`, `mapActions`, `mapMutations` 第一个参数可以写路径，其它用法同之前。

也可以使用 `createNamespacedHelpers` 传入路径生成 `map Functions`

### 动态注册

- registerModule
- unregisterModule
- hasModule

### 保留state

preserveState: true,

### 模块重用

不直接传递对象，而是通过函数生成一个对象

## 其它

- 组合式 `API` 通过 `useStore` 获取 `store` 实例。
- 插件
- 严格模式，不要在生产环境使用
- 表单双向绑定，使用计算属性的 `get`, `set`

## TODO

- 测试
- 热重载
- TS
