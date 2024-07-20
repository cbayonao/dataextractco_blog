<template>
  <v-container
    class="d-flex flex-column fill-height align-center justify-center"
  >
    <v-row class="d-flex flex-column align-center justify-center text-center">
      <p class="text-h2 pa-md-8">Blog de Data Extract!</p>
      <v-btn
        prepend-icon="mdi-spider-thread"
        to="/blog/"
        size="large"
        variant="outlined"
        class="mt-4"
      >
        Vamos al blog!
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BlogComponent",
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
