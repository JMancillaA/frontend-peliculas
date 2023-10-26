import axios from 'axios';

const BASE_URL = 'http://localhost:9955';

export default class TareasService {
  async obtenerTareasPorUsuario(idUsuario) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/tareas/${idUsuario}`);
      if (Array.isArray(response.data.result)) {
        return response.data.result; // Devuelve los datos de las tareas
      } else {
        console.error('El formato de las tareas no es válido:', response.data);
        return []; // Devuelve un arreglo vacío en caso de error
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      throw error;
    }
  }
  async crearTarea(titulo, fechaLimite, idEtiqueta, idUsuario) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/tareas`, {
        titulo: titulo,
        fechaLimite: fechaLimite,
        idEtiqueta: idEtiqueta,
        idUsuario: idUsuario,
      });

      if (response.data) {
        return response.data; // Devuelve los datos de la tarea creada
      } else {
        console.error('El formato de la respuesta no es válido:', response.data);
        throw new Error('Error al crear la tarea');
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      throw error;
    }
  }
}
