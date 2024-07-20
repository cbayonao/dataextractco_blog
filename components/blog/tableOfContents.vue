<template>
  <v-container>
    <nav>
      <v-sheet
        elevation="0"
        color="transparent"
        class="d-flex flex-row justify-space-between align-center cursor-pointer"
        @click="toggleToc"
        aria-label="Expand the table of contents"
      >
        <span class="blog-aside-title mb-0">Contenido</span>
        <v-icon :class="[isVisible ? '' : 'rotate-180']"
          >mdi-chevron-down</v-icon
        >
      </v-sheet>
      <ul
        v-if="links"
        :class="[isVisible ? 'd-block' : 'd-none']"
        color="transparent"
      >
        <v-list-item
          v-for="link in flattenLinks(links)"
          :key="link.id"
          class="toc-link my-2"
        >
          <v-list-item-content>
            <v-list-item-title>
              <a
                :href="`#${link.id}`"
                class="hover:underline hover:text-primary no-break"
              >
                {{ link.text }}
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </ul>
    </nav>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const isVisible = ref(true);
const toggleToc = () => {
  isVisible.value = !isVisible.value;
};

const flattenLinks = (links) => {
  return links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
};
</script>

<style scoped>
.toc-link_3 {
  padding-left: 1rem;
}
.toc-link_3::before {
  padding-right: 0.5rem;
  content: "-";
}
.rotate-180 {
  transform: rotate(180deg);
}
.d-block {
  display: block;
}
.d-none {
  display: none;
}
.v-list-item {
  background-color: transparent !important;
}
.v-sheet {
  background-color: transparent !important;
}
.no-break {
  white-space: normal;
  word-break: keep-all;
}
</style>
