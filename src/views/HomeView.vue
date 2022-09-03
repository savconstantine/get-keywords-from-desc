<template>
  <main>
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <form action="#" class="space-y-8">
        <div class="sm:col-span-2">
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
        <div class="sm:col-span-2">
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
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pixels: 0,
      keywords: "",
      text: "",
      unforgivable: [
        "to",
        "the",
        "at",
        "which",
        "of",
        "a",
        "on",
        "by",
        "and",
        "from",
        "be",
        "it",
        "what",
        "for",
        "he",
        "she",
        "his",
        "her",
        "has",
        "will",
        "when",
        "we",
        "is",
        "are",
        "those",
        "these",
        "that",
        "more",
        "with",
        "less",
        "as",
        "in",
        "near",
        "or",
        "-",
        "while",
        "i",
        "kyrgyzstan",
        "bishkek",
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
        "during",
        "having",
        "an",
        "via",
      ],
    };
  },
  computed: {
    getKeywords() {
      if (this.keywords.length > 0) return this.keywords;
      return "Keywords will be generated here";
    },
  },
  mounted() {
    for (let i = 0; i < this.unforgivable.length; i++) {
      this.unforgivable[i] = " " + this.unforgivable[i] + ",";
    }
  },
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

      desc = desc.replace(new RegExp(this.unforgivable.join("|"), "g"), "");

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
