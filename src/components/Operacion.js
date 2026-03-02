import api from '../services/api'


export async function CrearOperacion(ClienteID, CriptoCode, CriptoAmount, Action) {
    try{
        const payload = {
            ClienteID,
            CriptoCode,
            CriptoAmount,
            Action,
            Datetime: new Date().toISOString()
        };
        const response = await api.post('Operacion', payload)
        return response?.data || true;
    }catch(error){
        console.log(`Error al cargar la operacion \n ${error}`);    
        return null;
    }
}

export async function MostrarOperacion(){
    try{
        return await api.get('Operacion')

    }catch(error){
        console.log(`Error al mostrar operaciones \n datos del error : \n ${error}`);
        return null;
    }
}

export async function MostrarOperacionPorCliente(clienteId){
    try{
        return await api.get(`Operacion/cliente/${clienteId}`)
    }catch(error){
        console.log(`Error al mostrar operaciones por cliente \n ${error}`);
        return null;
    }
}
