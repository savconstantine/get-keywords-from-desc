import { defineStore } from 'pinia'

export const ERROR_STATE_DEFAULT = "default"
export const ERROR_STATE_COPIED = "copied";
export const ERROR_STATE_ERROR = "error";
export const ERROR_STATE_NOKEYWORDS = "noKeywords";

export const useErrorsStore = defineStore({
  id: "errors",
  state: () => ({
    copyButtonTextState: ERROR_STATE_DEFAULT,
    copyButtonText: {
      default: "Copy Generated Keywords",
      copied: "Copied!",
      error: "Error! Try again",
      noKeywords: "Add some description to generate keywords",
    },
  }),
  getters: {
    getCopyButtonTextState() {
      return this.copyButtonTextState;
    },
    getCopyButtonText() {
      return this.copyButtonText[this.copyButtonTextState];
    },
  },
  actions: {
    setCopyButtonTextState(state) {
      this.copyButtonTextState = state;
    },
  },
});