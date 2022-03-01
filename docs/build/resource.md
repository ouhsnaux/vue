# 相关资源

## Element Plus

安装依赖 `npm i element-plus`
  
### 按需自动引入

安装插件 `unplugin-vue-components, unplugin-auto-import`，并修改配置 `vite.config.js`

    ```js
    // vite.config.ts
    import AutoImport from 'unplugin-auto-import/vite'
    import Components from 'unplugin-vue-components/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

    export default {
      plugins: [
        // ...
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
    }
    ```

### 语言改为中文

    ```vue
    <template>
      <el-config-provider :locale="locale">
        <app />
      </el-config-provider>
    </template>

    <script>
      import { defineComponent } from 'vue'
      import { ElConfigProvider } from 'element-plus'

      import zhCn from 'element-plus/lib/locale/lang/zh-cn'

      export default defineComponent({
        components: {
          ElConfigProvider,
        },
        setup() {
          return {
            locale: zhCn,
          }
        },
      })
    </script>
    ```

### 主题配置

    ```scss
    @forward 'element-plus/theme-chalk/src/common/var.scss' with (
      $colors: (
        'primary': (
          'base': green,
        ),
      ),
    );
    ```

## Vue Router

`npm i vue-router`

```js
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [];

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
```

`app.use(router)`

## Vuex

`npm i vuex`

```js
import { createStore } from 'vuex';

export default createStore({});
```

`app.use(store)`

## pinia

### 对比Vuex

* 去除 `mutations`
* 去除命名空间和模块化，每个仓库单独使用
* 动态导入，// TODO 暂不清楚

### 使用

创建 `Store`

    ```js
    import { defineStore } from 'pinia'

    export const useStore = defineStore('main', {
      // other options...
    })
    ```

使用 `Store`

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

不能使用解构赋值，需要使用 `storeToRefs` 处理

## CSS预处理器

```sh
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

## 包分析

安装依赖 `npm install -D rollup-plugin-visualizer` 并修改 `vite.config.js`

    ```js
    import { visualizer } from 'rollup-plugin-visualizer';

    plugins: [
      visualizer({
        open: true,
      })
    ],
    ```

## TODO

   1. ts
   2. vueuse
   3. mock
   4. test
