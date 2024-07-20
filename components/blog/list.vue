<template>
  <v-row dense justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <div class="horizontal-container">
        <v-card
          v-for="article in data"
          :key="article._path"
          :id="article._path"
          :to="article._path + '/'"
          link
          max-width="90%"
          class="mx-1"
          height="300px"
          width="70%"
          flat
        >
          <v-img
            :src="article.image"
            gradient="rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)"
            height="300px"
            cover
          >
            <div class="overlay">
              <v-card-title class="headline mb-2 white--text">
                <div class="text-subtitle-1 no-break">
                  {{ article.headline }}
                </div>
              </v-card-title>

              <v-card-subtitle class="white--text">
                <div class="text-caption no-break">
                  {{ $formatDate(article.date) }}
                </div>
              </v-card-subtitle>
            </div>
          </v-img>
        </v-card>
      </div>
    </v-col>
  </v-row>
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
.horizontal-container {
  display: flex;
  overflow-x: auto;
}
.horizontal-container::-webkit-scrollbar {
  display: none;
}
.overlay {
  background: rgba(0, 0, 0, 0.5); /* Dark background for better text visibility */
  color: white; /* Ensure text is white */
  padding: 10px; /* Adjust padding as needed */
  width: 100%; /* Ensure it takes the full width */
  height: 100%; /* Ensure it takes the full height */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
