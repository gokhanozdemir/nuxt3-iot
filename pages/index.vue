<template>
  <div class="d-flex align-center flex-column">
    <div v-if="!useAuth0State.loading">
      <div v-if="!useAuth0State.isAuthenticated">
        <v-btn @click="login()" color="primary" size="x-large"
          >Let't Get Started</v-btn
        >
      </div>

      <div v-else>
        <v-card class="mx-auto" max-width="344">
          <v-card-header>
            <div>
              <div class="text-overline mb-1">Welcome</div>
              <div class="text-h6 mb-1">
                <strong>{{ useAuth0State.user.name }}</strong>
              </div>
              <div class="text-caption">
                HeliumPower is a device management system.
              </div>
            </div>
          </v-card-header>
          <v-card-actions>
            <v-btn @click="logout()"> Logout </v-btn>
            <v-btn to="/device" color="primary"> Devices </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
// This will also work in `<script setup>`
definePageMeta({
  //   layout: "custom",
});
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
