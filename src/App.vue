<template>
  <div>
    <InputUrl @submit="handleSubmit" />
    <DataTable :data="data" />
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import InputUrl from "./components/InputUrl.vue";
import DataTable from "./components/DataTable.vue";
import { useApiUrlStore } from "./stores/apiUrl";

export default {
  components: {
    InputUrl,
    DataTable,
  },
  setup() {
    const apiUrlStore = useApiUrlStore(); // Get the Pinia store instance
    const data = ref([]); // Ref for storing fetched data
    const errorMessage = ref(""); // Ref for error message

    const handleSubmit = async (apiUrl) => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        data.value = jsonData;
        errorMessage.value = "";
      } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.value = "Failed to fetch data. Please try again.";
      }
    };

    return { data, handleSubmit, errorMessage };
  },
};
</script>
