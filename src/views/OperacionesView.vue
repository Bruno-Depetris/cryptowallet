<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Nueva operación</h2>
      <form @submit.prevent="crearOperacion">
        <label>Cliente</label>
        <select v-model.number="form.clienteID" required>
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
          <option value="purchase">purchase</option>
          <option value="sale">sale</option>
        </select>

        <button type="submit" :disabled="cargando">Crear operación</button>
      </form>

      <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
    </section>

    <section class="card">
      <div class="toolbar">
        <h2 class="title">Operaciones</h2>
        <button type="button" class="secondary" @click="cargarOperaciones" :disabled="cargando">Recargar</button>
      </div>

      <label>Filtrar por cliente ID (opcional)</label>
      <input v-model.number="filtroClienteId" type="number" min="1" placeholder="Ej: 1" />
      <button type="button" class="secondary" @click="aplicarFiltro" :disabled="cargando">Aplicar filtro</button>
      <button type="button" class="secondary" @click="limpiarFiltro" :disabled="cargando">Limpiar filtro</button>

      <p v-if="!operaciones.length" class="muted">No hay operaciones para mostrar.</p>

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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { CrearOperacion, MostrarOperacion, MostrarOperacionPorCliente } from '../components/Operacion';
import { MostrarClientes } from '../components/Cliente';
import { MostrarCriptos } from '../components/Criptos';

const clientes = ref([]);
const operaciones = ref([]);
const codigosCripto = ref([]);
const cargando = ref(false);
const filtroClienteId = ref(null);
const mensaje = ref('');
const mensajeTipo = ref('ok');

const form = ref({
  clienteID: null,
  criptoCode: '',
  criptoAmount: null,
  action: ''
});

onMounted(async () => {
  await Promise.all([cargarClientes(), cargarCriptos(), cargarOperaciones()]);
});

async function cargarClientes() {
  try {
    clientes.value = await MostrarClientes();
  } catch (error) {
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  }
}

async function cargarCriptos() {
  try {
    const data = await MostrarCriptos();
    codigosCripto.value = data.map((cripto) => cripto.criptoCode);
    if (codigosCripto.value.length === 0) {
      codigosCripto.value = ['BTC', 'ETH', 'USDT', 'SOL', 'ADA', 'XRP'];
    }
  } catch (error) {
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
    codigosCripto.value = ['BTC', 'ETH', 'USDT', 'SOL', 'ADA', 'XRP'];
  }
}

async function cargarOperaciones() {
  try {
    cargando.value = true;
    operaciones.value = await MostrarOperacion();
  } catch (error) {
    operaciones.value = [];
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
  }
}

async function aplicarFiltro() {
  if (!filtroClienteId.value) {
    await cargarOperaciones();
    return;
  }

  try {
    cargando.value = true;
    operaciones.value = await MostrarOperacionPorCliente(Number(filtroClienteId.value));
  } catch (error) {
    operaciones.value = [];
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
  }
}

async function limpiarFiltro() {
  filtroClienteId.value = null;
  await cargarOperaciones();
}

async function crearOperacion() {
  if (!form.value.clienteID || !form.value.criptoCode || !form.value.criptoAmount || !form.value.action) {
    mensaje.value = 'Completá todos los campos.';
    mensajeTipo.value = 'error';
    return;
  }

  try {
    cargando.value = true;
    mensaje.value = '';

    await CrearOperacion(
      Number(form.value.clienteID),
      form.value.criptoCode,
      Number(form.value.criptoAmount),
      form.value.action
    );

    mensaje.value = 'Operación creada correctamente.';
    mensajeTipo.value = 'ok';
    form.value = {
      clienteID: null,
      criptoCode: '',
      criptoAmount: null,
      action: ''
    };

    await aplicarFiltro();
  } catch (error) {
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
