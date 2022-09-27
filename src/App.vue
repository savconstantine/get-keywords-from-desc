<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const changeDarkLightMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("darkMode", isDark.value);
};

const hasDarkModeSetted = () => {
  if (localStorage.getItem("darkMode")) {
    return localStorage.getItem("darkMode") == "true";
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return false;
  }

  return true;
};

let isDark = ref(hasDarkModeSetted());
</script>

<template>
  <div :class="isDark ? 'dark' : ''" class="antialiased">
    <div
      class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-between"
    >
      <Header @toggleDarkMode="changeDarkLightMode" :isDark="isDark" />
      <RouterView />
      <Footer />
    </div>
  </div>
</template>
