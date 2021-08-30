<template>
  <div id="app">
    <header-client />
    <router-view />
    <login-modal />
  </div>
</template>

<script>
import HeaderClient from "./components/HeaderClient.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
  name: "App",
  components: {
    HeaderClient,
    LoginModal,
  },
  created() {
    this.$store.dispatch("checkAuth");
  },
};
</script>
    LoginModal

<style>
</style>
