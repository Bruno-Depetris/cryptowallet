<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Dashboard por cliente</h2>
      <label>Cliente</label>
      <select v-model="clienteID">
        <option disabled value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.clienteID" :value="cliente.clienteID">
          {{ cliente.nombre }} ({{ cliente.email }})
        </option>
      </select>

      <button type="button" @click="cargarDashboard">Consultar</button>
    </section>

    <section class="card" v-if="dashboard">
      <h2 class="title">Resumen</h2>
      <p><strong>Cliente ID:</strong> {{ dashboard.clienteID }}</p>
      <p><strong>Total money:</strong> ${{ Number(dashboard.totalMoney || 0).toLocaleString('es-AR') }}</p>

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

    <NotificacionPopup ref="notificacionRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MostrarClientes } from '@/components/Cliente';
import { ObtenerDashboardPorCliente } from '@/components/Dashboard';
import NotificacionPopup from '@/assets/NotificacionPopup.vue';

const clientes = ref([]);
const clienteID = ref('');
const dashboard = ref(null);
const notificacionRef = ref(null);

onMounted(cargarClientes);

async function cargarClientes() {
  const response = await MostrarClientes();
  clientes.value = response?.data || [];
}

async function cargarDashboard() {
  if (!clienteID.value) {
    notificacionRef.value?.mostrar('Atención', 'Seleccione un cliente.');
    return;
  }

  const response = await ObtenerDashboardPorCliente(clienteID.value);
  if (response?.data) {
    dashboard.value = response.data;
  } else {
    dashboard.value = null;
    notificacionRef.value?.mostrar('Sin datos', 'No se encontró información para ese cliente.');
  }
}
</script>

<style scoped>
</style>
