<template>
  <div class="w-full">
    <button @click.stop.prevent="copyKeywords" type="button"
      class="w-full py-3 px-5 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none transition-all ease-in duration-300"
      :class="{ 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800': copyButtonTextState === 'default', 'bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800': copyButtonTextState === 'copied', 'bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700': copyButtonTextState === 'error' || copyButtonTextState === 'noKeywords' }">
      {{ copyButtonText }}
    </button>
    <input id="block-to-copy" type="hidden" :value="keywords" />
  </div>
</template>

<script>
import { storeToRefs, mapActions } from "pinia";
import { useErrorsStore } from "../stores/errors";

export default {
  props: {
    keywords: {
      type: String,
      required: true,
    },
  },
  setup() {
    const errorsStore = useErrorsStore();
    const { getCopyButtonTextState, getCopyButtonText } = storeToRefs(errorsStore);

    return {
      copyButtonTextState: getCopyButtonTextState,
      copyButtonText: getCopyButtonText,
    };
  },
  methods: {
    ...mapActions(useErrorsStore, ["setCopyButtonTextState"]),
    copyKeywords() {
      const blockToCopy = document.querySelector("#block-to-copy");
      if (this.keywords.length > 0) {
        blockToCopy.setAttribute("type", "text"); // hidden
        blockToCopy.select();
        try {
          document.execCommand("copy");
          this.setCopyButtonTextState('copied');
          setTimeout(() => {
            this.setCopyButtonTextState('default');
          }, 5000);
        } catch (err) {
          alert("Oops, unable to copy");
          this.setCopyButtonTextState('error');
          setTimeout(() => {
            this.setCopyButtonTextState('default');
          }, 10000);
        }
        /* unselect the range */
        blockToCopy.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      } else {
        this.setCopyButtonTextState('noKeywords');
        setTimeout(() => {
          this.setCopyButtonTextState('default');
        }, 5000);
      }
    },
  },
};
</script>
