import api from '../services/api'

// export async function CrearAccion(nombre){
//     try{
//         await api.post('Accion', nombre)
//         return true
//     }catch(error){
//         console.log(`error al crear una accion \n ${error}`)
//         return false
//     }
// }

// no creo usar el crear acciones sinceramente pero se agrego por si las dudas...
export async function MostrarAcciones() {
    try{
        return await api.get(`Accion`)
    }catch(error){
        console.log(`error al mostrar acciones \n ${error}`)
        return false
    }
}
