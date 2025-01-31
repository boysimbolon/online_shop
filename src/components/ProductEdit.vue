<!-- The template for the edit product page -->
<template>
  <div class="p-4">
    <div class="mb-4">
      <!-- A button that links back to the home page -->
      <router-link
        to="/"
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4"
        >&larr; Back</router-link
      >
    </div>
    <!-- The title of the page -->
    <h1 class="text-3xl font-bold mb-4">Edit Product</h1>
    <!-- A form that allows the user to edit the product -->
    <form
      class="flex flex-col space-y-4"
      v-if="product"
      @submit.prevent="updateProduct"
    >
      <!-- A label and input field for the product name -->
      <label class="text-lg font-semibold" for="name">Name:</label>
      <input
        class="border rounded-md p-2"
        v-model="product.name"
        type="text"
        id="name"
      />
      <!-- A label and input field for the product description -->
      <label class="text-lg font-semibold" for="description"
        >Description:</label
      >
      <input
        class="border rounded-md p-2"
        v-model="product.description"
        type="text"
        id="description"
      />
      <!-- A label and input field for the product price -->
      <label class="text-lg font-semibold" for="price">Price:</label>
      <input
        class="border rounded-md p-2"
        v-model="product.price"
        type="number"
        step="0.01"
        id="price"
      />
      <!-- A label and input field for the product image URL -->
      <label class="text-lg font-semibold" for="image">Image URL:</label>
      <input
        class="border rounded-md p-2"
        v-model="product.image"
        type="text"
        id="image"
      />
      <!-- A button that saves the changes made to the product -->
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>

<script setup>
// Import necessary modules and functions
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Create variables using the imported functions and modules
const router = useRouter();
const route = useRoute();
const product = ref(null);
const authStore = useAuthStore();

// A lifecycle hook that is triggered when the component is mounted
onMounted(async () => {
  // Send a GET request to retrieve the product with the specified ID
  const response = await axios.get(
    `https://meonlineshop.rf.gd/api/products/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  // Set the product variable to the retrieved product data
  product.value = response.data.data;
});

// A function that sends a PUT request to update the product with the edited data
const updateProduct = async () => {
  await axios.put(
    `https://meonlineshop.rf.gd/api/products/${product.value.id}`,
    {
      name: product.value.name,
      description: product.value.description,
      price: product.value.price,
      image: product.value.image,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }
  );
  // Redirect the user to the product page after the product has been updated
  router.push(`/product/${product.value.id}`);
};
</script>
