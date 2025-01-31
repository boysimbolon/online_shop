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
    <h1 class="text-3xl font-bold mb-4">User Details</h1>
    <!-- A container to display user details -->
    <div class="bg-white rounded-lg p-4 shadow-md" v-if="user">
      <!-- User name -->
      <h3 class="text-xl font-bold mb-2">{{ user.name }}</h3>
      <!-- User email -->
      <p class="text-gray-500 text-sm mb-2">{{ user.email }}</p>
      <!-- Buttons to edit or delete the user -->
      <div class="flex justify-between">
        <!-- Edit button -->
        <router-link
          :to="`/users/${user.id}/edit`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >Edit</router-link
        >
        <!-- Delete button -->
        <button
          @click="deleteUser"
          class="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<!-- Script section -->
<script setup>
// Import required dependencies
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

// Get the router and route instances
const router = useRouter();
const route = useRoute();

// Define a reactive variable to store the user details
const user = ref(null);

// Function to go back to the previous page
const goBack = () => {
  router.go(-1);
};

// Function to fetch the user details on page load
onMounted(async () => {
  try {
    // Send a GET request to the API to fetch the user details
    const response = await axios.get(
      `https://meonlineshop.rf.gd/api/users/${route.params.id}`,
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

// Function to delete the user
const deleteUser = async () => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      // Send a DELETE request to the API to delete the user
      await axios.delete(`https://meonlineshop.rf.gd/api/users/${user.value.id}`, {
        // Include the access token in the request headers for authentication
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      // Navigate to the user list page
      router.push("/users");
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  }
};
</script>

<!-- No style required -->
<style></style>
