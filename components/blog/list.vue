<template>
  <ul class="grid grid-cols-10 gap-4 text-typography_primary">
    <li
      v-for="article in data"
      :key="article._path"
      class="col-span-full md:col-span-5 relative rounded-md border-2 border-typography_primary hover:border-text-gray-700 group"
    >
      <v-card link :to="article._path + '/'" class="p-4 block relative">
        <v-img
          gradient="rgb(246, 233, 126, 30%) 0%,  rgb(23, 23, 49, 70%) 100%"
          class="white--text align-end"
          height="300px"
          :src="article.image"
          cover
        />
        <v-card-title class="mb-2">
          <div class="text-subtitle-1 no-break">
            {{ article.headline }}
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div class="text-caption no-break">
            {{ $formatDate(article.date) }}
          </div>
        </v-card-subtitle>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </li>
  </ul>
  <p
    v-if="data.length == 0"
    class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white"
  >
    {{ message }}
  </p>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    default:
      "There are no posts right now, but stay tuned for newer releases in the future.",
  },
});
const { $formatDate } = useNuxtApp();
onMounted(() => {
  console.log("Data received:", props.data);
});
</script>

<style scoped>
.no-break {
  white-space: normal;
  word-break: keep-all;
}
</style>