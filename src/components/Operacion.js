import api, { getApiErrorMessage } from '../services/api';

export async function MostrarOperacion() {
    try {
        const response = await api.get('Operacion');
        return response.data ?? [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw new Error(getApiErrorMessage(error, 'No se pudieron obtener operaciones.'));
    }
}

export async function MostrarOperacionPorCliente(clienteId) {
    try {
        const response = await api.get(`Operacion/cliente/${clienteId}`);
        return response.data ?? [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw new Error(getApiErrorMessage(error, 'No se pudieron obtener operaciones del cliente.'));
    }
}

export async function ObtenerPrecioActualCripto(criptoCode) {
    try {
        const response = await api.get(`Operacion/precio/${criptoCode}`);
        return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'No se pudo obtener el precio actual de la criptomoneda.'));
    }
}

export async function CrearOperacion(ClienteID, CriptoCode, CriptoAmount, Action) {
    try {
        const payload = {
            ClienteID,
            CriptoCode,
            CriptoAmount,
            Action,
            Datetime: new Date().toISOString()
        };
        const response = await api.post('Operacion', payload);
        return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'No se pudo crear la operación.'));
    }
}
