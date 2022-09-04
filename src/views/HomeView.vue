<script setup>
import IgnoreKeywords from "@/components/IgnoreKeywords.vue";
import DescriptionToKeywords from "@/components/DescriptionToKeywords.vue";
</script>

<template>
  <main>
    <div class="py-4 lg:py-8 px-4 mx-auto max-w-screen-lg">
      <div class="flex gap-6 flex-col lg:flex-row items-center lg:items-start">
        <IgnoreKeywords />
        <DescriptionToKeywords />
      </div>
    </div>
  </main>
</template>