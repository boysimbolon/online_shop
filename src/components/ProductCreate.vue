<template>
  <div>
    <h1>Create Product</h1>
    <form @submit.prevent="createProduct">
      <label>Name:</label>
      <input v-model="name" type="text" />
      <br />
      <label>Description:</label>
      <input v-model="description" type="text" />
      <br />
      <label>Price:</label>
      <input v-model="price" type="number" step="0.01" />
      <br />
      <label>Image URL:</label>
      <input v-model="image" type="text" />
      <br />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const description = ref("");
const price = ref("");
const image = ref("");

const createProduct = async () => {
  await axios.post("http://localhost:8000/api/products", {
    name: name.value,
    description: description.value,
    price: price.value,
    image: image.value,
  });
  router.push("/");
};
</script>
