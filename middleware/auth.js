export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');

  // Redirect to login if no token is found
  if (!token.value && to.path !== '/auth/login') {
    return navigateTo('/auth/login');
  }

  // Prevent logged-in users from accessing the login page again
  if (token.value && to.path === '/auth/login') {
    return navigateTo('/');
  }
});
