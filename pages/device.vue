<script setup>
import { server } from "process";

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

// const { data: deviceNew } = await useFetch(
//   "https://console.helium.com/api/v1/devices",
//   {
//     method: "POST",
//     params: {
//       name: "kaktus10004",
//       app_eui: "0000000000000012",
//       app_key: "01020304050607080910111213141517",
//       dev_eui: "0102030405060709",
//     },
//     headers: { key: config.heliumKey },
//     async onResponse({ request, response, options }) {
//       // Log response
//       console.log("[fetch response]", response.status, response.statusText);
//     },
//   }
// );

const form = reactive({
  app_eui: null,
  name: null,
  email: null,
  message: null,
  getData: {},
});

const submitDevice = async (config) => {
  console.log("olala");
  return await $fetch("https://console.helium.com/api/v1/devices", {
    method: "POST",
    params: {
      name: "kaktus10004",
      app_eui: "00000000000000121",
      app_key: "01020304050607080910111213141517",
      dev_eui: "0102030405060709",
    },
    headers: {
      key: config.heliumKey,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).catch((error) => error.data);
  // return ({ data, pending, error, refresh } = useFetch(
  //   "https://console.helium.com/api/v1/devices",
  //   {
  //     method: "POST",
  //     params: {
  //       name: "kaktus10004",
  //       app_eui: "0000000000000011",
  //       app_key: "01020304050607080910111213141517",
  //       dev_eui: "0102030405060709",
  //     },
  //     headers: {
  //       key: config.heliumKey,
  //     },
  //   }
  // ));
  console.log("olalaaa");
};

const mountainData = ref({
  title: "titt",
  description: "desc",
});

const mountaionDetailsGet = async () => {
  mountainData.value = await useFetch(
    "https://api.nuxtjs.dev/mountains/mount-everest",
    {
      pick: ["title", "description"],
    }
  );
};
</script>
<template>
  <!-- <div>Current Balance {{ data["dc_balance"] }}</div>
  <div>Current Helium Name {{ data["name"] }}</div> -->
  <div>Devices {{ organization }}</div>

  <div>
    <!-- <div>
      <button @click="loadMyTodo">Load my todo</button>
      <div v-text="title"></div>
    </div> -->

    test
    <form @submit.prevent="handleSubmit">
      <input
        v-model="form.name"
        type="text"
        name="name"
        placeholder="Enter name"
      />
      <input
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Enter email"
      />
      <textarea
        v-model="form.message"
        placeholder="Enter message"
        name="message"
      ></textarea>
      <button type="submit" @click="submitDevice">Send</button>
    </form>
  </div>
  <v-btn to="/"> Back </v-btn>
  <v-btn @click="mountaionDetailsGet()"> mountaionDetailsGet </v-btn>
  olala
  <!-- {{ deviceNew }}
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
  olala -->
  <div style="background: lightblue" v-text="mountainData"></div>

  {{ mountainData.title }}
  {{ mountainData.description }}
  <v-card
    v-for="device in devices"
    key="device.app_eui"
    class="mx-auto"
    max-width="344"
  >
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
