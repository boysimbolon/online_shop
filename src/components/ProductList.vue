<template>
  <div>
    <h1>Product List</h1>
    <router-link to="/create">Create a new product</router-link>

    <div v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
      <router-link :to="`/product/${product.id}`">View Details</router-link>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const products = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:8000/api/products");
  products.value = response.data.data;
});
</script>
