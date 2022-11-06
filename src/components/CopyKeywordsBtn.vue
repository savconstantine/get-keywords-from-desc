<template>
  <div class="w-full">
    <button @click.stop.prevent="copyKeywords" type="button"
      class="w-full py-3 px-5 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none transition-all ease-in duration-300"
      :class="{ 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800': copyButtonTextState === 'default', 'bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800': copyButtonTextState === 'copied', 'bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700': copyButtonTextState === 'error' || copyButtonTextState === 'noKeywords' }">
      {{ getButtonTextState }}
    </button>
    <input id="block-to-copy" type="hidden" :value="keywords" />
  </div>
</template>

<script>

export default {
  props: {
    keywords: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    copyButtonTextState: 'default',
    copyButtonText: {
      default: "Copy Generated Keywords",
      copied: "Copied!",
      error: 'Error! Try again',
      noKeywords: 'Add some description to generate keywords'
    }
  }),
  computed: {
    getButtonTextState() {
      return this.copyButtonText[this.copyButtonTextState];
    }
  },
  methods: {
    copyKeywords() {
      const blockToCopy = document.querySelector("#block-to-copy");
      if (this.keywords.length > 0) {
        blockToCopy.setAttribute("type", "text"); // hidden
        blockToCopy.select();
        try {
          document.execCommand("copy");
          this.copyButtonTextState = 'copied';
          setTimeout(() => {
            this.copyButtonTextState = 'default';
          }, 5000);
        } catch (err) {
          alert("Oops, unable to copy");
          this.copyButtonTextState = 'error';
          setTimeout(() => {
            this.copyButtonTextState = 'default';
          }, 10000);
        }
        /* unselect the range */
        blockToCopy.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      } else {
        this.copyButtonTextState = 'noKeywords';
        setTimeout(() => {
          this.copyButtonTextState = 'default';
        }, 5000);
      }
    },
  },
};
</script>
