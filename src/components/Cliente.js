
import api  from "../services/api";


export async function CargarCliente(nombre, email) {
  try {
    const response = await api.post('Cliente', { nombre, email });
    await CrearCuenta(response?.data?.clienteID || response?.data?.ClienteID);
    return response?.data || true;
  } catch (error) {
    console.error("Error al cargar cliente:", error);
    return null;
  }
}

export async function MostrarClientes() {
  try{
    return await api.get('Cliente');
  }catch(error){
    return null;
  }
}

export async function EliminarCliente(id) {
  try{
    await api.delete(`Cliente/${id}`);
    return true;
  }catch(error){
    return false;
  }
}

export async function EditarCliente(id, nombre, email) {
  try {
    await api.put(`Cliente/${id}`, { clienteID: id, nombre, email });
    return true;
  } catch (error) {
    console.error('Error al editar cliente:', error);
    return false;
  }
}

export async function CrearCuenta(clienteID) {
  try {
    const estadoId = 1;

    if (!clienteID) {
      console.error("No se encontró ID de cliente para crear la cuenta.");
      return false;
    }

    await api.post('Cuenta', { clienteID, estadoID: estadoId });

    return true;

  } catch (error) {
    console.log("Error al crear la cuenta:", error.response?.data || error);
    return false;
  }
}


