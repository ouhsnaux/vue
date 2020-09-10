<style lang="less" scoped>
@import 'index.less';
</style>

<template>
  <ol class="">
    <li>
      <h3>1. 使用双向绑定控制显示。</h3>

      <p>父元素代码</p>
      <code>
        {{ `
        <Modal v-model="show" />
        ` }}
      </code>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'modal',
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
