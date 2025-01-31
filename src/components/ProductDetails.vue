<template>
  <div class="p-4">
    <!-- Display a back button to return to the product list, and a heading for the product details -->
    <div class="mb-4">
      <router-link
        to="/"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <h1 class="text-3xl font-bold mb-4">Product Details</h1>

    <!-- Display the details of the selected product -->
    <div class="bg-white rounded-lg p-4 shadow-md" v-if="product">
      <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
      <p class="text-gray-500 text-sm mb-2">{{ product.description }}</p>
      <p class="text-gray-700 font-semibold text-lg mb-4">
        {{ product.price }}
      </p>
      <img class="mx-auto mb-4" width="200" :src="product.image" alt="" />

      <!-- Display buttons to edit or delete the product -->
      <div class="flex justify-between">
        <router-link
          :to="`/product/${product.id}/edit`"
          class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >Edit</router-link
        >
        <button
          @click="deleteProduct"
          class="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Retrieve the Vue Router and Vue Route instances
const router = useRouter();
const route = useRoute();

// Define a reactive reference to the selected product
const product = ref(null);

// Retrieve the authentication store instance from the Vuex store
const authStore = useAuthStore();

// Retrieve the product details from the API and set the product reference
onMounted(async () => {
  const response = await axios.get(
    `https://meonlineshop.rf.gd/api/products/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  product.value = response.data.data;
});

// Define a function to delete the selected product
const deleteProduct = async () => {
  // Prompt the user to confirm before deleting the product
  if (confirm("Are you sure you want to delete this product?")) {
    // Send a DELETE request to the API to delete the product
    await axios.delete(
      `https://meonlineshop.rf.gd/api/products/${product.value.id}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    // Redirect the user back to the product list
    router.push("/");
  }
};
</script>
