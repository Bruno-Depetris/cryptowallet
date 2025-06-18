<template>
    <router-link to="/" class="volver-atras">
        <span class="icon">📄</span>
        <span>HOME</span>
    </router-link>
        <h1>Cuentas</h1>
        <div class="contenedor-cuentas">
                <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cuenta in cuentas" :key="cuenta.id">
                    <td>{{ cuenta.cuentaID }}</td>
                    <td>{{ cuenta.cliente.nombre }} - {{ cuenta.cliente.email }}</td>
                    <td>{{ cuenta.estado.estado }}</td>
                </tr>
            </tbody>
  
        </table>
        
        </div>

    
    <div>
    <!-- ✅ Asegurate de tener esta línea -->
    
    <NotificacionPopup ref="notificacionRef" />

    <!-- Tu código... -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MostrarCuentas } from '@/components/Cuentas';
import NotificacionPopup from '@/assets/NotificacionPopup.vue'; 
const cuentas = ref([]);
const notificacionRef = ref(null); 
onMounted(async () => {
    try {
        const response = await MostrarCuentas();
        cuentas.value = response.data
        console.log(`cuentas = ${response.data}`)
    } catch (error) {
        notificacionRef.value.mostrar('Error al cargar cuentas...', 'posible falta datos'); 
        console.error('Error al cargar las cuentas:', error);
    }
});




</script>

<style>
body{
    text-align: center;
    align-items: center;

}
.contenedor-cuentas {

    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border:1px solid black;
}
h1 {
    color: #333;
    font-size: 50px;
    margin-bottom: 20px;        
}
table {
    width: 100%;
    border-collapse: collapse;      
}
th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;  
}
th {
    background-color: #f2f2f2;  
    color: #555;
}
td {    
    color: #666;
}
tr:nth-child(even) {
    background-color: #f9f9f9;
}
tr:hover {
    background-color: #f1f1f1;
}   
tr {
    transition: background-color 0.3s ease;
}
.volver-atras {
  text-decoration: none ;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #f3f4f6;
  color: #1e293b;
  padding: 10px 20px;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.volver-atras:hover {
  background-color: #e5e7eb;
  color: #111827;
  cursor: pointer;
}
.volver-atras .icon {
  margin-right: 8px;
  font-size: 1.2rem;
}
.volver-atras span {
  font-size: 1.1rem;
  font-weight: 500;
}   

@media (max-width: 600px) {
    .volver-atras {
        position: fixed;
        top: 10px;
        left: 10px;
        padding: 8px 16px;
        font-size: 0.9rem;
    }
    .contenedor-cuentas {
        padding: 15px;
    }
    h1 {
        font-size: 20px;
    }
    th, td {
        padding: 10px;
    }
}


</style>