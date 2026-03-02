<template>
  <section class="card">
    <h2 class="title">Movimientos</h2>
    <button type="button" @click="cargarMovimientos">Recargar</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>OperacionID</th>
          <th>Cripto</th>
          <th>Cantidad</th>
          <th>Estado billetera</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movimiento in movimientos" :key="movimiento.movimientoID">
          <td>{{ movimiento.movimientoID }}</td>
          <td>{{ movimiento.operacionID }}</td>
          <td>{{ movimiento.criptoCode }}</td>
          <td>{{ Number(movimiento.cantidadCripto || 0).toFixed(6) }}</td>
          <td>{{ Number(movimiento.estadoBilletera || 0).toFixed(6) }}</td>
          <td>{{ formatearFecha(movimiento.fecha) }}</td>
        </tr>
      </tbody>
    </table>

    <NotificacionPopup ref="notificacionRef" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarMovimientos } from '@/components/Movimiento';
import NotificacionPopup from '@/assets/NotificacionPopup.vue';

const movimientos = ref([]);
const notificacionRef = ref(null);

onMounted(cargarMovimientos);

async function cargarMovimientos() {
  const response = await MostrarMovimientos();
  if (response?.data) {
    movimientos.value = response.data;
  } else {
    movimientos.value = [];
    notificacionRef.value?.mostrar('Sin datos', 'No se encontraron movimientos.');
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
