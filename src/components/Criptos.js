import api, { getApiErrorMessage } from '../services/api';

export async function MostrarCriptos() {
	try {
		const response = await api.get('Cripto');
		return response.data ?? [];
	} catch (error) {
		if (error.response?.status === 404) {
			return [];
		}
		throw new Error(getApiErrorMessage(error, 'No se pudieron obtener criptomonedas.'));
	}
}
