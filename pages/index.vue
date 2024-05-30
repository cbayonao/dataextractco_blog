<template>
  <BackgroundSpiderImg />
  <div class="container" style="height: 100vh">
    <h1 class="text-center">Blog de Data Extract!</h1>
    <NuxtLink to="/blog/">
      <button
        class="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Leer el blog!
      </button>
    </NuxtLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
