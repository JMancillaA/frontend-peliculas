import axios from 'axios';

const BASE_URL = 'http://localhost:9955';

export async function getApiKey() {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/open`, {});
      const responseData = response.data.result;
      if (responseData) {
        return responseData;
      } else {
        throw new Error('Respuesta inválida');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }
