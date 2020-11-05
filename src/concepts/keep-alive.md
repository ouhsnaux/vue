# keep-alive

## 作用

缓存组件的状态。生成虚拟DOM，卸载时不销毁，只是不渲染。

## 用法

### Props

* `include` - 字符串或正则表达式。只有 `name` 属性匹配的组件会被缓存。
* `exclude` - 字符串或正则表达式。任何 `name` 属性匹配的组件都不会被缓存。
* `max` - 数字。最多可以缓存多少组件实例。

### 生命周期钩子

被缓存的组件再第一次生成过后，不在执行 `mount` 之前的声明周期函数。

* `activated` - 激活时触发
* `deactivated` - 卸载时触发

## 例子

### 普通组件缓存

```vue
<template>
  <keep-alive>
    <component :is="component" />
  <keep-alive>
<template>

<script>
export default {
  data() {
    component: A,
  }
};
</script>
```

### 使用 `include` 属性缓存页面

1. 在 `vuex` 中添加属性，记录需要缓存的页面

    ```vue
    export default {
      namespaced: true,
      state: {
        keepAliveComponents: [],
      },
    }
    ```

1. 向 `keep-alive` 组件传递 `include` 属性

    ```vue
    <div>
      <keep-alive :include="keepAliveComponents">
        <router-view></router-view>
      </keep-alive>
    </div>
    ```

### 创建两个 `<router-view>`

1. 在路由配置中增加 `keepAlive` 属性

    ```vue
    const router = new Router({
      routes: [
        {
          path: '/',
          name: 'App',
          component: App,
          meta: {
            title: '首页',
            keepAlive: true,
          }
        }
      ]
    })
    ```

1. 使用两个 `<router-view>`

    ```vue
    <div>
      <!-- 不需要缓存 -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>

      <!-- 需要缓存 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </div>
    ```
