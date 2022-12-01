<template>
  <div class="lg:w-5/12 flex flex-col gap-4 w-full">
    <div class=" ">
      <label for="message" class="block mb-2 text-sm font-medium" :class="isError ? 'text-red-900 dark:text-red-400' : 'text-gray-900 dark:text-gray-400'">Your
        description</label>
      <textarea v-model="description" id="message" rows="6" name="message" @keyup="generateKeywords"
        class="block p-2.5 w-full text-sm rounded-lg shadow-sm border transition-all ease-in duration-300"
        :class="isError
        ? 'text-red-800 bg-red-100 border-red-300 focus:ring-red-500 focus:border-red-500 dark:bg-red-900 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
        : 'text-gray-900 bg-gray-50 border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        placeholder="Leave a description..." data-rule="required" data-msg="Please write something for us"></textarea>
    </div>
    <div class="">
      <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Keywords from your
        description</span>
      <div
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        :class="{ 'h-10': keywords.length === 0 }">
        {{ getKeywords }}
      </div>
    </div>
    <CopyKeywordsBtn :keywords="keywords" />
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useKeywordsStore } from "../stores/keywords";
import { useErrorsStore, ERROR_STATE_DEFAULT, ERROR_STATE_COPIED, ERROR_STATE_NOKEYWORDS, ERROR_STATE_ERROR } from "../stores/errors";

import CopyKeywordsBtn from "@/components/CopyKeywordsBtn.vue";

export default {
  components: { CopyKeywordsBtn },
  data: () => ({
    keywords: "",
    description: "",
  }),
  setup() {
    const keywordsStore = useKeywordsStore();
    const errorsStore = useErrorsStore();
    const { getWordsToIgnore } = storeToRefs(keywordsStore);
    const { getCopyButtonTextState } = storeToRefs(errorsStore);

    return {
      wordsToBeCut: getWordsToIgnore,
      getCopyButtonTextState,
      ERROR_STATE_COPIED,
      ERROR_STATE_DEFAULT,
      ERROR_STATE_ERROR,
      ERROR_STATE_NOKEYWORDS
    };
  },
  computed: {
    isError() {
      return this.getCopyButtonTextState === ERROR_STATE_ERROR || this.getCopyButtonTextState === ERROR_STATE_NOKEYWORDS;
    },
    getKeywords() {
      if (this.keywords.length > 0) return this.keywords;
      return "Keywords will be generated here";
    },
  },
  mounted() {
    const keywordsStore = useKeywordsStore();
    keywordsStore.$subscribe(() => {
      this.generateKeywords();
    });
  },
  methods: {
    generateKeywords() {
      let desc = " " + this.description;
      desc = desc.toLowerCase();
      desc = desc.replace(new RegExp(/\. /g), " ");
      desc = desc.replace(new RegExp(/ /g), ", ");
      desc = desc.replace(new RegExp(/\\"/g), "");
      desc = desc.replace(new RegExp(/:/g), "");
      desc = desc.replace(new RegExp(/”/g), "");
      desc = Array.from(new Set(desc.split(","))).toString();
      desc = desc.replace(new RegExp(/\./g), "");
      const mappedUnforgivable = this.wordsToBeCut.map(
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
    }
  },
};
</script>
