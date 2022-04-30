<script setup>
// auth
// import { useAuth0 } from "~/utils/useAuth0";

let useAuth0State = authState();
const runtimeConfig = useRuntimeConfig();
const configAuth = {
  domain: runtimeConfig.auth0Domain,
  client_id: runtimeConfig.auth0ClientId,
};

const { login, logout, initAuth } = useAuth0(useAuth0State.value, configAuth);
initAuth();
</script>
<template>
  <div>
    <div v-if="!useAuth0State.loading">
      <div v-if="!useAuth0State.isAuthenticated">
        <button @click="login()" class="btn btn-primary">Login</button>
      </div>

      <div v-else>
        <p>
          Welcome to VueAuth
          <strong>{{ useAuth0State.user.name }}</strong>
        </p>
        <button @click="logout()" class="btn btn-secondary">Logout</button>
      </div>
    </div>

    <div v-else>Loading ...</div>
    <p>
      route params group {{ $route.params.group }} - id {{ $route.params.id }}
    </p>
    Some shared layout content:
    <!-- Markup shared across all pages, ex: NavBar -->

    <!-- <ul>
      <li><NuxtLink to="/">Home page</NuxtLink></li>
      <li><NuxtLink to="/auth/signed-in">Login</NuxtLink></li>
      <li><NuxtLink to="/auth/signed-out">Logout</NuxtLink></li>
    </ul> -->

    <NuxtPage />
  </div>
</template>
