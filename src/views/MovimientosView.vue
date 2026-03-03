<template>
  <section class="card">
    <div class="toolbar">
      <h2 class="title">Movimientos</h2>
      <button type="button" class="secondary" @click="cargarMovimientos" :disabled="cargando">Recargar</button>
    </div>

    <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
    <p v-if="!movimientos.length" class="muted">No se encontraron movimientos.</p>

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
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarMovimientos } from '@/components/Movimiento';

const movimientos = ref([]);
const cargando = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('ok');

onMounted(cargarMovimientos);

async function cargarMovimientos() {
  try {
    cargando.value = true;
    movimientos.value = await MostrarMovimientos();
  } catch (error) {
    movimientos.value = [];
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
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
