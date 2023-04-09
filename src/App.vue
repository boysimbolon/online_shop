<template>
  <nav class="bg-gray-800 p-4 px-8 flex justify-between items-center">
    <RouterLink to="/" class="text-white hover:text-gray-200 transition-colors"
      >Home</RouterLink
    >
    <RouterLink
      to="/users"
      class="text-white hover:text-gray-200 transition-colors"
      >Users</RouterLink
    >
  </nav>

  <div class="p-4">
    <RouterView />
  </div>
</template>

<script setup></script>

<style></style>
