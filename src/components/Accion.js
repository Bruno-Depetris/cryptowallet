import api, { getApiErrorMessage } from '../services/api';

export async function MostrarAcciones() {
    try {
        const response = await api.get('Accion');
        return response.data ?? [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw new Error(getApiErrorMessage(error, 'No se pudieron obtener acciones.'));
    }
}
