<template>
  <Navbar />
  <router-view></router-view>
  <LoginModal />
  <Footer />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import LoginModal from "./components/LoginModal.vue";
</script>
<style></style>
