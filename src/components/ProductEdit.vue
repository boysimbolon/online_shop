<template>
  <div>
    <h1>Edit Product</h1>
    <form v-if="product" @submit.prevent="updateProduct">
      <label>Name:</label>
      <input v-model="product.name" type="text" />
      <br />
      <label>Description:</label>
      <input v-model="product.description" type="text" />
      <br />
      <label>Price:</label>
      <input v-model="product.price" type="number" step="0.01" />
      <br />
      <label>Image URL:</label>
      <input v-model="product.image" type="text" />
      <br />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/api/products/${route.params.id}`
  );
  product.value = response.data.data;
});

const updateProduct = async () => {
  await axios.put(`http://localhost:8000/api/products/${product.value.id}`, {
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    image: product.value.image,
  });
  router.push(`/product/${product.value.id}`);
};
</script>
