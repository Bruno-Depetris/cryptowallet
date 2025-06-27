import api from '../services/api'


export async function CrearOperacion(CuentaID, CriptoCode, Cantidad, AccionID, MontoARS) {
    try{
        await api.post('Operacion', {CuentaID, CriptoCode, Cantidad , AccionID, MontoARS})
        return true;
    }catch(error){
        console.log(`Error al cargar la operacion \n ${error}`);    
    }
}

export async function MostrarOperacion(){
    try{
        return await api.get('Operacion')

    }catch(error){
        console.log(`Error al mostrar operaciones \n datos del error : \n ${error}`);
        return false;
    }
}
