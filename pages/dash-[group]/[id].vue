<template>
  <div>
    <h1>group {{ $route.params.group }} - id {{ $route.params.id }}</h1>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

if (route.params.group === "users" && !route.params.id) {
  console.log("Warning! Make sure user is authenticated!");
}
</script>
