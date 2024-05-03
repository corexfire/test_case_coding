<template>
  <div class="admin-dashboard">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Admin Dashboard</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <button @click="logout" class="btn btn-danger">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">

      <div class="row">
        <div class="col-md-3">
          <!-- Sidebar -->
          <div class="sidebar">
            <h4>Sidebar</h4>
            <!-- Add your sidebar content here -->
          </div>
        </div>
        <div class="col-md-9">
          <!-- Main Content -->
          <div class="main-content">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Data Tables </h4>
                  </div><!--end card-header-->
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table" >
                        <thead class="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Photo</th>
                          <th>Mobile Number</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in userData" :key="user.id">
                          <td>{{ user.id }}</td>
                          <td>{{ user.email }}</td>
                          <td>
                            <img :src="getImageSrc(user.foto)" alt="User Photo" class="user-photo">
                          </td>
                          <td>{{ user.mobile_number }}</td>

                        </tr>


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> <!-- end col -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userData = ref([]);
    const router = useRouter();

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/auth/users', {
          headers: { Authorization: token }
        });
        userData.value = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getImageSrc = (foto) => {
      if (!foto) return ''; // Return empty string if foto is not provided
      const arrayBufferView = new Uint8Array(foto.data); // Assuming foto is a Blob object
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' }); // Create a blob from the array buffer
      const imageUrl = URL.createObjectURL(blob); // Create a URL for the blob
      return imageUrl;
    };

    const logout = async () => {
      localStorage.removeItem('token');
      await router.push('/login').then(() => { router.go(0) });
    };

    onMounted(() => {
      fetchUserData();
    });

    return { userData, logout, getImageSrc };
  },
};
</script>

<style scoped>
/* Add CSS styling for the admin dashboard */
.admin-dashboard {
  min-height: 100vh;
}

/* Sidebar styles */
.sidebar {
  background-color: #f8f9fa;
  padding: 20px;
}

/* Main content styles */
.main-content {
  padding: 20px;
}

.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
