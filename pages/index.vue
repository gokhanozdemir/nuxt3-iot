<template>
  <div>
    <div>
      olala
      {{ count }}

      <NuxtWelcome @click="increment" />
    </div>
  </div>
</template>

<script setup>
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
