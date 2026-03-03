import api, { getApiErrorMessage } from '../services/api';

export async function ObtenerDashboardPorCliente(clienteId) {
  try {
    const response = await api.get(`Dashboard/cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw new Error(getApiErrorMessage(error, 'No se pudo obtener el dashboard del cliente.'));
  }
}
