# form-tricks

1. 数字输入框
1. 多表单项相互验证
1. 日期选择器
1. 单项多输入框
1. 数据类型转换
1. Radio嵌套DatePicker
1. Radio切换，非选中项不展示校验信息

## 1. 数字输入框验证

当数字精度大于 `0` 时，需要添加 `active-change` 为 `false` ，方便继续输入。

检验触发规则除 `blur` 外，还要加上 `change` 。

```vue
<template>
  <InputNumber :precision="2" :active-change="false" />
</template>
```

```js
{
  type: 'number',
  required: true,
  message: '不能为空',
  trigger: 'blur,change'
}
```

## 2. 多表单相互验证

有多项表单内容的验证规则相互影响，
比如双价，价值1不能大于价值2。

* 在价值2处做校验
* 当价值1触发验证后，如果价值2不为空，需触发检验。

```vue
<template>
  <Form ref="price" : model="price" :rules="rules>
    <FormItem prop="item1" label="价值1">
      <InputNumber v-model="price.item1" :precision="0" />
    </FormItem>
    <FormItem prop="item2" label="价值2">
      <InputNumber v-model="price.item2" :precision="0" />
    </FormItem>
  </Form>
</template>
```

```js
export default {
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

## 3. 日期选择器

如果你使用 `v-model` 你得到的值将是一个 `Date` 类型的数据，
发送请求时调用 `JSON.stringify` 你得到的将是 `yyyy-MM-ddTHH:mm:ss.xxxZ` 格式的数据。

解决方案1，在发送请求前，手动转换为需要的类型，`moment(date).format('yyyy-MM-dd')`。

解决方案2（墙裂推荐），不再使用 `v-model`，而是使用属性 `value` + 事件 `on-chang` 的组合，
辅以 `type` 或 `format`。

```vue
<template>
  <DatePicker
    :value="date"
    type="date"
    @on-change="(time) => { date = time }"
  />
</template>
```

## 4. 单项多输入框

有两种方式进行表单校验。

1. `FormItem` 的 `prop` 属性使用一个新的值。
1. `FormItem` 进行嵌套。

### 4.1 使用新的 `prop` 属性

特点：

* 整个表单项只有一个整体的错误提示
* 如果不指定 `trigger` 属性，几乎所有事件都会触发表单项校验，
指定 `trigger` 属性则会应用到每一个输入框
* 几乎不需要进行布局上的调整

例子

```vue
<template>
  <Form :model="data" :rules="rules" inline>
    <FormItem prop="select" label="多输入框">
      <Select v-model="data.select1">
      <!-- <Options /> -->
      </Select>
      <Select v-model="data.select2">
      <!-- <Options /> -->
      </Select>
    </FormItem>
  </Form>
</template>
```

```js
export default {
  data() {
    return {
      data: {
        select1: null,
        select2: null,
      },
      rules: {
        select: {
          required: true,
          trigger: '', // 对所有输入框都有效
          validator: this.selectValidator,
        },
      },
    };
  },
  methods: {
    // 每个输入框的很多事件都会触发验证
    selectValidator(rule, value, callback) {
      const { select1, select2 } = this.data;
      // 对两个值进行校验
      return callback();
    },
  },
};
```

### 4.2 嵌套 `FormItem`

特点：

* 每个输入框都是一个可单独配置的表单项。
* 需要调整布局

例子

```vue
<template>
<Form :model="data" :rules="rules" inline>
  <FormItem label="多输入框">
    <FormItem prop="select1">
      <Select v-model="data.select1">
      <!-- <Options /> -->
      </Select>
    </FormItem>
    <FormItem prop="select2">
      <Select v-model="data.select2">
      <!-- <Options /> -->
      </Select>
    </FormItem>
  </FormItem>
</Form>
</template>
```

## 5. 数据类型转换

前端将数据传给后端，存到数据库。
之后再去获取时，很可能数据类型已经发生了变化。
这时最好在拿到数据后立即进行类型转换，避免后续无穷尽的麻烦。

## 6. Radio 嵌套 DatePicker

由于Radio Content点击时会改变当前选中项，因此需要在DatePicker上阻止点击事件的默认行为。

```vue
<DatePicker @click.native.prevent>
```

## 7. Radio切换，非选中项不展示校验信息

### 7.1 使用字段控制不显示校验信息

缺点：校验失败切换后，不显示错误信息。但再次切换回来，会显示上次的错误信息。

### 7.2 修改校验逻辑

1. 在校验逻辑中判断，如当前项未被选中则校验成功。
1. 切换Radio时，对上次选中项进行主动校验。

缺点：会做一次校验，但是在校验逻辑中首先就会判断不需要校验。
