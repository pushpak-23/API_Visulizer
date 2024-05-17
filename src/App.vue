<template>
  <div>
    <InputUrl @submit="handleSubmit" />
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <div
        v-if="responseTime !== null"
        class="text-green-500 justify-center text-center align-middle font-semibold p-2 mt-10 bg-blue-100 border border-black w-auto"
      >
        Response Time: {{ responseTime }} ms
      </div>
      <DataTable :data="data" />
      <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import InputUrl from "./components/InputUrl.vue";
import DataTable from "./components/DataTable.vue";
import Loader from "./components/Loader.vue";
import { useApiUrlStore } from "./stores/apiUrl";

export default {
  components: {
    InputUrl,
    DataTable,
    Loader,
  },
  setup() {
    const apiUrlStore = useApiUrlStore(); // Get the Pinia store instance
    const data = ref([]);
    const errorMessage = ref("");
    const loading = ref(false); // Ref for loading state
    const responseTime = ref(null); // Ref for response time

    const handleSubmit = async (apiUrl) => {
      loading.value = true; // Set loading to true before fetching data
      responseTime.value = null; // Reset response time
      const startTime = performance.now(); // Start time for measuring response time
      try {
        const response = await fetch(apiUrl);
        const endTime = performance.now(); // End time for measuring response time
        responseTime.value = (endTime - startTime).toFixed(2); // Calculate response time
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        // Handle different data structures
        if (jsonData.recipes) {
          data.value = jsonData.recipes;
        } else if (Array.isArray(jsonData)) {
          data.value = jsonData;
        } else {
          data.value = [];
        }
        errorMessage.value = "";
      } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.value = "Failed to fetch data. Please try again.";
      } finally {
        loading.value = false; // Set loading to false after fetching data
      }
    };

    return { data, handleSubmit, errorMessage, loading, responseTime };
  },
};
</script>

<style scoped>
.text-red-500 {
  color: red;
}
.text-green-500 {
  color: green;
}
</style>
