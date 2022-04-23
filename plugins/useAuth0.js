import createAuth0Client from "@auth0/auth0-spa-js";

// const exportconfig = {
//   domain: "kaktus.us.auth0.com",
//   client_id: "l8J5f6hqeqq5L1atGvRxfRSVW3o1ivF5",
//   //   domain: process.env.AUTH0_DOMAIN,
//   //   client_id: process.env.AUTH0_CLIENT_ID,
// };
// console.log(config);

// import { useState } from "#app";

export default defineNuxtPlugin((nuxtApp, state) => {
  if (process.client) {
    // export const useAuth0 = (state) => {
    const handleStateChange = async () => {
      state.isAuthenticated == !!(await state.auth0.isAuthenticated());
      state.user = await state.auth0.getUser();
      state.loading = false;
    };

    const initAuth = () => {
      state.loading = true;
      createAuth0Client({
        domain: config.domain,
        client_id: config.client_id,
        cacheLocation: "localstorage",
        // redirect_uri: window.location.origin,
        redirect_uri: "http://localhost:3000/",
      }).then(async (suth) => {
        state.auth0 = auth;
        await handleStateChange();
      });
    };

    const login = async () => {
      console.log("init login");
      await state.auth0.loginWithPopup();
      await handleStateChange();
    };

    const logout = async () => {
      console.log("init logout");
      state.auth0.logout({
        // returnTo: window.location.origin,
        returnTo: "http://localhost:3000/",
      });
    };

    return {
      login,
      logout,
      initAuth,
    };
  }
});
