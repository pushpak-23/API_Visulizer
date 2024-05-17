<template>
  <!-- Navbar component -->
  <Navbar />
  <div class="container mx-auto mt-8">
    <div class="max-w-md mx-auto">
      <!-- Input form -->
      <form
        @submit.prevent="handleSubmit"
        class="neumorphic-bg rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="apiUrl"
          >
            API URL
          </label>
          <input
            v-model="apiUrl"
            @input="updateApiUrl"
            :class="{ 'border-red-500': !isApiUrlValid }"
            class="neumorphic-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiUrl"
            type="text"
            placeholder="Enter API URL"
          />
          <p v-if="!isApiUrlValid" class="text-red-500 text-xs italic">
            Please enter a valid API URL.
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            :class="{
              'neumorphic-button': isApiUrlValid,
              'neumorphic-button-disabled': !isApiUrlValid,
            }"
            :disabled="!isApiUrlValid"
            class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Visualize
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useApiUrlStore } from "../stores/apiUrl"; // Import Pinia store
import Navbar from "./Navbar.vue";

export default {
  components: {
    Navbar,
  },
  emits: ["submit"],
  data() {
    return {
      apiUrl: "", // Initialize API URL
    };
  },
  computed: {
    isApiUrlValid() {
      // Simple regex pattern for URL validation
      const urlPattern = /^https?:\/\/.+$/;
      return urlPattern.test(this.apiUrl);
    },
  },
  methods: {
    handleSubmit() {
      if (this.isApiUrlValid) {
        this.$emit("submit", this.apiUrl); // Emit submit event with API URL
      }
    },
    updateApiUrl() {
      // You can add additional validation or formatting logic here if needed
    },
  },
};
</script>

<style scoped>
/* Neumorphism styles */
.neumorphic-bg {
  background: #f0f3f5;
  box-shadow: 20px 20px 60px #bec3c9, -20px -20px 60px #ffffff;
}

.neumorphic-input {
  background: #f0f3f5;
  border: none;
  box-shadow: inset 5px 5px 10px #bec3c9, inset -5px -5px 10px #ffffff;
}

.neumorphic-button {
  background: #4a9ff5;
  box-shadow: 5px 5px 10px #397aa6, -5px -5px 10px #5ac8fa;
}

.neumorphic-button:hover {
  background: #3e8ad7;
}

.neumorphic-button:active {
  box-shadow: inset 5px 5px 10px #397aa6, inset -5px -5px 10px #5ac8fa;
}

.neumorphic-button-disabled {
  background: #a5acb3;
  cursor: not-allowed;
}
</style>
