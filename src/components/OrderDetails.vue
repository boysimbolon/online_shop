<template>
  <!-- Render a section containing order details if there is an order object -->
  <div class="p-4" v-if="order">
    <!-- Button to navigate back to previous page -->
    <button
      class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
      @click="goBack"
    >
      &larr; Back
    </button>
    <!-- Title displaying the user's name and the order details -->
    <h1 class="text-3xl font-bold mb-4">
      {{ order.user.name }}'s Order Details
    </h1>
    <!-- Render the product name for the order -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Product:</label>
      <p class="text-gray-700 font-semibold">{{ order.product.name }}</p>
    </div>
    <!-- Render the quantity for the order -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Quantity:</label>
      <p class="text-gray-700 font-semibold">{{ order.quantity }}</p>
    </div>
    <!-- Render the total price for the order -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Total Price:</label>
      <p class="text-gray-700 font-semibold">
        ${{ toFixed(order.total_price) }}
      </p>
    </div>
    <!-- Render the status of the order -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Status:</label>
      <p class="text-gray-700 font-semibold">{{ order.status }}</p>
    </div>
    <!-- Render edit and delete buttons for the order -->
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'orderedit', params: { id: order.id } }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Edit</router-link
      >
      <button
        type="button"
        @click="deleteOrder"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

// Initialize variables for authentication, routing and order data
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const order = ref(null);

// Fetch the order data when the component is mounted
onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/orders/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  // Set the order data to the fetched data
  order.value = response.data.data;
});

// Define function to delete the current order
const deleteOrder = async () => {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      await axios.delete(
        `http://localhost:8000/api/orders/${route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      // Redirect to the orders page after deleting the order
      router.push({ name: "orderlist" });
    } catch (error) {
      console.log(error);
    }
  }
};

// Define function to format the order total price to two decimal places
const toFixed = (value, precision = 2) => {
  if (isNaN(value)) {
    return "";
  }
  return parseFloat(value).toFixed(precision);
};

// Define function to navigate back to the previous page
const goBack = () => {
  router.go(-1);
};
</script>
