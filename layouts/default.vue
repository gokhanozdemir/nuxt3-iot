<script setup>
// auth
</script>
<template>
  <div>
    <p>
      route params group {{ $route.params.group }} - id {{ $route.params.id }}
    </p>
    Some shared layout content:
    <!-- Markup shared across all pages, ex: NavBar -->

    <!-- <ul>
      <li><NuxtLink to="/">Home page</NuxtLink></li>
      <li><NuxtLink to="/auth/signed-in">Login</NuxtLink></li>
      <li><NuxtLink to="/auth/signed-out">Logout</NuxtLink></li>
    </ul> -->

    <NuxtPage />
  </div>
</template>
