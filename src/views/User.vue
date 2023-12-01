<template>
  <div class="profile-container">
    <h2>User Profile</h2>
    <div v-if="localStorageHasInfo">
      <div class="user-info">
        <strong>Name:</strong> {{ localStorage.nombre }}
      </div>
      <div class="user-info">
        <strong>Email:</strong> {{ localStorage.email }}
      </div>
    </div>
    <div v-if="user">
      <div class="user-info">
        <strong>Name:</strong> {{ user.name }}
      </div>
      <div class="user-info">
        <strong>Email:</strong> {{ user.email }}
      </div>
    </div>
    <button @click="logout()">Log out</button>
  </div>
</template>

<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    data() {
      return {
        user: this.$auth0.user,
        localStorage: {
          nombre: localStorage.getItem('nombre'),
          email: localStorage.getItem('email'),
        },
      };
    },
    computed: {
      localStorageHasInfo() {
        return this.localStorage.nombre && this.localStorage.email;
      },
    },
    setup() {
      const { logout } = useAuth0();
      const nombre = localStorage.getItem('nombre');
      const email = localStorage.getItem('email');
      return {
        logout: () => {
          localStorage.clear();
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      };
    },
    mounted() {
    if (localStorage.getItem('nombre')) {
      this.error = true;
    } else {
      this.$router.push("/login");
    }
  },
  };
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.user-info {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
