# 相关资源

## Element Plus

`npm i element-plus`

```js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
...

app.use(ElementPlus, { locale: zhCn })
```

TODO volar support

```js
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
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

## CSS预处理器

```sh
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

## TODO

   1. ts
   2. vueuse
   3. mock
   4. test
