<template>
  <div class="profile-container">
    <h2>User Profile</h2>
    <div v-if="user">
      <div class="user-info">
        <strong>Name:</strong> {{ user.name }}
      </div>
      <div class="user-info">
        <strong>Email:</strong> {{ user.email }}
      </div>
      <!-- Agrega más detalles del usuario según sea necesario -->
    </div>
    <button @click="logout" v-if="user">Log out</button>
    <button @click="login" v-else>Log in</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      localStorage.clear();
      router.push('/');
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
  },
  mounted() {
    if (!this.user && localStorage.getItem('nombre')) {
      // Usuario no autenticado, redirige al inicio de sesión
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
