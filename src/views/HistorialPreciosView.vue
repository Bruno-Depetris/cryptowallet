<template>
  <section class="card">
    <div class="toolbar">
      <h2 class="title">Historial de precios</h2>
      <button type="button" class="secondary" @click="cargarHistorial" :disabled="cargando">Recargar</button>
    </div>

    <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
    <p v-if="!historial.length" class="muted">No hay historial de precios cargado.</p>

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
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarHistorialPrecios } from '@/components/HistorialPrecio';

const historial = ref([]);
const cargando = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('ok');

onMounted(cargarHistorial);

async function cargarHistorial() {
  try {
    cargando.value = true;
    historial.value = await MostrarHistorialPrecios();
  } catch (error) {
    historial.value = [];
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
