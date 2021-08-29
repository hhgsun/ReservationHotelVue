<template>
  <div id="app">
    <header-client />
    <router-view />
  </div>
</template>

<script>
import HeaderClient from "./components/HeaderClient.vue";

export default {
  name: "App",
  components: {
    HeaderClient,
  },
};
</script>

<style>

</style>
