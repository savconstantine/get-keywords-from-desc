<script setup>
import KonstantinSavusiaLogoSVG from "@/assets/konstantinsavusia.svg?component";
</script>

<template>
  <footer>
    <div
      class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 lg:py-14"
    >
      <div class="flex justify-center flex-col items-center">
        <KonstantinSavusiaLogoSVG alt="Konstantin Savusia" class="konstantin-savusia-logo" />
        <div class="flex mt-5 gap-5">
          <a href="https://github.com/savconstantine" target="_blank">
            <img
              src="https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white"
              alt="github"
              style="margin-bottom: 5px"
            />
          </a>
          <a href="https://twitter.com/savconstantine" target="_blank">
            <img
              src="https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white"
              alt="twitter"
              style="margin-bottom: 5px"
            />
          </a>
          <a href="https://linkedin.com/in/konstantinsavusia" target="_blank">
            <img
              src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"
              alt="linkedin"
              style="margin-bottom: 5px"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
