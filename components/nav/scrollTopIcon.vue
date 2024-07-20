<template>
  <v-fab-transition>
    <v-btn
      v-if="isVisible"
      fixed
      bottom
      right
      fab
      small
      class="v-btn--rounded bg-primary text-white"
      @click="scrollToTop"
      aria-label="Scroll to Top"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    isVisible.value = scrollTop > window.innerHeight / 2;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check to set visibility
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.v-btn--rounded {
  border-radius: 50%;
  width: 56px;
  height: 56px;
  min-width: 0;
}
.bg-primary {
  background-color: #1976d2; /* Primary color from Vuetify theme */
}
.text-white {
  color: white;
}
.caption {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
