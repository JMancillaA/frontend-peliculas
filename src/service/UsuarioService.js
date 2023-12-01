import axios from 'axios';

const BASE_URL = 'http://localhost:9955';

export default class UsuarioService {
  static async login(usuario, contrasena) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, {
        usuario: usuario,
        contra: contrasena,
      });
      const responseData = response.data.result;
      if (responseData) {
        // Si la respuesta tiene un resultado válido, devolvemos el ID del usuario
        return responseData.id;
      } else {
        throw new Error('Respuesta de inicio de sesión inválida');
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      throw error;
    }
  }

  static async register(nombre, contrasena, email, pais, fechaNacimiento) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register`, {
        nombre: nombre,
        contra: contrasena,
        email: email,
        pais: pais,
        fechaNacimiento: fechaNacimiento,
      });
      return response.data; // Puedes manejar la respuesta según tu necesidad
    } catch (error) {
      console.error('Error en la solicitud de registro de usuario:', error);
      throw error;
    }
  }
  
}
