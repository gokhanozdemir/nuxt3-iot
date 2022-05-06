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

// TODO: Merge the 2 requests above together: https://v3.nuxtjs.org/guide/features/data-fetching/ end of the page

// const { data: mountain } = await useFetch(
//   "https://api.nuxtjs.dev/mountains/mount-everest",
//   {
//     pick: ["title", "description"],
//   }
// );
// response.data
// response.headers

const { data: deviceNew } = await useFetch(
  "https://console.helium.com/api/v1/devices",
  {
    method: "POST",
    params: {
      name: "kaktus10004",
      app_eui: "0000000000000010",
      app_key: "01020304050607080910111213141517",
      dev_eui: "0102030405060709",
    },
    headers: { key: config.heliumKey },
    async onResponse({ request, response, options }) {
      // Log response
      console.log("[fetch response]", request, response.status, response.body);
    },
  }
);
</script>
<template>
  <!-- <div>Current Balance {{ data["dc_balance"] }}</div>
  <div>Current Helium Name {{ data["name"] }}</div> -->
  <div>Devices {{ organization }}</div>
  <v-btn to="/"> Back </v-btn>
  olala
  {{ deviceNew }}
  olala
  <v-card v-if="deviceNew" class="mx-auto" max-width="344">
    <v-card-header>
      <div>
        <div class="text-overline mb-1">DeviceNew</div>
        <div class="text-h6 mb-1">
          <strong>Active: {{ deviceNew.active }}</strong>
        </div>
        <div class="text-caption">
          {{ deviceNew.app_key }}
          <span>{{ deviceNew }}</span>
        </div>
      </div>
    </v-card-header>
    <v-card-actions> </v-card-actions>
  </v-card>
  olala

  <v-card v-for="device in devices" class="mx-auto" max-width="344">
    <v-card-header>
      <div>
        <div class="text-overline mb-1">Device</div>
        <div class="text-h6 mb-1">
          <strong>Active: {{ device.active }}</strong>
        </div>
        <div class="text-caption">
          {{ device.app_key }}
          <span>{{ device }}</span>
        </div>
      </div>
    </v-card-header>
    <v-card-actions> </v-card-actions>
  </v-card>
  <!-- <div>Devices {{ mountain.title }}</div> -->
</template>
