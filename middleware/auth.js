// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');
  
    // Example: Redirect if no token is found
    if (!token.value) {
      return navigateTo('/auth/login');
    }else if (token.value !=='' && to.path === '/auth/login') {
      return navigateTo('/');
    }
  });
  