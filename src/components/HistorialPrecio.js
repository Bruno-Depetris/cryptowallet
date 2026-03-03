import api, { getApiErrorMessage } from '../services/api';

export async function MostrarHistorialPrecios() {
  try {
    const response = await api.get('HistorialPrecio');
    return response.data ?? [];
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(getApiErrorMessage(error, 'No se pudo obtener el historial de precios.'));
  }
}
