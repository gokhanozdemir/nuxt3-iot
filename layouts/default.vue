<template>
  <div>
    <p>
      route params group {{ $route.params.group }} - id {{ $route.params.id }}
    </p>
    Some shared layout content:
    <!-- Markup shared across all pages, ex: NavBar -->

    <ul>
      <li><NuxtLink to="/">Home page</NuxtLink></li>
      <li><NuxtLink to="/login">Login</NuxtLink></li>
    </ul>

    <NuxtPage />
  </div>
</template>
