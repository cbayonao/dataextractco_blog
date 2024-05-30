// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Data Extract Blog',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'es'
      }
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  nitro: {
    firebase: {
      gen: 2
    }
  },
  content: {
    // Configuring code highlighting
    // https://content.nuxtjs.org/api/configuration
    highlight: {
        theme: 'github-dark',
        // Define languages you expect to use
        preload: ['java','javascript']
    },
    markdown: {
      // Configuring external link processing
      // https://github.com/rehypejs/rehype-external-links
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer'
          }
        ]
      ]
    }
  },
  css: ['/assets/css/main.css'],
  ssr: true,
    experimental: {
        payloadExtraction: false
    },
    router: {
      options: {
          strict: false
      }
  },
  sourcemap: false, 
  devtools: { enabled: true }
})
