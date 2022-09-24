import { defineStore } from 'pinia'

export const useKeywordsStore = defineStore({
  id: 'keywords',
  state: () => ({
    defaultWordsToIgnore: [
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
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
      if (typeof localStorageWordsToIgnore !== 'undefined' && localStorageWordsToIgnore) {
        try {
          state.wordsToIgnore = JSON.parse(localStorageWordsToIgnore)
          return state.wordsToIgnore
        } catch (e) {
          console.error(e)
        }
      }

      state.wordsToIgnore = [...state.defaultWordsToIgnore]
      localStorage.setItem('wordsToIgnore', JSON.stringify(state.wordsToIgnore))
      return state.wordsToIgnore
    },
  },
  actions: {
    setWordsToIgnore(wordsToIgnore) {
      this.wordsToIgnore = wordsToIgnore
      localStorage.setItem('wordsToIgnore', JSON.stringify(wordsToIgnore))
    },
    resetWordsToIgnore() {
      this.wordsToIgnore = [...this.defaultWordsToIgnore]
      localStorage.setItem('wordsToIgnore', JSON.stringify(this.wordsToIgnore))
    }
  }
})