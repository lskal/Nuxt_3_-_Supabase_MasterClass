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

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/content"],

  colorMode: {
    classSuffix: "",
  },
});
