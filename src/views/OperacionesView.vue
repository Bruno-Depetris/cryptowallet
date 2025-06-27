<template>
  <div class="container mx-auto p-4 max-w-md">
    <router-link to="/" class="volver-atras">
      <span class="mr-2">⬅️</span> Volver a Inicio
    </router-link>

    <form @submit.prevent="CargarOperacion" >
      <div>
        <label for="crypto-select" >Criptomoneda</label>
        <select id="crypto-select" v-model="criptoCode" @change="cargarDato" class="w-full p-2 border rounded">
          <option disabled value="">Seleccione una criptomoneda</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
      </div>

      <p >
        Precio actual de 1 {{ criptoCode }}:
        <strong>{{ precio !== null ? "$ " + precio.toLocaleString("es-AR") + " ARS" : "Selecciona una criptomoneda" }}</strong>
      </p>

      <p >
        Cantidad de la moneda comprada:
        <strong>{{ typeof montoMoneda === 'number' ? montoMoneda.toFixed(6) + ' ' + criptoCode : montoMoneda }}</strong>
      </p>

      <div>
        <label for="cuentas-select" >Cuentas</label>
        <select id="cuentas-select" v-model="selectedClienteID" class="w-full p-2 border rounded">
          <option disabled value="">Seleccione una cuenta para operar</option>
          <option v-for="cuenta in cuentas" :key="cuenta.cuentaID" :value="cuenta">
            {{ cuenta.cliente.nombre }} ({{ cuenta.cliente.email }})
          </option>
        </select>
      </div>

      <div>
        <label for="cantidad-input" class="ingrese_monto">Ingrese un monto (ARS)</label>
        <input id="cantidad-input" type="number" v-model="cantidad" min="0" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label for="accion-select" class="block font-semibold mb-1">Acción</label>
        <select id="accion-select" v-model="accionID" class="w-full p-2 border rounded">
          <option disabled value="">Seleccione una acción</option>
          <option value="1">Comprar</option>
          <option value="2">Vender</option>
        </select>
      </div>

      <button type="submit" class="enviar_button">
        Crear Operación
      </button>
    </form>

    <NotificacionPopup ref="notificacionRef" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { MostrarCuentas } from '../components/Cuentas';
import NotificacionPopup from '../assets/NotificacionPopup.vue';
import getCriptoData from '../services/apiCrypto';
import { CrearOperacion } from '../components/Operacion';

const cuentas = ref([]);
const notificacionRef = ref(null);
const selectedClienteID = ref('');
const criptoCode = ref('');
const precio = ref(null);
const cantidad = ref(null);
const montoMoneda = ref('');
const accionID = ref(null);

onMounted(async () => {
  await MostrarCuentasClientes();
});

watch(selectedClienteID, (nuevoValor) => {
  if (nuevoValor) {
    console.log('Cliente seleccionado:', nuevoValor);
  }
});

watch([cantidad, criptoCode, precio], () => {
  if (!cantidad.value || !criptoCode.value || !precio.value) {
    montoMoneda.value = 'Ingrese un monto válido';
  } else {
    montoMoneda.value = cantidad.value / precio.value;
  }
});

async function cargarDato() {
  try {
    const response = await getCriptoData(criptoCode.value);
    precio.value = response.data.ask;
  } catch (error) {
    console.error(`Error al cargar el precio de ${criptoCode.value}:`, error);
  }
}

async function MostrarCuentasClientes() {
  try {
    const response = await MostrarCuentas();
    cuentas.value = Array.isArray(response) ? response : response?.data || [];
  } catch (error) {
    console.error('Error al cargar cuentas:', error);
    notificacionRef.value?.mostrar?.('Error', 'No se pudo cargar la lista de cuentas');
  }
}

async function CargarOperacion() {
  if (!selectedClienteID.value || !criptoCode.value || !cantidad.value || !accionID.value || !precio.value) {
    notificacionRef.value?.mostrar('Error', 'Por favor complete todos los campos');
    return;
  }
console.log({
  CuentaID: selectedClienteID.value.cuentaID,
  CriptoCode: criptoCode.value,
  Cantidad: montoMoneda.value,
  Fecha: new Date().toISOString(),
  AccionID: parseInt(accionID.value),
  MontoARS: cantidad.value
});

  try {
    const operacionCreada = await CrearOperacion(
      selectedClienteID.value.cuentaID,
      criptoCode.value,
      montoMoneda.value,
      new Date().toLocaleTimeString('es-AR', { hour12: false }),
      parseInt(accionID.value),
      cantidad.value
    );

    if (operacionCreada) {
      notificacionRef.value?.mostrar('Operación creada', 'La operación se registró con éxito');
      cantidad.value = null;
      criptoCode.value = '';
      montoMoneda.value = '';
      accionID.value = null;
      selectedClienteID.value = '';
      precio.value = null;
    }
  } catch (error) {
    console.error('Error al crear la operación:', error);
    notificacionRef.value?.mostrar('Error', 'No se pudo registrar la operación');
  }
}
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafb;
  margin: 0;
  padding: 0;
}

.container {
  bottom: 300px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: linear-gradient(135deg, #f9fafb 60%, #e0e7ff 100%);
}

form {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2rem;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(6, 10, 255, 0.07), 0 1.5px 6px rgba(0, 102, 255, 0.03);
  padding: 4rem;
  width: 100%;
  max-width: 420px;
  transition: box-shadow 0.2s;
}

form:focus-within {
  box-shadow: 0 8px 32px rgba(59,130,246,0.10), 0 2px 8px rgba(0,0,0,0.04);
}

label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
  margin-top: 1.24rem ;
  display: block;
}

select,
input[type="number"] {

  width: 95%;
  padding: 0.75rem 0rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: #f3f4f6;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-top: 0.25rem;
}

select:focus,
input[type="number"]:focus {
  border-color: #2563eb;
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 2px #93c5fd55;
}

button[type="submit"] {
  background: linear-gradient(90deg, #2563eb 60%, #60a5fa 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(59,130,246,0.07);
}

button[type="submit"]:hover {
  background: linear-gradient(90deg, #1d4ed8 60%, #3b82f6 100%);
  box-shadow: 0 4px 16px rgba(59,130,246,0.12);
}

.router-link {
  color: #2563eb;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
}

.router-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.bg-white {
  background: #fff;
}

.shadow-md {
  box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.03);
}

.rounded-xl {
  border-radius: 1.25rem;
}

.p-6 {
  padding: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.text-blue-600 {
  color: #2563eb;
}

.text-gray-600 {
  color: #6b7280;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}
.volverInicio{
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
}
@media (max-width: 600px) {
  .container {
    padding: 1rem 0.25rem;
  }
  form {
    padding: 1rem;
    max-width: 100%;
    border-radius: 1rem;
  }
  .p-6 {
    padding: 1rem;
  }
}
</style>
