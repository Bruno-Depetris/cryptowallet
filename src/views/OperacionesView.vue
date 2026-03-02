<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Nueva operación</h2>
      <form @submit.prevent="crearOperacion">
        <label>Cliente</label>
        <select v-model="form.clienteID" required>
          <option disabled value="">Seleccione un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.clienteID" :value="cliente.clienteID">
            {{ cliente.nombre }} ({{ cliente.email }})
          </option>
        </select>

        <label>Criptomoneda</label>
        <select v-model="form.criptoCode" required>
          <option disabled value="">Seleccione una cripto</option>
          <option v-for="code in codigosCripto" :key="code" :value="code">{{ code }}</option>
        </select>

        <label>Cantidad cripto</label>
        <input v-model.number="form.criptoAmount" type="number" min="0" step="0.000001" required />

        <label>Acción</label>
        <select v-model="form.action" required>
          <option disabled value="">Seleccione una acción</option>
          <option v-for="accion in acciones" :key="accion.accionID" :value="accion.accion">
            {{ accion.accion }}
          </option>
        </select>

        <button type="submit">Crear operación</button>
      </form>
    </section>

    <section class="card">
      <h2 class="title">Operaciones</h2>
      <button type="button" @click="cargarOperaciones">Recargar</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ClienteID</th>
            <th>Cripto</th>
            <th>Cantidad</th>
            <th>Acción</th>
            <th>Dinero</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="op in operaciones" :key="op.operacionID">
            <td>{{ op.operacionID }}</td>
            <td>{{ op.clienteID }}</td>
            <td>{{ op.criptoCode }}</td>
            <td>{{ Number(op.criptoAmount).toFixed(6) }}</td>
            <td>{{ op.action }}</td>
            <td>${{ Number(op.money || 0).toLocaleString('es-AR') }}</td>
            <td>{{ formatearFecha(op.datetime) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <NotificacionPopup ref="notificacionRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NotificacionPopup from '../assets/NotificacionPopup.vue';
import { CrearOperacion, MostrarOperacion } from '../components/Operacion';
import { MostrarAcciones } from '../components/Accion';
import { MostrarClientes } from '../components/Cliente';

const clientes = ref([]);
const acciones = ref([]);
const operaciones = ref([]);
const notificacionRef = ref(null);
const codigosCripto = ['BTC', 'ETH', 'USDT', 'SOL', 'ADA', 'XRP'];

const form = ref({
  clienteID: '',
  criptoCode: '',
  criptoAmount: null,
  action: ''
});

onMounted(async () => {
  await cargarClientes();
  await cargarAcciones();
  await cargarOperaciones();
});

async function cargarClientes() {
  try {
    const response = await MostrarClientes();
    clientes.value = response?.data || [];
  } catch (error) {
    console.error('Error al cargar clientes:', error);
    notificacionRef.value?.mostrar?.('Error', 'No se pudo cargar la lista de clientes');
  }
}

async function cargarAcciones() {
  try{
    const response =  await MostrarAcciones();
    const data = response?.data || [];
    acciones.value = data.length > 0 ? data : [
      { accionID: 1, accion: 'purchase' },
      { accionID: 2, accion: 'sale' }
    ];
  }catch(error){
    console.error('Error al cargar acciones:', error);
    notificacionRef.value?.mostrar?.('Error', 'No se pudo cargar la lista de acciones');
  }
}

async function cargarOperaciones() {
  const response = await MostrarOperacion();
  operaciones.value = response?.data || [];
}

async function crearOperacion() {
  if (!form.value.clienteID || !form.value.criptoCode || !form.value.criptoAmount || !form.value.action) {
    notificacionRef.value?.mostrar('Error', 'Por favor complete todos los campos');
    return;
  }

  try {
    const operacionCreada = await CrearOperacion(
      Number(form.value.clienteID),
      form.value.criptoCode,
      Number(form.value.criptoAmount),
      form.value.action
    );

    if (operacionCreada) {
      notificacionRef.value?.mostrar('Operación creada', 'La operación se registró con éxito');
      form.value = {
        clienteID: '',
        criptoCode: '',
        criptoAmount: null,
        action: ''
      };
      await cargarOperaciones();
    }
  } catch (error) {
    console.error('Error al crear la operación:', error);
    notificacionRef.value?.mostrar('Error', 'No se pudo registrar la operación');
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
