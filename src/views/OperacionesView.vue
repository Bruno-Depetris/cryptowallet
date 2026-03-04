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

        <p class="muted" v-if="form.criptoCode && cargandoPrecio">Consultando precio actual...</p>
        <p class="muted" v-else-if="form.criptoCode && precioActual > 0">
          Precio actual {{ form.criptoCode }}: ${{ Number(precioActual).toLocaleString('es-AR') }}
        </p>

        <label>Cantidad cripto</label>
        <input v-model.number="form.criptoAmount" type="number" min="0.000001" step="0.000001" required />

        <p class="muted" v-if="montoEstimado > 0">
          Monto estimado: ${{ Number(montoEstimado).toLocaleString('es-AR') }}
        </p>

        <label>Acción</label>
        <select v-model="form.action" required>
          <option disabled value="">Seleccione una acción</option>
          <option value="purchase">purchase</option>
          <option value="sale">sale</option>
        </select>

        <button type="submit" :disabled="cargando || cargandoPrecio">Crear operación</button>
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
import { computed, onMounted, ref, watch } from 'vue';
import { CrearOperacion, MostrarOperacion, MostrarOperacionPorCliente, ObtenerPrecioActualCripto } from '../components/Operacion';
import { MostrarClientes } from '../components/Cliente';
import { MostrarCriptos } from '../components/Criptos';

const clientes = ref([]);
const operaciones = ref([]);
const codigosCripto = ref([]);
const cargando = ref(false);
const cargandoPrecio = ref(false);
const filtroClienteId = ref(null);
const mensaje = ref('');
const mensajeTipo = ref('ok');
const precioActual = ref(0);

const form = ref({
  clienteID: null,
  criptoCode: '',
  criptoAmount: null,
  action: ''
});

const montoEstimado = computed(() => {
  const cantidad = Number(form.value.criptoAmount || 0);
  const precio = Number(precioActual.value || 0);

  if (cantidad <= 0 || precio <= 0) {
    return 0;
  }

  return cantidad * precio;
});

onMounted(async () => {
  await Promise.all([cargarClientes(), cargarCriptos(), cargarOperaciones()]);
});

watch(
  () => form.value.criptoCode,
  async (nuevoCodigo) => {
    if (!nuevoCodigo) {
      precioActual.value = 0;
      return;
    }

    await cargarPrecioActual(nuevoCodigo);
  }
);

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

async function cargarPrecioActual(criptoCode) {
  try {
    cargandoPrecio.value = true;
    const data = await ObtenerPrecioActualCripto(criptoCode);
    const precio = Number(data?.precio || 0);
    precioActual.value = precio > 0 ? precio : 0;

    if (precioActual.value <= 0) {
      mensaje.value = `No se pudo obtener un precio válido para ${criptoCode}.`;
      mensajeTipo.value = 'error';
    }
  } catch (error) {
    precioActual.value = 0;
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargandoPrecio.value = false;
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
  const cantidad = Number(form.value.criptoAmount);

  if (!form.value.clienteID || !form.value.criptoCode || !form.value.action || Number.isNaN(cantidad)) {
    mensaje.value = 'Completá todos los campos.';
    mensajeTipo.value = 'error';
    return;
  }

  if (cantidad <= 0) {
    mensaje.value = 'La cantidad a operar debe ser mayor a 0.';
    mensajeTipo.value = 'error';
    return;
  }

  if (precioActual.value <= 0) {
    mensaje.value = 'No hay precio actual disponible para la criptomoneda seleccionada.';
    mensajeTipo.value = 'error';
    return;
  }

  try {
    cargando.value = true;
    mensaje.value = '';

    await cargarPrecioActual(form.value.criptoCode);

    if (precioActual.value <= 0) {
      mensaje.value = 'No se pudo validar el precio actual de la criptomoneda.';
      mensajeTipo.value = 'error';
      return;
    }

    await CrearOperacion(
      Number(form.value.clienteID),
      form.value.criptoCode,
      cantidad,
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
