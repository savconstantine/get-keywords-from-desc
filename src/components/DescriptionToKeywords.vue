<template>
  <div class="lg:w-5/12 flex flex-col gap-4 w-full">
    <div class=" ">
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Your description</label
      >
      <textarea
        v-model="text"
        id="message"
        rows="6"
        name="message"
        @keyup="generateKeywords"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Leave a description..."
        data-rule="required"
        data-msg="Please write something for us"
      ></textarea>
    </div>
    <div class="">
      <span
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Keywords from your description</span
      >
      <div
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        :class="{ 'h-10': keywords.length === 0 }"
      >
        {{ getKeywords }}
      </div>
    </div>
    <button
      @click.stop.prevent="copyKeywords"
      type="button"
      class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Copy Generated Keywords
    </button>
    <input id="block-to-copy" type="hidden" :value="keywords" />
  </div>
</template>

<script>
import { useKeywordsStore } from "../stores/keywords";

export default {
  data() {
    return {
      keywords: "",
      text: "",
    };
  },
  computed: {
    getKeywords() {
      if (this.keywords.length > 0) return this.keywords;
      return "Keywords will be generated here";
    },
    getWordsToIgnore() {
      return useKeywordsStore().wordsToIgnore;
    },
  },
  mounted() {},
  methods: {
    generateKeywords() {
      let desc = " " + this.text;
      desc = desc.toLowerCase();
      desc = desc.replace(new RegExp(/\. /g), " ");
      desc = desc.replace(new RegExp(/ /g), ", ");
      desc = desc.replace(new RegExp(/\\"/g), "");
      desc = desc.replace(new RegExp(/:/g), "");
      desc = desc.replace(new RegExp(/”/g), "");
      desc = Array.from(new Set(desc.split(","))).toString();
      desc = desc.replace(new RegExp(/\./g), "");
      const mappedUnforgivable = this.getWordsToIgnore.map(
        (word) => " " + word + ","
      );
      desc = desc.replace(new RegExp(mappedUnforgivable.join("|"), "g"), "");
      desc = desc.replace(new RegExp(/ [0-9]{2},/g), " ");
      desc = desc.replace(new RegExp(/ [0-9]{1},/g), " ");
      desc = desc.replace(new RegExp(/,, /g), ", ");
      if (desc.charAt(0) === ",") {
        desc = desc.substring(1);
      }
      if (desc.length === 1) desc = "";
      this.keywords = desc;
    },
    copyKeywords() {
      const blockToCopy = document.querySelector("#block-to-copy");
      blockToCopy.setAttribute("type", "text"); // hidden
      blockToCopy.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        alert("Oops, unable to copy");
      }
      /* unselect the range */
      blockToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>