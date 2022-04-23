<template>
  <div>
    <div @click="increment">
      olala
      {{ count }}

      <NuxtWelcome @click="increment()" />
    </div>
  </div>
</template>

<script setup lang="ts">
// auth0
if (process.client) {
  const { login, logout, initAuth } = useAuth0(AuthState);
  initAuth();
}

const { $store } = useNuxtApp();
// This will also work in `<script setup>`
definePageMeta({
  //   layout: "custom",
});
console.log($store);
let count = ref(9);
const increment = () => {
  console.log("clicked");
  count.value++;
};
</script>
