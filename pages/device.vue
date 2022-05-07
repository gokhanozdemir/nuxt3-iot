<script setup>
import { server } from "process";

const config = useRuntimeConfig();
// const { data } = await useAsyncData("count", () => $fetch("/api/count"));
// const { data: organization } = await useFetch(
//   "https://console.helium.com/api/v1/organization",
//   {
//     headers: { key: config.heliumKey },
//     async onResponse({ request, response, options }) {
//       // Log response
//       // console.log("[fetch response]", request, response.status, response.body);
//     },
//   }
// );

// const { data: devices } = await useFetch(
//   "https://console.helium.com/api/v1/devices",
//   {
//     headers: { key: config.heliumKey },
//     async onResponse({ request, response, options }) {
//       // Log response
//       // console.log("[fetch response]", request, response.status, response.body);
//     },
//   }
// );

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
});

let heliumState = ref({
  organization: null,
  devices: null,
  deviceCount: 0,
});

const heliumOrgDetails = async () => {
  heliumState.value.organization = await $fetch(
    "https://console.helium.com/api/v1/organization",
    {
      method: "GET",
      headers: {
        key: config.heliumKey,
      },
    }
  ).catch((error) => error.data);
};

const heliumDevices = async () => {
  heliumState.value.devices = await $fetch(
    "https://console.helium.com/api/v1/devices",
    {
      method: "GET",
      headers: {
        key: config.heliumKey,
      },
    }
  ).catch((error) => error.data);

  let nextID = "100000000000001";
  heliumState.deviceCount = heliumState.value.devices.length;
  const increaseandappend = () => {
    nextID = "100000000000001" + heliumState.deviceCount;
    console.log(
      heliumState.deviceCount,
      "heliumState.deviceCount, ",
      nextID,
      ", nextID "
    );
    form.app_eui = nextID;
  };
  increaseandappend();
};

const newDevice = async () => {
  heliumState.value.deviceNew = await $fetch(
    "https://console.helium.com/api/v1/devices",
    {
      method: "POST",
      headers: {
        key: config.heliumKey,
        "Content-Type": "application/json",
      },
      params: {
        name: "kaktus10004",
        app_eui: form.app_eui,
        app_key: "01020304050607080910111213141517",
        dev_eui: "0102030405060709",
      },
    }
  ).catch((error) => error.data);
  console.log("form.app_eui,", form.app_eui);
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
      async onResponse({ request, response, options }) {
        // Log response
        console.log("[fetch response]", request, response.status);
      },
    }
  );
};
</script>
<template>
  <div>
    <div>
      <div>Org {{ heliumState.organization }}</div>
      IORDEER heliumState.devices: -{{ heliumState.deviceCount }}-
      <div>
        test
        <form v-if="heliumState.devices" @submit.prevent="handleSubmit">
          <input v-model="form.app_eui" type="text" name="name" required />

          <v-btn type="submit" @click="newDevice">Add a new device</v-btn>
        </form>
      </div>
      <v-btn to="/"> Back </v-btn>
      <v-btn @click="mountaionDetailsGet()"> mountaionDetailsGet </v-btn>
      <v-btn @click="heliumOrgDetails()"> heliumOrgDetails </v-btn>
      <v-btn @click="heliumDevices()"> heliumDevices </v-btn>

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
      <div @click="increaseandappend()">
        <v-card
          v-for="device in heliumState.devices"
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
      </div>
    </div>
  </div>
</template>
