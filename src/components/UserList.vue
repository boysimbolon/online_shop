<template>
  <!-- A container with flexbox layout to align the heading and create button -->
  <div class="p-4 flex justify-between items-center">
    <!-- A heading to indicate the purpose of the page -->
    <h1 class="text-3xl font-bold flex-1">User List</h1>
    <!-- A button to create a new user -->
    <router-link
      to="/users/create"
      class="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 transition-colors"
      >Create a new user</router-link
    >
  </div>
  <!-- A grid layout to display the list of users -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <!-- A card for each user in the list -->
    <div
      v-for="user in users"
      :key="user.id"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div class="p-4">
        <!-- User name -->
        <h3 class="text-xl font-bold mb-2">{{ user.name }}</h3>
        <!-- User email -->
        <p class="text-gray-700">{{ user.email }}</p>
        <!-- Button to view user details -->
        <router-link
          :to="'/users/' + user.id"
          class="block mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 transition-colors"
          >Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<!-- Script section -->
<script setup>
// Import required dependencies
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

// Get the authentication store instance
const authStore = useAuthStore();

// Define a reactive variable to store the list of users
const users = ref([]);

// Function to fetch the list of users from the API
const getUsers = async () => {
  try {
    // Send a GET request to the API to fetch the list of users
    const response = await axios.get("https://meonlineshop.rf.gd/api/users", {
      // Include the access token in the request headers for authentication
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Store the list of users in the reactive variable
    users.value = response.data.data;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
};

// Fetch the list of users on page load
onMounted(getUsers);
</script>
