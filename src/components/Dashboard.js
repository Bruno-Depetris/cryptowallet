import api from '../services/api';

export async function ObtenerDashboardPorCliente(clienteId) {
  try {
    return await api.get(`Dashboard/cliente/${clienteId}`);
  } catch (error) {
    console.log(`Error al obtener dashboard: ${error}`);
    return null;
  }
}
