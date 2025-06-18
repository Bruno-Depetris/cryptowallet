
import api  from "../services/api";


export async function CargarCliente(nombre, email) {
  try {
    await api.post('Cliente', { nombre, email });  
    await CrearCuenta();
    return true; 
  } catch (error) {
    console.error("Error al cargar cliente:", error);
    return false; 
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

export async function CrearCuenta() {
  try {
    const estadoId = 1;

    const clientes = await MostrarClientes();

    if (!clientes || !clientes.data || clientes.data.length === 0) {
      console.error("No hay clientes disponibles para crear la cuenta.");
      return false;
    }

    const ultimoCliente = clientes.data.at(-1); // método moderno
    const clienteId = ultimoCliente.clienteID;  // <- fijate que es con mayúscula en tu respuesta

    console.log("Enviando datos:", { clienteId, estadoId });

    await api.post('Cuenta', { clienteId, estadoId });

    return true;

  } catch (error) {
    console.log("Error al crear la cuenta:", error.response?.data || error);
    return false;
  }
}


