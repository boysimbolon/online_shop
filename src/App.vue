<template>
  <nav v-if="authStore.isLoggedIn" class="bg-gray-800 p-4 px-8 flex">
    <RouterLink to="/" class="text-white hover:text-gray-200 transition-colors"
      >Home</RouterLink
    >
    <RouterLink
      to="/users"
      class="ml-4 text-white hover:text-gray-200 transition-colors"
      >Users</RouterLink
    >
    <button
      @click="logout"
      class="ml-auto text-white hover:text-gray-200 transition-colors"
    >
      Logout
    </button>
  </nav>

  <div class="p-4">
    <RouterView />
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<style></style>
