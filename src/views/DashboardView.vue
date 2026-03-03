<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Dashboard por cliente</h2>
      <label>Cliente</label>
      <select v-model.number="clienteID">
        <option disabled value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.clienteID" :value="cliente.clienteID">
          {{ cliente.nombre }} ({{ cliente.email }})
        </option>
      </select>

      <button type="button" @click="cargarDashboard" :disabled="cargando">Consultar</button>
      <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
    </section>

    <section class="card" v-if="dashboard">
      <h2 class="title">Resumen</h2>
      <p><strong>Cliente ID:</strong> {{ dashboard.clienteID }}</p>
      <p><strong>Total money:</strong> ${{ Number(dashboard.totalMoney || 0).toLocaleString('es-AR') }}</p>

      <p v-if="!(dashboard.items || []).length" class="muted">El cliente no tiene tenencias netas.</p>

      <table>
        <thead>
          <tr>
            <th>Cripto</th>
            <th>Cantidad</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dashboard.items || []" :key="item.criptoCode">
            <td>{{ item.criptoCode }}</td>
            <td>{{ Number(item.cantidad || 0).toFixed(6) }}</td>
            <td>${{ Number(item.money || 0).toLocaleString('es-AR') }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarClientes } from '@/components/Cliente';
import { ObtenerDashboardPorCliente } from '@/components/Dashboard';

const clientes = ref([]);
const clienteID = ref(null);
const dashboard = ref(null);
const cargando = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('ok');

onMounted(cargarClientes);

async function cargarClientes() {
  try {
    clientes.value = await MostrarClientes();
  } catch (error) {
    clientes.value = [];
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  }
}

async function cargarDashboard() {
  if (!clienteID.value) {
    mensaje.value = 'Seleccione un cliente.';
    mensajeTipo.value = 'error';
    return;
  }

  try {
    cargando.value = true;
    mensaje.value = '';

    const data = await ObtenerDashboardPorCliente(Number(clienteID.value));
    if (!data) {
      dashboard.value = null;
      mensaje.value = 'No hay datos para ese cliente.';
      mensajeTipo.value = 'error';
      return;
    }

    dashboard.value = data;
  } catch (error) {
    dashboard.value = null;
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
  }
}
</script>

<style scoped>
</style>
