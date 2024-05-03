<template>
  <div id="body" class="auth-page"
       :style="'background-image: url(' + backgroundImage + '); background-size: cover; background-position: center center;'">
    <!-- Log In page -->
    <div class="container-md">
      <div class="row vh-100 d-flex justify-content-center">
        <div class="col-12 align-self-center">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4 mx-auto">
                <div class="card">
                  <div class="card-body p-0 auth-header-box">
                    <div class="text-center p-3">
                      <p class="text-muted  mb-0">Sign in to continue</p>
                    </div>
                  </div>

                  <div class="card-body pt-0">
                    <ul class="nav">
                      <li class="nav-item">
                        <router-link to="/login" class="nav-link" :class="{ active: activeTab === 'login' }">Login
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link to="/register" class="nav-link" :class="{ active: activeTab === 'register' }">
                          Register
                        </router-link>
                      </li>
                    </ul>
                    <form class="my-4" @submit.prevent="login">
                      <div class="form-group mb-2">
                        <label class="form-label" for="email">Email</label>
                        <input v-model="email" type="text" class="form-control" id="email" name="email"
                               placeholder="Enter email">
                      </div><!--end form-group-->

                      <div class="form-group">
                        <label class="form-label" for="userpassword">Password</label>
                        <input v-model="password" type="password" class="form-control" name="password" id="userpassword"
                               placeholder="Enter password">
                      </div><!--end form-group-->

                      <div class="form-group row mt-3">
                        <div class="col-sm-6">
                          <div class="form-check form-switch form-switch-success">
                            <input v-model="rememberMe" class="form-check-input" type="checkbox"
                                   id="customSwitchSuccess">
                            <label class="form-check-label" for="customSwitchSuccess">Remember me</label>
                          </div>
                        </div><!--end col-->
                        <div class="col-sm-6 text-end">
                          <router-link to="/auth-recover-pw" class="text-muted font-13"><i class="dripicons-lock"></i>
                            Forgot password?
                          </router-link>
                        </div><!--end col-->
                      </div><!--end form-group-->

                      <div class="form-group mb-0 row">
                        <div class="col-12">
                          <div class="d-grid mt-3">
                            <button class="btn btn-primary" type="submit">Log In <i class="fas fa-sign-in-alt ms-1"></i>
                            </button>
                          </div>
                        </div><!--end col-->
                      </div> <!--end form-group-->
                    </form><!--end form-->

                    <hr class="hr-dashed mt-4">
                    <div class="text-center mt-n5">
                      <h6 class="card-bg px-3 my-4 d-inline-block">Or Login With</h6>
                    </div>
                    <div class="d-flex justify-content-center mb-1">
                      <a href=""
                         class="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                        <i class="fab fa-facebook align-self-center"></i>
                      </a>
                      <a href=""
                         class="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                        <i class="fab fa-twitter align-self-center"></i>
                      </a>
                      <a href=""
                         class="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                        <i class="fab fa-google align-self-center"></i>
                      </a>
                    </div>
                    <div v-if="errorMessage" class="modal fade show" id="errorModal" tabindex="-1" role="dialog"
                         aria-labelledby="errorModalLabel" style="display: block; background: rgba(0, 0, 0, 0.5);">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="errorModalLabel">Login Error</h5>

                          </div>
                          <div class="modal-body">
                            <p>{{ errorMessage }}</p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="errorMessage = ''">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!--end card-body-->
                </div><!--end card-->
              </div><!--end col-->
            </div><!--end row-->
          </div><!--end card-body-->
        </div><!--end col-->
      </div><!--end row-->
    </div><!--end container-->
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const errorMessage = ref('');

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: email.value,
          password: password.value
        });
        errorMessage.value = '';
        // Assuming the server returns a token upon successful login
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in local storage
        console.log('Login successful:', response.data);
        // Redirect to dashboard after successful login
        await router.push('/dashboard').then(() => { router.go(0) });
      } catch (error) {
        console.error('Login error:', error);
        // Set error message
        errorMessage.value = 'Invalid email or password. Please try again.';
      }
    };

    return { email, password, login, errorMessage };
  }
};
</script>

<style>
/* Add CSS styling for the login form */
</style>
