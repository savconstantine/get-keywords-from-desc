<script setup>
import { defineAsyncComponent } from 'vue'

import Loading from "@/components/Loading.vue";

const IgnoreKeywords = defineAsyncComponent({
  loader: () => import('@/components/IgnoreKeywords.vue'),
  loadingComponent: Loading
})

const DescriptionToKeywords = defineAsyncComponent({
  loader: () => import('@/components/DescriptionToKeywords.vue'),
  loadingComponent: Loading
})
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