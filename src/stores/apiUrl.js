import { defineStore } from "pinia";

export const useApiUrlStore = defineStore("apiUrl", {
  state: () => ({
    apiUrl: "",
  }),
  actions: {
    setApiUrl(apiUrl) {
      this.apiUrl = apiUrl;
    },
  },
});
