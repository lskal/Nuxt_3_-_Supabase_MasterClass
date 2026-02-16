// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxtjs/supabase"],

  css: ["~/assets/css/main.css"],

  supabase: {
    redirect: false,
    // types: "./types/database.types.ts",
    // types: "~~/shared/utils/types/database.ts",
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },
});
