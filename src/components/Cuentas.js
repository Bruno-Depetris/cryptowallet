
import api from "../services/api"


export async function CrearCuenta(clienteID, estadoID = 1) {
    try{
        const response = await api.post('Cuenta', { clienteID, estadoID });
        return response?.data || true;
    }catch(error){
        console.log(`Error al crear la cuenta: ${error}`);
        return false;
    }
}


export async function MostrarCuentas() {
    try{
        return await api.get('Cuenta')
    }catch(error){
        console.log(`Error al mostrar las cuentas: \n ${error}`)
        return null;
    }
    
}

export async function EliminarCuenta(id){
    try{
        await api.delete(`Cuenta/${id}`);
        return true;
    }catch(error){
        console.log(`Error al eliminar una cuenta ${error}`);
        return false;
    }

}
