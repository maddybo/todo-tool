// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  plugins: ["~/plugins/axios.ts"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
