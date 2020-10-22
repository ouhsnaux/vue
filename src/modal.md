# modal-tricks

1. 双向绑定控制显示状态。
1. 自定义 footer slot。
1. modal 关闭时，初始化自定义状态。
1. modal 打开时，请求数据。

## 1. modal显示

使用双向绑定控制Modal的显示。可根据 `show` 的数据类型，变换代码。

父元素

```vue
// template
<MyModal v-model="show" />

// script
data() {
  return {
    show: false,
  };
}
```

MyModal

```vue
// template
<Modal v-model="visible" />

// script
props: {
  value: { type: Boolean, default: false },
},
computed: {
  visible: {
    get() {
      return this.value;
    },
    set() {
      this.$emit('input', false);
    },
  },
},
```

## 2. 控制确定按钮 loading 状态

确定按钮 loading 状态的交互着实不能让人接受，因此自己提供 footer slot。

```vue
// template
<template v-slot:footer>
  <div class="footer">
    <Button type="primary" :loading="loading" @click="onOk">
      确定
    </Button>
    <Button @click="visible = false">
      取消
    </Button>
  </div>
</template>

// script
props: {
  value: { type: Boolean, default: false },
},
data() {
  return {
    loading: false,
  };
},
computed: {
  visible: {
    get() {
      return this.value;
    },
    set() {
      this.$emit('input', false);
    },
  },
},
methods: {
  onOk() {
    this.loading = true;
    const success = Math.random() > 0.5;
    window.setTimeout(() => {
      this.loading = false;
      if (success) {
        alert('success');
        this.visible = false;
      } else {
        alert('fail');
      }
    }, 200);
  },
},


// css
.footer {
  button {
    height: 32px;
  }
}
```

## 3. Modal 关闭时 清空数据

如果 Modal 中含有自定义状态，有时在 Modal 关闭时需要清空状态。

```vue
computed: {
  visible: {
    get() {
      return !!this.value;
    },
    set() {
      // 初始化自定义状态
      this.setDefaultData();
      this.$emit('input', '');
    },
  },
},
```

也可将 Modal 中的内容封装成一个组件，并使用 v-if 指令，在 Modal关闭时，删除该组件。

```vue
<Modal v-model="visible">
  <Content v-if="visible />
</Modal>
```

## 4. modal 打开时，请求数据

监听 `value`，当 `value` 为 `true` 时请求数据。

```vue
watch: {
  value(val) {
    if (val) {
      // 打开时请求数据
      this.getData();
    } else {
      // 关闭时初始化
      this.setDefaultData();
    }
  },
},
```
