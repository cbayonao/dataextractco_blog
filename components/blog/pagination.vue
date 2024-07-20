<template>
  <v-container class="pagination-list text-typography_primary">
    <!-- Chevron -->
    <v-btn
      v-show="currentPage > 1"
      :to="prevLink"
      icon
      class="pagination-icon"
      size="small"
      elevation="0"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- First Page -->
    <v-btn
      :class="{ 'v-btn--active': currentPage === 1 }"
      :to="baseUrl"
      size="small"
      elevation="0"
    >
      1
    </v-btn>

    <!-- ... -->
    <span v-show="currentPage > 2" class="pagination-extra"> ... </span>

    <!-- Page Range -->
    <template v-for="page in pageRange" :key="page">
      <v-btn
        v-show="page !== 1 && page !== totalPages"
        :class="{ 'v-btn--active': currentPage === page }"
        :to="getPageUrl(page)"
        size="small"
        elevation="0"
      >
        {{ page }}
      </v-btn>
    </template>

    <!-- ... -->
    <span v-show="currentPage < totalPages - 1" class="pagination-extra">
      ...
    </span>

    <!-- Last Page -->
    <v-btn
      v-show="totalPages > 1"
      :class="{ 'v-btn--active': currentPage === totalPages }"
      :to="getPageUrl(totalPages)"
      size="small"
      elevation="0"
    >
      {{ totalPages }}
    </v-btn>

    <!-- Chevron -->
    <v-btn
      v-show="currentPage < totalPages"
      :to="getPageUrl(currentPage + 1)"
      icon
      class="pagination-icon"
      size="small"
      elevation="0"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  baseUrl: {
    type: String,
    required: true,
  },
  pageUrl: {
    type: String,
    required: true,
  },
});

const getPageUrl = (pageNo) => {
  return `${props.pageUrl}${pageNo}/`;
};

// Calculate the page range to show
const pageRange = [
  Math.max(1, props.currentPage - 1),
  props.currentPage,
  Math.min(props.totalPages, props.currentPage + 1),
];

const prevLink = computed(() => {
  return props.currentPage === 2
    ? props.baseUrl
    : `${props.pageUrl}${props.currentPage - 1}/`;
});
</script>

<style scoped>
.pagination-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.v-btn--active {
  background-color: var(--v-primary-base) !important;
  color: var(--v-theme-on-primary) !important;
}

.pagination-extra {
  width: 2rem;
  text-align: center;
}

.pagination-icon {
  width: 2.5rem;
  text-align: center;
}
</style>
