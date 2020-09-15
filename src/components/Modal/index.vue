<style lang="less" scoped>
@import 'index.less';
</style>

<template>
  <ol class="">
    <li>
      <h3>布尔值双向绑定</h3>
      <h4>父元素代码</h4>
      <code>
        {{ `
        <MyModal v-model="show" />
        ` }}
      </code>

      <h4>modal代码</h4>
      <code>
        <p>// template</p>
        {{ `
        <Modal v-model="visible" />
        ` }}
        <p>// script</p>
        <p>
          <!-- eslint-disable -->
          computed: { 
            visible: { 
              get() { return this.value; },
              set() {
                this.$emit('input', false);
              },
            }
          } `
          <!-- eslint-enable -->
        </p>
      </code>

      <h5>template</h5>
      <code>
        {{`
        <template>
          <Modal v-model="visible">
            <template v-slot:footer>
              <div></div>
            </template>
          </Modal>
        </template>
        <script>
          export default {
            name: 'my-modal',
            props: {
              // 双向绑定，也可使用唯一值
              value: { type: Boolean, default: false },
            },
          };
        </script>
        `}}
      </code>
      <h5>script</h5>
      <code>
        {{
          `
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
        `
        }}
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
