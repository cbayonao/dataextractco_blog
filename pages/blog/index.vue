<template>
  <main>
    <BlogHero />
    <Section>
      <div class="horizontal-container">
        <ContentQuery
        path="/blog"
        :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
        :sort="{
          date: -1,
        }"
        :limit="blogCountLimit"
        v-slot="{ data }"
      >
        <BlogList :data="data" />
      </ContentQuery>
      </div>
      <BlogPagination
        v-if="data > 1"
        class="mt-4"
        :currentPage="1"
        :totalPages="data"
        :nextPage="data > 1"
        baseUrl="/blog/"
        pageUrl="/blog/page/"
      />
    </Section>
  </main>
</template>

<script setup>
// Find the number of blogs present
const blogCountLimit = 3;
const { data } = await useAsyncData(`content-/blog`, async () => {
  const _posts = await queryContent("/blog")
    .only(["headline", "excerpt", "date", "tags", "_path", "image"])
    .find();
  return Math.ceil(_posts.length / blogCountLimit);
});
</script>
<style scoped>
.horizontal-container {
  display: flex;
  overflow-x: auto;
}
.horizontal-container::-webkit-scrollbar {
  display: none;
}
</style>