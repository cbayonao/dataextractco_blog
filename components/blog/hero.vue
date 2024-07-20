<template>
  <v-container id="blog" class="text-typography_primary">
    <v-breadcrumbs>
      <v-breadcrumbs-item href="/" text="Home">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <v-icon left>mdi-home</v-icon>
        Home
      </v-breadcrumbs-item>
      <v-breadcrumbs-item text="Blog"></v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-row class="text-center md:text-left">
      <v-col cols="12">
        <h1 class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1">
          Blog
        </h1>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <p class="mb-3 md:text-lg md:leading-lg text-justify">
          En la era digital actual, los datos son el activo más valioso para empresas y organizaciones. En este blog exploraremos la fascinante intersección de la extracción y análisis de datos.
        </p>
        <p class="mb-3 md:text-lg md:leading-lg text-justify">
          Descubriremos cómo técnicas avanzadas de extracción y métodos robustos de análisis estadístico revelan patrones ocultos y tendencias significativas.
        </p>
        <p class="mb-3 md:text-lg md:leading-lg text-justify">
          Aprenderemos cómo convertir volúmenes masivos de datos en información accionable, utilizando herramientas y frameworks modernos para impulsar decisiones informadas y estrategias efectivas.
        </p>
        <p class="mb-3 md:text-lg md:leading-lg text-justify">
          Únete a nosotros en este viaje hacia el descubrimiento de cómo los datos pueden transformar la manera en que entendemos y operamos en el mundo empresarial actual.
        </p>
      </v-col>
    </v-row>

    <v-divider class="mt-8"></v-divider>
  </v-container>
</template>

<script>
export default {
  name: 'BlogSection'
}
</script>

<style scoped>
.v-breadcrumbs__divider {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.v-icon {
  margin-right: 0.5rem;
}

.text-h3 {
  font-size: 1.5rem;
}

.text-h1 {
  font-size: 2.25rem;
}

.leading-h3 {
  line-height: 2rem;
}

.leading-h1 {
  line-height: 2.5rem;
}
</style>
