<template>
    <component :is="props.type"
      :class="[
        'pa-4 pa-sm-6',
        props.fullHeight ? 'full-height' : '',
        props.forcedHeight ? 'full-height--forced' : ''
      ]"
      :id="props.id"
    >
      <slot />
    </component>
  </template>
  
  <script setup>
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'section'
    },
    fullHeight: {
      type: Boolean,
      required: false,
      default: false
    },
    forcedHeight: {
      type: Boolean,
      required: false,
      default: false
    }
  });
  </script>
  
  <style scoped>
  .full-height.full-height--forced {
    height: calc(100vh - var(--v-spacing-nav));
  }
  @media (min-width: 960px) {
    .full-height:not(.full-height--forced) {
      height: calc(100vh - var(--v-spacing-nav));
    }
  }
  </style>
  