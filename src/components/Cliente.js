import api  from "../services/api";


export async function CargarCliente(nombre, email) {
  try {
    await api.post('Cliente', { nombre, email });  
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

