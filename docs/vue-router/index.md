# Vue Router

## HTML

* router-link
* router-view

## 动态路由匹配

以 `:` 开头，支持使用正则，支持`*,+,?`通配符。

route

| 属性 | 含义 |
| :--- | :--- |
| name | 名字，支持 `symbol` |
| params | 动态路由匹配的参数 |
| path | 路由地址 |
| query | 路由查询参数 |
| hash | 路由hash |

## 嵌套

配置中children，html结构中多层 `<router-view>` 组件。

根路径需要以 `/` 开头。

通过添加空路径的子路由，给无法匹配的路由显示缺省内容。

## 编程导航

* push，参数同route
* replace
* go
* back

## 命名视图

components属性，指明需要使用的组件，`<router-view>` 组件 `name` 属性与其对应。

## 重定向和别名

redirect，接受字符串，route对象，甚至是一个动态返回route对象的函数。

如果字符串不以 `/` 开头，表示相对路径。

// TODO 测试，不触发谁的
重定向不会触发导航守卫。

别名不会修改路由信息，但是匹配别名显示效果与此配置相同。

## 向路由组件传递参数

配置中添加属性 `props`，值有以下几种可选项

* true，传递 route.params
* 命名视图，传递对象，对不同的视图做不同的配置
* 直接传递参数
* 函数，参数为route，传递结果

## 模式

* H5 History 模式 createWebHistory，需要配置服务器，当请求index.html时指向静态文件
* Hash 模式 createWebHashHistory

## 导航守卫

### 全局

#### router.beforeEach

参数：to, from, next。返回值有3中类型

1. false，中断导航，停留在from
2. Route Location，跳转到此地址，类似于 `router.push()`
3. 无返回值、undefined 或 true，继续导航。

报错会中断导航，并触发 `router.onError()`

避免使用 `next`，最多只能调用一次。

#### router.beforeResolve

在导航被确认之前，所有组件内守卫和异步路由组件被解析之后触发。

其它与 `router.beforeEach` 类似。

router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

#### router.afterEach

不接受next，也不会改变导航。对于分析、更改页面标题、声明页面等其它事情都很有用。

也反映了导航错误信息作为第三个参数。

### 路由

#### beforeEnter

只在进入路由时触发，`params, query, hash` 改变时不会触发。

除了常规函数，还接受函数组成的数组。

### 组件

#### beforeRouteEnter

在渲染该组件的对应路由被验证前调用。不能获取组件实例 `this` ！

可以接受第三个参数，作为回调函数。在导航被确认的时候执行。第一个参数为组件实例。

#### beforeRouteUpdate

当路由改变，但是组件被复用时调用。

#### beforeRouteLeave

在导航离开渲染该组件的对应路由时调用。通过返回 `false` 取消。

### 流程

1. 导航被触发
2. 失活组件调用组件内守卫 `beforeRouteLeave`
3. 调用全局守卫 `beforeEach`
4. 重用组件调用组件内守卫 `beforeRouteUpdate`
5. 调用路由配置守卫 `beforeEnter`
6. 解析异步路由组件
7. 被激活组件调用组件内守卫 `beforeRouteEnter`
8. 调用全局守卫 `beforeResolve`
9. 导航被确认
10. 调用全局 `afterEach` 钩子
11. 触发 `DOM` 更新
12. 调用组件内守卫 `beforeRouteEnter` 中的 `next` 的回调函数，组件实例作为第一个参数

## meta

$route.matched 记录匹配的所有路由记录（主要是由于嵌套）
$route.meta 非递归合并所有 `meta` 字段。

## 组合式API

* useRoute
* useRouter
* onBeforeRouteLeave
* onBeforeRouteUpdate
* useLink
  * RouterLink.props结构添加到组件的props中
  * setup内使用 `useLink(props)` 获取参数
    * route
    * href
    * isActive
    * isExactActive
    * navigate

## 过渡动效

需要使用 `v-slot` 并使用 `<transition>`

使用 `meta` 信息

```vue
<router-view v-slot="{ Component, route }">
  <!-- 使用任何自定义过渡和回退到 `fade` -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

根据路径的深度动态修改 `meta`

```js
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
```

## 滚动行为

scrollBehavior

### 参数

* to
* from
* savedPosition 浏览器前进后退触发

### 返回值属性

* top 偏移量
* left 偏移量
* el 偏移相对元素
* behavior 滚动模式 `smooth` 更流畅
* 返回Promise，可以延迟滚动

返回 `savedPosition` 与浏览器原生表现相同。
返回 `{ el: to.hash }` 跳转到锚点。

## 路由懒加载

`() => import('./views/viewA)`。
不要再使用异步组件。
使用 `/* webpackChunkName: "chunkName" */` 分组。

## 导航故障

### 等待导航结果

少数情况下，导航失效：

1. 用户已经位于他们正在尝试导航到的页面
2. 一个导航守卫通过调用 return false 中断了这次导航
3. 当前的导航守卫还没有完成时，一个新的导航守卫会出现了
4. 一个导航守卫通过返回一个新的位置，重定向到其他地方 (例如，return '/login')
5. 一个导航守卫抛出了一个 Error

导航是异步的，使用 `await` 等待导航结果。
如果导航失败将返回 `Navigation Failure`。否则返回一个 `falsy` 值。

### 鉴别导航故障

isNavigationFailure，第一个参数传入导航结果，第二个参数传入具体的导航错误类型，不传则检查导航结果是否 `Navigation Failure`。

导航错误类型

* NavigationFailureType.aborted 情形2
* NavigationFailureType.cancelled 情形3
* NavigationFailureType.duplicated 情形1

`router.currentRoute.value.redirectedFrom` 检测重定向地址

## 动态路由

### 添加 addRoute

如果新增加的路由与当前位置相匹配，需要使用 `route.push` 或 `route.replace` 手动导航，才能显示新路由。

在导航守卫中修改路由后，不要使用 `route.replace` 而是通过返回 `to.fullPath` 来重定向。

如果第一个参数是字符串，表示父级路由，第二个参数表示的路由信息将作为其子路由。

### 删除

* 添加一个名字冲突的路由，会先删除后添加
* 调用 `addRoute` 返回的回调
* `removeRoute`

### 查看

* `router.hasRoute()` 检查路由是否存在
* `router.getRoutes()` 获取一个包含所有路由记录的数组

## TODO

* START_LOCATION
* beforeResolve 与 beforeEach的实际区别或者说应用场景
* 写例子验证流程，应该有3步
* vite 使用 `/* webpackChunkName: "chunkName" */` 能否分组
* 验证`router.currentRoute.value.redirectedFrom` 检测重定向地址
* TS
