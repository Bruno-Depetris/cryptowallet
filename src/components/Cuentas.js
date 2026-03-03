import api, { getApiErrorMessage } from '../services/api';

export async function MostrarCuentas() {
    try {
        const response = await api.get('Cuenta');
        return response.data ?? [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw new Error(getApiErrorMessage(error, 'No se pudieron obtener las cuentas.'));
    }
}

export async function CrearCuenta(clienteID, estadoID = 1) {
    try {
        const response = await api.post('Cuenta', { clienteID, estadoID });
        return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'No se pudo crear la cuenta.'));
    }
}

export async function EliminarCuenta(id) {
    try {
        await api.delete(`Cuenta/${id}`);
        return true;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'No se pudo eliminar la cuenta.'));
    }
}
