<template>
  <!-- A container with some padding -->
  <div class="p-4">
    <!-- A button to go back to the previous page -->
    <button
      class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
      @click="goBack"
    >
      &larr; Back
    </button>
    <!-- A heading to indicate the purpose of the page -->
    <h1 class="text-3xl font-bold mb-4">Edit User</h1>
    <!-- A form to edit the user details -->
    <form
      class="flex flex-col space-y-4"
      v-if="user"
      @submit.prevent="updateUser"
    >
      <!-- Label and input field for user name -->
      <label class="text-lg font-semibold" for="name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="user.name"
        type="text"
        id="name"
        required
      />
      <!-- Label and input field for user email -->
      <label class="text-lg font-semibold" for="email">Email:</label>
      <input
        class="border rounded-md p-2"
        v-model="user.email"
        type="email"
        id="email"
        required
      />
      <!-- Label and input field for user password -->
      <label class="text-lg font-semibold" for="password">Password:</label>
      <input
        class="border rounded-md p-2"
        v-model="password"
        type="password"
        id="password"
      />
      <!-- Button to submit the form and update the user details -->
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>

<!-- Script section -->
<script setup>
// Import required dependencies
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Get the authentication store, router, and route instances
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Define reactive variables to store the user details and password
const user = ref(null);
const password = ref("");

// Function to go back to the previous page
const goBack = () => {
  router.go(-1);
};

// Function to fetch the user details on page load
onMounted(async () => {
  try {
    // Send a GET request to the API to fetch the user details
    const response = await axios.get(
      `http://localhost:8000/api/users/${route.params.id}`,
      {
        // Include the access token in the request headers for authentication
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Store the user details in the reactive variable
    user.value = response.data.data;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
});

// Function to update the user details
const updateUser = async () => {
  try {
    // Prepare the payload for the PUT request
    const updatePayload = {
      name: user.value.name,
      email: user.value.email,
    };
    // If a new password has been entered, include it in the payload
    if (password.value) {
      updatePayload.password = password.value;
    }
    // Send the PUT request to update the user details
    const response = await axios.put(
      `http://localhost:8000/api/users/${user.value.id}`,
      updatePayload,
      {
        // Include the access token in the request headers for authentication
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Navigate to the user details page after successful update
    router.push(`/users/${user.value.id}`);
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
};
</script>
