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
    <div>
      olala
      {{ count }}

      <NuxtWelcome @click="increment" />
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from "~/utils/useAuth0";

let useAuth0State = authState();
const runtimeConfig = useRuntimeConfig();
const configAuth = {
  domain: runtimeConfig.auth0Domain,
  client_id: runtimeConfig.auth0ClientId,
};

const { login, logout, initAuth } = useAuth0(useAuth0State.value, configAuth);
initAuth();

// This will also work in `<script setup>`
definePageMeta({
  //   layout: "custom",
});
let count = ref(9);
const increment = () => {
  console.log("clicked");
  count.value++;
};
</script>
