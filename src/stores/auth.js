import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    accessToken: null,
  }),
  getters: {
    isLoggedIn() {
      return this.accessToken !== null;
    },
  },
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    removeAccessToken() {
      this.accessToken = null;
    },
    logout() {
      try {
        axios.post("http://localhost:8000/api/logout");
        this.removeAccessToken();
        console.log("Logout successful");
      } catch (error) {
        console.error("An error occurred during logout:", error.message);
      }
    },
  },
});
