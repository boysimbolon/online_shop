<template>
  <div>
    <h1>Product Details</h1>
    <div v-if="product">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
      <img width="200" :src="product.image" alt="" />
      <br />
      <router-link :to="`/product/${product.id}/edit`">Edit</router-link>
      <button @click="deleteProduct">Delete</button>
    </div>
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

const deleteProduct = async () => {
  if (confirm("Are you sure you want to delete this product?")) {
    await axios.delete(
      `http://localhost:8000/api/products/${product.value.id}`
    );
    router.push("/");
  }
};
</script>
