<script setup>
// let devices = devicesState();
const config = useRuntimeConfig();
// const { data } = await useAsyncData("count", () => $fetch("/api/count"));
const { data: organization } = await useFetch(
  "https://console.helium.com/api/v1/organization",
  {
    headers: { key: config.heliumKey },
    async onResponse({ request, response, options }) {
      // Log response
      // console.log("[fetch response]", request, response.status, response.body);
    },
  }
);

const { data: devices } = await useFetch(
  "https://console.helium.com/api/v1/devices",
  {
    headers: { key: config.heliumKey },
    async onResponse({ request, response, options }) {
      // Log response
      // console.log("[fetch response]", request, response.status, response.body);
    },
  }
);

// const { data: mountain } = await useFetch(
//   "https://api.nuxtjs.dev/mountains/mount-everest",
//   {
//     pick: ["title", "description"],
//   }
// );
// response.data
// response.headers
</script>
<template>
  <!-- <div>Current Balance {{ data["dc_balance"] }}</div>
  <div>Current Helium Name {{ data["name"] }}</div> -->
  <div>Devices {{ organization }}</div>
  <v-btn to="/"> Back </v-btn>
  <v-btn to="/device-add" color="primary"> Add Device </v-btn>
  <v-card v-for="device in devices" class="mx-auto" max-width="344">
    <v-card-header>
      <div>
        <div class="text-overline mb-1">Device</div>
        <div class="text-h6 mb-1">
          <strong>Active: {{ device.active }}</strong>
        </div>
        <div class="text-caption">
          {{ device.app_key }}
        </div>
      </div>
    </v-card-header>
    <v-card-actions> </v-card-actions>
  </v-card>
  <!-- <div>Devices {{ mountain.title }}</div> -->
</template>
