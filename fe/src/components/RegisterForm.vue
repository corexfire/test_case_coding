<template>
  <div id="body" class="auth-page">
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
                    <form @submit.prevent="register" enctype="multipart/form-data">

                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" v-model="email" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" v-model="password" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label for="confirm_password" class="form-label">Confirm Password</label>
                        <input type="password" id="confirm_password" v-model="confirmPassword" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label for="foto" class="form-label">Profile Photo</label>
                        <input type="file" id="foto" ref="fotoInput" class="form-control" accept="image/*" @change="handleFileChange">
                      </div>
                      <div class="mb-3">
                        <label for="mobile_number" class="form-label">Mobile Number</label>
                        <input type="text" id="mobile_number" v-model="mobileNumber" class="form-control" required>
                      </div>
                      <div class="form-group mb-0 row">
                        <div class="col-12">
                          <div class="d-grid mt-3">
                            <button class="btn btn-primary" type="submit">Register <i class="fas fa-sign-in-alt ms-1"></i>
                            </button>
                          </div>
                        </div><!--end col-->
                      </div>

                    </form>
                    <div class="m-3 text-center text-muted">
                      <p class="mb-0">Already Have an account ?
                        <router-link to="/login" class="text-primary ms-2">Log In</router-link>
                      </p>
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
  <!--</template>-->

  <!--<template>-->
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const mobileNumber = ref('');
    const fotoInput = ref(null); // Define fotoInput ref
    const router = useRouter();

    const register = async () => {
      if (!fotoInput.value || !fotoInput.value.files[0]) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('foto', fotoInput.value.files[0]);
      formData.append('email', email.value);
      formData.append('password', password.value);
      formData.append('confirm_password', confirmPassword.value);
      formData.append('mobile_number', mobileNumber.value);

      try {
        const response = await axios.post('http://localhost:3000/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 201) {
          console.log('Registration successful:', response.data);
          await router.push('/login').then(() => { router.go(0) }); // Redirect to login page after successful registration
        } else {
          console.error('Registration failed:', response.data);
          // Handle registration failure
        }
      } catch (error) {
        console.error('Registration error:', error);
        // Handle registration error
      }
    };

    // Function to handle file change event
    const handleFileChange = (event) => {
      fotoInput.value = event.target;
    };

    // Use onMounted to access fotoInput ref after component is mounted
    onMounted(() => {
      fotoInput.value = document.getElementById('foto');
    });

    return { email, password, confirmPassword, mobileNumber, register, handleFileChange };
  }
};
</script>
<style>
.register-form-form {

  padding: 20px;

}
</style>
