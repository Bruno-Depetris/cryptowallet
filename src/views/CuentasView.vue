<template>
    <section class="card">
        <h2 class="title">Cuentas</h2>
        <button type="button" @click="cargarCuentas">Recargar</button>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cuenta in cuentas" :key="cuenta.cuentaID">
                    <td>{{ cuenta.cuentaID }}</td>
                    <td>{{ cuenta.cliente?.nombre || '-' }}</td>
                    <td>{{ cuenta.cliente?.email || '-' }}</td>
                    <td>{{ cuenta.estado?.estado || '-' }}</td>
                </tr>
            </tbody>
        </table>

    <NotificacionPopup ref="notificacionRef" />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MostrarCuentas } from '@/components/Cuentas';
import NotificacionPopup from '@/assets/NotificacionPopup.vue'; 

const cuentas = ref([]);
const notificacionRef = ref(null); 

onMounted(() => {
    cargarCuentas();
});

async function cargarCuentas() {
    try {
        const response = await MostrarCuentas();
                cuentas.value = response?.data || [];
    } catch (error) {
        notificacionRef.value.mostrar('Error al cargar cuentas...', 'posible falta datos'); 
        console.error('Error al cargar las cuentas:', error);
    }
}

</script>

<style scoped>
</style>