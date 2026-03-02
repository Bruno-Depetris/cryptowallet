<template>
  <section class="card">
    <h2 class="title">Historial de precios</h2>
    <button type="button" @click="cargarHistorial">Recargar</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cripto</th>
          <th>Precio</th>
          <th>Fecha</th>
          <th>Fuente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historial" :key="item.historialID">
          <td>{{ item.historialID }}</td>
          <td>{{ item.criptoCode }}</td>
          <td>${{ Number(item.precio || 0).toLocaleString('es-AR') }}</td>
          <td>{{ formatearFecha(item.fecha) }}</td>
          <td>{{ item.fuente || '-' }}</td>
        </tr>
      </tbody>
    </table>

    <NotificacionPopup ref="notificacionRef" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarHistorialPrecios } from '@/components/HistorialPrecio';
import NotificacionPopup from '@/assets/NotificacionPopup.vue';

const historial = ref([]);
const notificacionRef = ref(null);

onMounted(cargarHistorial);

async function cargarHistorial() {
  const response = await MostrarHistorialPrecios();
  if (response?.data) {
    historial.value = response.data;
  } else {
    historial.value = [];
    notificacionRef.value?.mostrar('Sin datos', 'No se encontró historial de precios.');
  }
}

function formatearFecha(fecha) {
  if (!fecha) {
    return '-';
  }
  return new Date(fecha).toLocaleString('es-AR');
}
</script>

<style scoped>
</style>
