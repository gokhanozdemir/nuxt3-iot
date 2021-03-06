import createAuth0Client from "@auth0/auth0-spa-js";
// It will be available as authState() (camelCase of file name without extension)
export default function () {
  return useState("authState", () => ({
    user: null,
    loading: false,
    auth0: null,
    isAuthenticated: false,
  }));
}

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
      // redirect_uri: window.location.origin,
      //FIX add a ssr fix that will work on online servers too
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
    state.loading = true;
    console.log("init logout");
    state.auth0.logout({
      // returnTo: window.location.origin,
      //FIX add a ssr fix that will work on online servers too
    });
  };

  return {
    login,
    logout,
    initAuth,
  };
};
