<template>
  <div>
    <!-- Search and Filter Dropdown Row -->
    <div class="flex justify-between mb-4">
      <div>
        <SearchForm @search="handleSearch" />
      </div>
      <div class="flex justify-center items-center">
        <FilterDropdown :items="data" @filter="handleFilter" />
      </div>
    </div>

    <!-- Table Section -->
    <div v-if="filteredData && filteredData.length > 0" class="overflow-x-auto">
      <table class="table-auto border-collapse border w-full">
        <!-- Table Header -->
        <thead>
          <tr class="bg-gray-200">
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="px-4 py-2 text-left"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr
            v-for="(item, index) in filteredData"
            :key="index"
            class="border-b"
          >
            <td
              v-for="(header, key) in tableHeaders"
              :key="key"
              class="border px-4 py-2 whitespace-no-wrap"
            >
              <!-- Check if it's an image URL -->
              <template v-if="isImageURL(item[header])">
                <img
                  :src="item[header]"
                  alt="image"
                  class="w-20 h-20 rounded"
                />
              </template>
              <template v-else-if="Array.isArray(item[header])">
                <ul>
                  <li
                    v-for="(subItem, subIndex) in item[header]"
                    :key="subIndex"
                  >
                    {{ subItem }}
                  </li>
                </ul>
              </template>
              <template v-else>
                {{ item[header] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-gray-500">No data available</p>
    </div>
  </div>
</template>

<script>
import SearchForm from "./SearchForm.vue";
import FilterDropdown from "./FilterDropdown.vue";

export default {
  components: {
    SearchForm,
    FilterDropdown,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      filters: {}, // Object to hold filter values
    };
  },
  computed: {
    filteredData() {
      let filteredData = [...this.data];

      // Apply search filter
      if (this.searchQuery.trim() !== "") {
        const searchKey = this.searchQuery.trim().toLowerCase();
        filteredData = filteredData.filter((item) => {
          return Object.values(item).some((value) => {
            return String(value).toLowerCase().includes(searchKey);
          });
        });
      }

      // Apply other filters
      Object.keys(this.filters).forEach((column) => {
        const values = this.filters[column];
        if (values.length > 0) {
          filteredData = filteredData.filter((item) => {
            return values.includes(item[column]);
          });
        }
      });

      return filteredData;
    },
    tableHeaders() {
      return this.data.length > 0 ? Object.keys(this.data[0]) : [];
    },
  },
  methods: {
    isImageURL(url) {
      if (!url || typeof url !== "string") {
        return false;
      }
      // Check for common image file extensions
      return /\.(jpeg|jpg|gif|png)$/.test(url);
    },
    handleSearch(search) {
      this.searchQuery = search;
    },
    handleFilter({ column, values }) {
      // If there are no values selected, remove the filter for this column
      if (values.length === 0) {
        this.$delete(this.filters, column);
      } else {
        this.$set(this.filters, column, values);
      }
    },
  },
};
</script>
