<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    // Check if token exists in local storage upon component mount
    if (localStorage.getItem('token')) {
      isLoggedIn.value = true;
    }

    // Watch route changes and update isLoggedIn accordingly
    router.beforeEach((to, from, next) => {
      if (to.path === '/login' || to.path === '/register') {
        if (isLoggedIn.value) {
          next('/dashboard');
        } else {
          next();
        }
      } else if (to.path === '/dashboard') {
        if (!isLoggedIn.value) {
          next('/login');
        } else {
          next();
        }
      } else {
        next();
      }
    });


    return {isLoggedIn};
  }

};
</script>
<style>
/* Add CSS styling for the login form */
.login-form {
  max-width: 400px;
  margin: auto;
  //border: 1px solid #ccc;
  border-radius: 5px;
}
.auth-header {
  background-color: #232a3e;
}
.text-muted {
  --bs-text-opacity: 1;
  color: #7081b9 !important;
}
</style>
