<template>
  <div id="app">
    <div class="menu">
      <ul>
        <li
          v-for="item in trickKeys"
          :key="item"
          :class="{
            'menu-item': true,
            'menu-item-active': item === selectedMenu,
          }"
          @click="selectedMenu = key"
        >
          {{ key }}
        </li>
      </ul>
    </div>
    <div>
      <component :is="trickComMap[selectedMenu]" />
    </div>
  </div>
</template>

<script>
import Modal from './components/Modal';
import Form from './components/Form';

export default {
  name: 'App',
  components: { Modal, Form },
  data() {
    const trickKeys = ['modal', 'form'];
    return {
      trickKeys,
      selectedMenu: trickKeys[0],
      trickComMap: {
        modal: 'Modal',
        form: 'Form',
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
