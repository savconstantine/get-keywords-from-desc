import { defineStore } from 'pinia'

export const useErrorsStore = defineStore({
  id: "errors",
  state: () => ({
    copyButtonTextState: "default",
    copyButtonText: {
      default: "Copy Generated Keywords",
      copied: "Copied!",
      error: "Error! Try again",
      noKeywords: "Add some description to generate keywords",
    },
  }),
  getters: {
    getCopyButtonTextState() {
      return this.copyButtonTextState
    },
    getCopyButtonText() {
      return this.copyButtonText[this.copyButtonTextState]
    },
  },
  actions: {
    setCopyButtonTextState(state) {
      this.copyButtonTextState = state
    }
  },
});