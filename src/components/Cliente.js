import api, { getApiErrorMessage } from '../services/api';

export async function MostrarClientes() {
  try {
    const response = await api.get('Cliente');
    return response.data ?? [];
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(getApiErrorMessage(error, 'No se pudo obtener clientes.'));
  }
}

export async function CargarCliente(nombre, email) {
  try {
    const response = await api.post('Cliente', { nombre, email });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'No se pudo crear el cliente.'));
  }
}

export async function EditarCliente(id, nombre, email) {
  try {
    await api.put(`Cliente/${id}`, { clienteID: id, nombre, email });
    return true;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'No se pudo actualizar el cliente.'));
  }
}

export async function EliminarCliente(id) {
  try {
    await api.delete(`Cliente/${id}`);
    return true;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'No se pudo eliminar el cliente.'));
  }
}


