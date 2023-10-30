<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Bienvenid@!</div>
            </div>
            <div>
              <label for="usuario" class="block text-900 text-xl font-medium mb-2">Usuario</label>
              <InputText v-model="usuario" id="usuario" type="text" placeholder="Usuario" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
              <label for="contrasena" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
              <InputText v-model="contrasena" id="contrasena" type="password" placeholder="********" class="w-full mb-3" style="padding: 1rem"></InputText>
              <Button label="Log In" class="w-full p-3 text-xl" @click="login"></Button>
              <p v-if="error" class="text-red-500 mt-2">Error en Usuario o contraseña ingresados.</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UsuarioService from '@/service/UsuarioService.js';

  export default {
    data() {
      return {
        usuario: '',
        contrasena: '',
        error: false,
      };
    },
    methods: {
      async login() {
        try {
          const response = await UsuarioService.login(this.usuario, this.contrasena);
          console.log('Respuesta del servidor:', response);
          localStorage.setItem('nombre', this.usuario);
          this.$router.push({ name: 'listadepelis', query: { id: response.id } });
        } catch (error) {
          console.error('Error en el inicio de sesión:', error);
          this.error = true;
        }
      },
    },
    created() {

    }
  };
  </script>
  