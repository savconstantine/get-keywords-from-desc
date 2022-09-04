import { defineStore } from 'pinia'

export const useKeywordsStore = defineStore({
  id: 'keywords',
  state: () => ({
    defaultWordsToIgnore: [
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
    wordsToIgnore: []
  }),
  getters: {
    getWordsToIgnore: (state) => {
      if (state.wordsToIgnore.length) {
        return state.wordsToIgnore
      }
      
      const localStorageWordsToIgnore = localStorage.getItem('wordsToIgnore')
      if (localStorageWordsToIgnore) {
        state.wordsToIgnore = JSON.parse(localStorageWordsToIgnore)
        return state.wordsToIgnore
      }

      state.wordsToIgnore = [...state.defaultWordsToIgnore]
      localStorage.setItem('wordsToIgnore', JSON.stringify(state.wordsToIgnore))
      return state.wordsToIgnore
    },
  },
  actions: {
    setWordsToIgnore (wordsToIgnore) {
      this.wordsToIgnore = wordsToIgnore
      localStorage.setItem('wordsToIgnore', JSON.stringify(wordsToIgnore))
    },
    resetWordsToIgnore() {
      this.wordsToIgnore = [...this.defaultWordsToIgnore]
      localStorage.setItem('wordsToIgnore', JSON.stringify(this.wordsToIgnore))
    }
  }
})