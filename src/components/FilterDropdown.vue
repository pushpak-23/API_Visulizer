<template>
  <div class="relative flex items-center w-full px-4">
    <!-- Main Elements Dropdown -->
    <div class="relative mr-4" @click="show = !show">
      <button
        class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
      >
        {{
          selectedColumn ? `Filter by ${selectedColumn}` : "Select a category"
        }}
      </button>
      <div
        v-if="show"
        class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow"
      >
        <ul class="space-y-2 text-sm">
          <li v-for="(column, index) in columns" :key="index">
            <button
              @click="selectColumn(column)"
              class="text-left w-full px-2 py-1 hover:bg-gray-100"
            >
              {{ column }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sub-Elements Dropdown -->
    <div v-if="selectedColumn" class="relative">
      <button
        @click="showSub = !showSub"
        class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
      >
        {{ selectedValue ? `Filter by ${selectedValue}` : "Select a subtype" }}
      </button>
      <div
        v-if="showSub"
        class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow"
      >
        <ul class="space-y-2 text-sm">
          <li v-for="(item, index) in columnValues" :key="index">
            <input
              :id="`filter_option_${index}`"
              type="checkbox"
              :value="item"
              v-model="selectedFilters"
              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-lg"
            />
            <label
              :for="`filter_option_${index}`"
              class="ml-2 text-sm font-medium text-gray-900"
              >{{ item }}</label
            >
          </li>
        </ul>
        <button
          @click="applyFilters"
          class="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-700"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits("filter");

const show = ref(false);
const showSub = ref(false);
const selectedColumn = ref(null);
const selectedValue = ref(null);
const selectedFilters = ref([]);

const columns = computed(() => {
  return Object.keys(props.items[0] || {});
});

const columnValues = computed(() => {
  const values = [];
  if (selectedColumn.value) {
    props.items.forEach((item) => {
      if (!values.includes(item[selectedColumn.value])) {
        values.push(item[selectedColumn.value]);
      }
    });
  }
  return values;
});

const selectColumn = (column) => {
  selectedColumn.value = column;
  selectedFilters.value = []; // Reset selected filters when a new column is selected
  showSub.value = true; // Show sub-elements dropdown when selecting a category
};

const applyFilters = () => {
  console.log("Applying filters:", {
    column: selectedColumn.value,
    values: selectedFilters.value,
  });
  emit("filter", {
    column: selectedColumn.value,
    values: selectedFilters.value,
  });
};
</script>
