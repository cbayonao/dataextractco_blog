<template>
  <v-container>
    <v-subheader class="my-2">Continua leyendo</v-subheader>
    <ul>
      <template v-for="(other, index) in surround" :key="index">
        <v-list-item v-if="other">
          <v-list-item-content>
            <v-list-item-title>
              <NuxtLink
                :to="other._path + '/'"
                class="hover--text-primary no-break"
                :aria-label="other.headline"
              >
                {{ other.headline }}
              </NuxtLink>
            </v-list-item-title>
            <v-list-item-subtitle class="d-none d-md-block mt-1 no-break">
              {{ other.excerpt }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </ul>
  </v-container>
</template>

<script setup>
defineProps({
  surround: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
a {
  color: #102942;
  text-decoration: solid;
}
.no-break {
  white-space: normal;
  word-break: keep-all;
}
</style>
