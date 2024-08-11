// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@vueuse/sound/nuxt",
    "@vee-validate/nuxt",
  ],
  shadcn: {
    prefix: "U",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  site: {
    name: "Aim Trainer",
    description: "Aim Trainer",
    defaultLocale: "en",
  },
  sound: {
    sounds: {
      scan: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: ["howler"],
    },
  },
});
