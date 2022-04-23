import createAuth0Client from "@auth0/auth0-spa-js";

export const useAuth0 = (state, config) => {
  const handleStateChange = async () => {
    console.log("handleStateChange initiated");
    state.user = await state.auth0.getUser();
    state.isAuthenticated = !!(await state.auth0.isAuthenticated());
    state.loading = false;
  };

  const initAuth = () => {
    console.log("initAuth started");
    state.loading = true;
    createAuth0Client({
      domain: config.domain,
      client_id: config.client_id,
      cacheLocation: "localstorage",
      redirect_uri: window.location.origin,
    }).then(async (auth) => {
      state.auth0 = auth;
      await handleStateChange();
      console.log("initAuth ended ", state);
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
      returnTo: window.location.origin,
    });
  };

  return {
    login,
    logout,
    initAuth,
  };
};
