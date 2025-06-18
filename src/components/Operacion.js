import api from '../services/api'


export async function CrearOperacion(CuentaID, CriptoCode, Cantidad, Fecha, AccionID, MontoARS) {
    try{
        await api.post('Operacion', {CuentaID, CriptoCode, Cantidad, Fecha, AccionID, MontoARS})
        return true;
    }catch(error){
        console.log(`Error al cargar la operacion \n ${error}`);    
    }
}

