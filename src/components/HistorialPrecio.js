import api from '../services/api';

export async function MostrarHistorialPrecios() {
  try {
    return await api.get('HistorialPrecio');
  } catch (error) {
    console.log(`Error al mostrar historial de precios: ${error}`);
    return null;
  }
}
