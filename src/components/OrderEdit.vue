<template>
  <div class="p-4">
    <!-- Back button to go back to the previous page -->
    <button
      class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
      @click="goBack"
    >
      &larr; Back
    </button>
    <!-- Title of the page -->
    <h1 class="text-3xl font-bold mb-4">Edit Order</h1>
    <!-- Form for editing the order -->
    <form @submit.prevent="updateOrder" v-if="order">
      <!-- Select input for choosing the user associated with the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="user_id"
          >User:</label
        >
        <div class="relative">
          <select
            v-model="form.user_id"
            id="user_id"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a user</option>
            <!-- Loop through the list of users and display them as options -->
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <!-- Arrow icon for the select input -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M14.707 6.293a1 1 0 00-1.414 0L10 9.586 6.707 6.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
              />
            </svg>
          </div>
        </div>
        <!-- Display errors related to the user select input -->
        <p v-if="formErrors.user_id" class="text-red-500 text-sm mt-1">
          {{ formErrors.user_id[0] }}
        </p>
      </div>
      <!-- Select input for choosing the product associated with the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="product_id"
          >Product:</label
        >
        <div class="relative">
          <select
            v-model="form.product_id"
            @change="updateTotalPrice"
            id="product_id"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a product</option>
            <!-- Loop through the list of products and display them as options -->
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }} - ${{ product.price }}
            </option>
          </select>
          <!-- Arrow icon for the select input -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M14.707 6.293a1 1 0 00-1.414 0L10 9.586 6.707 6.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
              />
            </svg>
          </div>
        </div>
        <!-- Display errors related to the product select input -->
        <p v-if="formErrors.product_id" class="text-red-500 text-sm mt-1">
          {{ formErrors.product_id[0] }}
        </p>
      </div>
      <!-- Input field for entering the quantity of the product -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="quantity"
          >Quantity:</label
        >
        <input
          v-model.number="form.quantity"
          type="number"
          id="quantity"
          name="quantity"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        <!-- Display errors related to the quantity input field -->
        <p v-if="formErrors.quantity" class="text-red-500 text-sm mt-1">
          {{ formErrors.quantity[0] }}
        </p>
      </div>
      <!-- Input field for entering the total price of the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="total_price"
          >Total Price:</label
        >
        <input
          v-model.number="form.total_price"
          type="number"
          id="total_price"
          name="total_price"
          step="0.01"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        <!-- Display errors related to the total price input field -->
        <p v-if="formErrors.total_price" class="text-red-500 text-sm mt-1">
          {{ formErrors.total_price[0] }}
        </p>
      </div>
      <!-- Select input for choosing the status of the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="status"
          >Status:</label
        >
        <div class="relative">
          <select
            v-model="form.status"
            id="status"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a status</option>
            <!-- Display different status options as select options -->
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
          <!-- Show error message related to the status select input -->
          <p v-if="formErrors.status" class="text-red-500 text-sm mt-1">
            {{ formErrors.status[0] }}
          </p>
        </div>
      </div>
      <!-- Buttons for submitting and canceling the changes -->
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <!-- Button for canceling the changes and returning to order details -->
        <router-link
          :to="{ name: 'orderdetail', params: { id: order.id } }"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
// Import required modules and functions
import axios from "axios";
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

// Get the authentication store, router and current route
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Define reactive variables and computed properties
const order = ref(null); // Reference for the order being edited
const form = ref({
  // Reference for the form data
  user_id: "",
  product_id: "",
  quantity: 0,
  total_price: 0,
  status: "",
});
const formErrors = ref({}); // Reference for form validation errors

// Fetch the order data on component mount
onMounted(async () => {
  // Get the ID of the order to be edited from the route parameter
  const orderId = route.params.id;

  try {
    // Fetch the order data from the API
    const response = await axios.get(
      `http://localhost:8000/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Update the order reference with the fetched data
    order.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
});

// Define a computed property to map the order data to the form object
const mappedForm = computed(() => {
  if (!order.value) {
    return form.value;
  }

  return {
    user_id: order.value.user.id,
    product_id: order.value.product.id,
    quantity: order.value.quantity,
    total_price: order.value.total_price,
    status: order.value.status,
  };
});

// Update the total price when the product selection changes
const updateTotalPrice = () => {
  // Find the selected product from the products list
  const product = products.value.find(
    (product) => product.id === Number(form.value.product_id)
  );
  // Calculate the total price based on the product price and quantity
  form.value.total_price = product.price * form.value.quantity;
};

// Update the form variable whenever the order variable changes
watch(
  () => order.value,
  () => {
    form.value = { ...mappedForm.value };
  },
  { immediate: true }
);

// Define methods for updating the order and handling form errors
async function updateOrder() {
  try {
    // Send a PUT request to update the order with the new data
    const response = await axios.put(
      `http://localhost:8000/api/orders/${order.value.id}`,
      form.value,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Update the order reference with the updated data
    order.value = response.data.data;
    // Redirect to the order list page
    router.push({ name: "orderlist" });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Handle form validation errors
      formErrors.value = error.response.data.errors;
    } else {
      console.error(error);
    }
  }
}

// Fetch the list of users and products to display in the select inputs
const users = ref([]);
const products = ref([]);

onMounted(async () => {
  try {
    // Send a GET request to the API endpoint for users and attach an authorization token to the header
    const response = await axios.get("http://localhost:8000/api/users", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Set the reactive variable `users` to the response data from the API
    users.value = response.data.data;
  } catch (error) {
    // Log an error message to the console if the request fails
    console.error(error);
  }

  try {
    // Send a GET request to the API endpoint for products and attach an authorization token to the header
    const response = await axios.get("http://localhost:8000/api/products", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    // Set the reactive variable `products` to the response data from the API
    products.value = response.data.data;
  } catch (error) {
    // Log an error message to the console if the request fails
    console.error(error);
  }
});

// Define a method to navigate back to the previous page in the browser history
const goBack = () => {
  router.go(-1);
};
</script>
