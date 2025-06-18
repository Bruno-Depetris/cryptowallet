
import api from "../services/api"
import { MostrarClientes } from "./Cliente";


export async function CrearCuenta(cliId, EstadoId) {
    try{
        await api.post('Cuenta', cliId, EstadoId);

    }catch(error){
        var nombre = "";
        await MostrarClientes.forEach(cliente => {
            if(cliente.clienteID === cliId){
                nombre = cliente.nombre;
            }
        });
        console.log(`Error al crear la cuenta para el cliente ${nombre}`);

        return false;
    }
}


export async function MostrarCuentas() {
    try{
        return await api.get('Cuenta')
    }catch(error){
        console.log(`Error al mostrar las cuentas: \n ${error}`)
    }
    
}

export async function EliminarCuenta(id){
    try{
        await api.delete(`Cuenta/${id}}`);
        return true;
    }catch(error){
        console.log(`Error al eliminar una cuenta ${error}`);
    }

}
