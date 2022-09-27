<script setup>
  import MoonSvg from "@/assets/dark-light-mode/moon.svg?component";
  import SunSvg from "@/assets/dark-light-mode/sun.svg?component";


  const props = defineProps({
    isDark: {
      type: Boolean,
      required: true
    },
  });

  const emits = defineEmits(["toggleDarkMode"]);

</script>


<template>
  <header>
    <div class="bg-white border-gray-200 px-4 lg:px-6 pt-2.5 dark:bg-gray-800 lg:pt-14 flex flex-col">
      <h1 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Get Keywords
        From Description</h1>
        <button
            @click="emits('toggleDarkMode')"
            class="flex items-center justify-center w-8 h-8 focus:outline-none shadow-xl shadow-gray-400 rounded-full uppercase bg-gradient-to-r from-teal-400 to-teal-800 text-white self-center"
          >
          <transition name="fade" mode="out-in">
            <template v-if="props.isDark">
              <SunSvg class="w-4" />
            </template>
            <template v-else>
              <MoonSvg class="w-4" />
            </template>
          </transition>
          </button>
    </div>
  </header>
</template>