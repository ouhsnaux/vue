# form-tricks

1. 数字输入框
1. 多表单项相互验证

## 1. 数字输入框验证

当数字精度大于 `0` 时，需要添加 `active-change` 为 `false` ，方便继续输入。

检验触发规则除 `blur` 外，还要加上 `change` 。

```vue
// template
<InputNumber :precision="2" :active-change="false" />

// rule
{ type: 'number', required: true, message: '不能为空', trigger: 'blur,change' },
```

## 2. 多表单相互验证

有多项表单内容的验证规则相互影响，
比如双价，价值1不能大于价值2。

* 在价值2处做校验
* 当价值1触发验证后，如果价值2不为空，需触发检验。

```vue
// template
<Form ref="price" : model="price" :rules="rules>
  <FormItem prop="item1" label="价值1">
    <InputNumber v-model="price.item1" :precision="0" />
  </FormItem>
  <FormItem prop="item2" label="价值2">
    <InputNumber v-model="price.item2" :precision="0" />
  </FormItem>
</Form>

// script
{
  data() {
    return {
      price: {
        item1: null,
        item2: null,
      },
      rules: {
        item1: [{
          validator: item1Validator,  trigger: 'blur,change'
        }],
        item2: [{
          validator: item2Validator, trigger: 'blur,change'
        }],
      },
    };
  },
  methods: {
    item1Validator(rule, value, callback) {
      if (this.price.item2 != null) {
        this.$refs.price.validateField('item2');
      }
      callback();
    },
    item2Validator(rule, value, callback) {
      const { item1 } = this.price;
      if (item1 != null && item1 > value) {
        return callback(new Error('1 不能大于 2'));
      }
      return callback();
    },
  },
}
```
