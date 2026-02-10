// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  future: { compatibilityVersion: 4 },

  routeRules: {
    "/blog/**": { appLayout: "another" },
  },

  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/content"],

  colorMode: {
    classSuffix: "",
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  // router: {
  //   options: {
  //     scrollBehaviorType: "smooth",
  //   },
  // },
});
