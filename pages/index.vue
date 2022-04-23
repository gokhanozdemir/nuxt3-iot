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

      <NuxtWelcome />
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from "~/utils/useAuth0";

const useAuth0State = authState();
const runtimeConfig = useRuntimeConfig();
const configAuth = {
  domain: runtimeConfig.auth0Domain,
  client_id: runtimeConfig.auth0ClientId,
};
// console.log(authState);
// console.log("configAuth ", configAuth);

const { login, logout, initAuth } = useAuth0(useAuth0State, configAuth);
initAuth();

// This will also work in `<script setup>`
definePageMeta({
  //   layout: "custom",
});
// console.log("store");
// console.log(useAuth0State);
// console.log("store");
let count = ref(9);
// const increment = () => {
//   console.log("clicked");
//   count.value++;
// };
</script>
