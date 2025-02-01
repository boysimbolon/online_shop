<template>
  <!-- Main wrapper div to create a full height layout with flexbox for centering the content -->
  <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Form container with a fixed width and spaced children -->
    <div class="max-w-md w-full space-y-8 text-gray-700">
      <!-- Logo and title -->
      <div class="flex items-center justify-center">
        <!-- SVG icon for the logo -->
        <IconOnlineShop />
        <!-- Title text -->
        <h2 class="text-2xl font-bold">Register|Online Shop</h2>
      </div>
      <!-- Error message container -->
      <div v-if="errorMessage">
        <p class="bg-red-100 text-red-700 rounded-lg p-4">{{ errorMessage }}</p>
      </div>
      <!-- Login form with onSubmit event handler -->
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <!-- Hidden input for remember -->
        <input type="hidden" name="remember" value="true" />
        <!-- Input fields container -->
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- Email input field -->
          <div>
            <label for="name" class="sr-only">Email address</label>
            <input
                id="name"
                name="name"
                type="text"
                v-model="name"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name User"
            />
          </div>
          <!-- Email input field -->
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
                id="email-address"
                name="email"
                type="email"
                v-model="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
            />
          </div>
          <!-- Password input field -->
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-500 focus:z-10 sm:text-sm"
                placeholder="Password"
            />
          </div>
        </div>
        <!-- Login button container -->
        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
// Import required dependencies and hooks
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import IconOnlineShop from "@/components/icons/IconOnlineShop.vue";

// Initialize required variables and hooks
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Reactive data to store user input and error messages
const email = ref("");
const name = ref("");
const password = ref("");
const errorMessage = ref(null);

// Function to handle form submission
async function onSubmit() {
  try {
    // Fetch CSRF token
    await axios.get("https://meonlineshop.rf.gd/sanctum/csrf-cookie");

    // Send login request
    const response = await axios.post("https://meonlineshop.rf.gd/api/register", {
      email: email.value,
      name: name.value,
      password: password.value,
    });

    // Save access token and navigate to the home page
    authStore.setAccessToken(response.data.access_token);
    console.log("Register successful");
    router.push({ name: "login" });
  } catch (error) {
    // Check if the error is due to validation
    if (
        error.response &&
        error.response.status === 422 &&
        error.response.data.errors &&
        error.response.data.errors.email
    ) {
      // Set the error message from the server response
      errorMessage.value = error.response.data.errors.email[0];
    } else {
      // Set a generic error message
      errorMessage.value = "An error occurred: " + error.message;
    }
    console.error(errorMessage.value);
  }
}
</script>
<style>
/* styles here */
</style>
