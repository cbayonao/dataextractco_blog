<template>
  <v-main>
    <v-container fluid>
      <v-card color="rgba(238, 238, 232, 0.5)">
        <ContentDoc>
          <template v-slot="{ doc }">
            <!-- Header Section -->
            <v-card-title>
              <v-row class="border-t-2 pt-8 border-typography_primary mb-12">
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex align-center justify-start"
                >
                  <!-- Breadcrumbs -->
                  <v-row dense justify="center" align="center">
                    <v-col cols="12">
                      <v-breadcrumbs>
                        <v-breadcrumbs-item :to="{ path: '/' }">
                          <v-icon left>mdi-home</v-icon>
                          <span itemprop="name">Home</span>
                          <meta itemprop="position" content="1" />
                        </v-breadcrumbs-item>

                        <v-breadcrumbs-divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-breadcrumbs-divider>

                        <v-breadcrumbs-item :to="{ path: '/blog/' }">
                          <v-icon left>mdi-note-text</v-icon>
                          <span itemprop="name">Blog</span>
                          <meta itemprop="position" content="2" />
                        </v-breadcrumbs-item>

                        <v-breadcrumbs-divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-breadcrumbs-divider>

                        <v-breadcrumbs-item>
                          <v-icon left>mdi-file-document</v-icon>
                          <span itemprop="name">{{ doc.headline }}</span>
                          <meta itemprop="position" content="3" />
                        </v-breadcrumbs-item>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6" class="text-right">
                  <span
                    class="font-light text-typography_primary/75 dark:text-typography_primary_dark/75"
                  >
                    {{ $formatDate(doc.date) }}
                  </span>
                </v-col>
              </v-row>
              <!-- Headline -->
              <v-row class="text-center md:text-left">
                <v-col>
                  <div text class="headline text-h3 font-weight-bold no-break">
                    {{ doc.headline }}
                  </div>
                </v-col>
              </v-row>
              <!-- Excerpt -->
              <v-row class="text-center md:text-left">
                <v-col>
                  <p class="mb-8 text-lg leading-lg">
                    {{ doc.excerpt }}
                  </p>
                </v-col>
              </v-row>
              <div
                class="border-b-2 pb-8 border-typography_primary dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
              >
                <!-- Author and Social Share -->
                <v-row>
                  <v-col cols="12" md="6" class="d-flex align-center">
                    <span class="text-lg font-weight-light">
                      Por:
                      <a
                        :href="doc.authorUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-hover-underline font-italic"
                      >
                        {{ doc.author }}
                      </a>
                    </span>
                  </v-col>
                  <v-col cols="12" md="6" class="d-flex justify-end">
                    <NavShareIcons
                      :headline="doc.headline"
                      :excerpt="doc.excerpt"
                      :path="doc._path + '/'"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-card-title>
            <Section id="blog-title" type="header" />

            <!-- Content -->
            <v-row>
              <!-- Table of Contents -->
              <v-col cols="12" md="3" class="d-none d-md-flex">
                <div class="mb-4 no-break">
                  <BlogTableOfContents :links="doc.body?.toc?.links" />
                </div>
              </v-col>
              <v-col cols="12" md="7">
                <div class="prose text-justify">
                  <span
                    v-show="doc.dateUpdated"
                    class="italic text-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75"
                  >
                    (Actualizado: {{ $formatDate(doc.dateUpdated) }})
                  </span>
                  <div class="prose">
                    <ContentRenderer :value="doc" />
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="3" class="d-none d-md-flex">
                <!-- Related articles -->
                <div class="mb-4">
                  <BlogRelatedArticles
                    :surround="data?.surround"
                    class="blog-post-text"
                  />
                </div>
              </v-col>
            </v-row>

            <!-- Scroll to top -->
            <NavScrollTopIcon />
          </template>
          <!-- Error in case not found -->
          <template #not-found>
            <SectionsError />
          </template>
        </ContentDoc>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, "");
const route = useRoute();
const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  // Remove a trailing slash in case the browser adds it, it might break the routing
  // fetch document where the document path matches with the cuurent route
  let article = queryContent("/blog").where({ _path: cleanPath }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent("/blog")
    .sort({ date: -1 })
    .only(["_path", "headline", "excerpt"])
    .findSurround(cleanPath, { before: 1, after: 1 });
  return {
    article: await article,
    surround: await surround,
  };
});

// Get the authors
const { data: authorData } = await useAsyncData("home", () =>
  queryContent("/authors").findOne()
);

// Set the meta
const baseUrl = "https://example.com";
const canonicalPath = baseUrl + (path + "/").replace(/\/+$/, "/");
const image =
  baseUrl + (data.value?.article?.socialImage.src || "/sample.webp");

// JSON+LD
const jsonScripts = [
  {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://example.com/",
      },
      url: canonicalPath,
      image: image,
      headline: data.value?.article?.headline,
      abstract: data.value?.article?.excerpt,
      datePublished: data.value?.article?.date,
      dateModified:
        data.value?.article?.dateUpdated || data.value?.article?.date,
      author: authorData.value[data.value?.article?.author],
      publisher: authorData.value["Gonzalo Hirsch"],
    }),
  },
];
useHead({
  title: data.value?.article?.title,
  meta: [
    { name: "author", content: data.value?.article?.author },
    { name: "description", content: data.value?.article?.description },
    {
      property: "article:published_time",
      content: data.value?.article?.date.split("T")[0],
    },
    // OG
    {
      hid: "og:title",
      property: "og:title",
      content: data.value?.article?.headline,
    },
    { hid: "og:url", property: "og:url", content: canonicalPath },
    {
      hid: "og:description",
      property: "og:description",
      content: data.value?.article?.description,
    },
    { hid: "og:image", name: "image", property: "og:image", content: image },
    { hid: "og:type", property: "og:type", content: "Article" },
    {
      hid: "og:image:type",
      property: "og:image:type",
      content: `image/${data.value?.article?.socialImage.mime}`,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: data.value?.article?.socialImage.width || 190,
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: data.value?.article?.socialImage.height || 190,
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content: data.value?.article?.socialImage.alt,
    },
    // Twitter
    { hid: "twitter:card", name: "twitter:card", content: "Summary" },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: data.value?.article?.headline,
    },
    { hid: "twitter:url", name: "twitter:url", content: canonicalPath },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: data.value?.article?.description,
    },
    { hid: "twitter:image", name: "twitter:image", content: image },
    {
      hid: "twitter:image:alt",
      name: "twitter:image:alt",
      content: data.value?.article?.socialImage.alt,
    },
  ],
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: canonicalPath,
    },
  ],
  script: jsonScripts,
});
</script>

<style scoped>
/* Scoped styles for Vuetify components */
.headline {
  text-align: center; /* Center headline for small screens */
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-lg {
  font-size: 1.125rem; /* Larger text size */
}
.leading-lg {
  line-height: 1.75; /* Larger line height */
}
.text-hover-underline:hover {
  text-decoration: underline;
}
.text-justify {
  text-align: justify;
}
.no-break {
  white-space: normal;
  word-break: keep-all;
}

/* Optional: Style the code itself */
pre {
  margin: 0; /* Remove default margin */
  font-family: "Courier New", Courier, monospace; /* Monospace font */
}
</style>
