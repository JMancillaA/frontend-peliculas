import axios from 'axios';

const BASE_URL = 'http://localhost:9955';

export default class EtiquetasService {
  async obtenerEtiquetasPorUsuario(idUsuario) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/etiquetas/${idUsuario}`);
      if (Array.isArray(response.data.result)) {
        return response.data.result; 
      } else {
        console.error('El formato de las etiquetas no es válido:', response.data);
        return []; // Devuelve un arreglo vacío en caso de error
      }
    } catch (error) {
      console.error('Error al obtener las etiquetas:', error);
      throw error;
    }
  }
  async eliminarEtiquetaPorId(etiquetaId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/etiquetas/${etiquetaId}`);
      if (response.data.code === 'SUCCESS') {
        return true;
      } else {
        console.error('Error al eliminar la etiqueta:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error al eliminar la etiqueta:', error);
      throw error;
    }
  }
  async crearEtiqueta(idUsuario) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/etiquetas/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error('Error al crear la etiqueta:', error);
      throw error;
    }
  }
  async editarEtiqueta(etiquetaId, etiquetaDto) {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/etiquetas/${etiquetaId}`, etiquetaDto);
      return response.data;
    } catch (error) {
      console.error('Error al editar la etiqueta:', error);
      throw error;
    }
  }

}
