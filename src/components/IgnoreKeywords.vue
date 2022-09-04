<template>
  <div class="lg:w-7/12 w-full">
    <div class="flex justify-between">
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Words to ignore</label
      >
      <button
        type="button"
        class="block mb-2 text-sm font-extralight text-gray-900 dark:text-gray-500 scale-90 underline underline-offset-4"
        @click="resetIgnoreKeywords"
      >
        Reset ignore words
      </button>
    </div>

    <div
      class="block p-2.5 pb-0 text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    >
      <input
        class="bg-transparent flex w-full px-4 py-2 mb-2"
        v-model="newTag"
        @keyup.enter="addTag"
        placeholder="Leave a new word to ignore here and click enter..."
      />
      <div class="flex items-center flex-wrap">
        <div
          v-for="(tag, index) in wordsToBeCut.slice().reverse()"
          class="bg-gray-800 px-4 py-2 mr-1 mb-1 rounded-full flex"
          :key="index"
        >
          {{ tag }}
          <button
            type="button"
            @click="deleteTag(tag)"
            class="ml-2 w-5 -mt-1 pt-1 -mr-2"
          >
            <removeBtnSvg alt="Konstantin Savusia" class="logo" />
          </button>
        </div>
        <span class="py-2 invisible">:</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useKeywordsStore } from "@/stores/keywords";
import removeBtnSvg from "../assets/remove-button-svgrepo-com.svg";

export default {
  name: "ignoreKeywords",
  components: {
    removeBtnSvg,
  },
  setup() {
    const keywordsStore = useKeywordsStore();

    return {
      wordsToBeCut: keywordsStore.getWordsToIgnore,
      newTag: "",
    };
  },
  methods: {
    ...mapActions(useKeywordsStore, ["setWordsToIgnore", "resetWordsToIgnore"]),
    ...mapState(useKeywordsStore, ["wordsToIgnore"]),
    addTag() {
      if (!this.newTag) return;
      this.wordsToBeCut.push(this.newTag);
      this.setWordsToIgnore(this.wordsToBeCut);
      this.newTag = "";
    },
    deleteTag(tag) {
      this.wordsToBeCut.splice(this.wordsToBeCut.indexOf(tag), 1);
      this.setWordsToIgnore(this.wordsToBeCut);
    },
    resetIgnoreKeywords() {
      this.resetWordsToIgnore();
      this.wordsToBeCut = this.wordsToIgnore();
      this.$forceUpdate()
    },
  },
};
</script>
