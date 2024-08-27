// ~/stores/auth.js

import { defineStore } from '@pinia/nuxt';
import { useCookie } from 'nuxt/composables';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    async login(email) {
      try {
        const response = await fetch(`${serverUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email.value
            })
          });
      
        

        this.token = response.data.token;
        this.user = response.data.user;

        // Store JWT in a cookie
        const tokenCookie = useCookie('token');
        tokenCookie.value = response.data.token;
      } catch (error) {
        console.error('Login failed:', error);
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      const tokenCookie = useCookie('token');
      tokenCookie.value = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
