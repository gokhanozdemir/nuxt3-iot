import { defineNuxtConfig } from "nuxt";
import vuetify from "./plugins/vuetify";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ["vuetify/dist/vuetify.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    // server: {
    //   proxy: {
    //     "/api/": {
    //       changeOrigin: true,
    //       target: "https://console.helium.com",
    //       secure: false,
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //     },
    //   },
    // },
  },
  ssr: false,
  runtimeConfig: {
    // The private keys which are only available within server-side

    // Keys within public, will be also exposed to the client-side
    public: {
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      heliumKey: process.env.HELIUM_KEY,
      apiBase: "/api",
    },
  },
});
