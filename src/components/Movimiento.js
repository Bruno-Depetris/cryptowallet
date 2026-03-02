import api from '../services/api';

export async function MostrarMovimientos() {
  try {
    return await api.get('Movimiento');
  } catch (error) {
    console.log(`Error al mostrar movimientos: ${error}`);
    return null;
  }
}
