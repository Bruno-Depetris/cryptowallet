<template>
  <div class="operaciones-view">
    <h1>Operaciones</h1>
    <p>Bienvenido a la vista de operaciones de tu CryptoWallet.</p>

    <div class="realizar-operacion">
      <h2>Realizar una operación</h2>
      <p>Selecciona una criptomoneda para ver sus datos.</p>

      <div class="form-group">
        <label for="crypto-select">Criptomoneda:</label>
        <select
          id="crypto-select"
          v-model="selected"
          @change="cargarDato"
          class="crypto-select"

        >
          <option disabled value="">Seleccione una criptomoneda</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USDT">Tether (USDT)</option>

        </select>
        <p>
          Precio:
          <strong>{{
            precio !== null ? "$ " + precio : "Selecciona una criptomoneda"
          }}</strong>
        </p>
        <label for="cliente-select">Cliente:</label>
        <select
          id="cliente-select"
          v-model="selectedCliente"
          class="cliente-select"
        >
          <option disabled value="">Seleccione un cliente</option>
          <option
            v-for="cliente in clientes"
            :key="cliente.id"
            :value="cliente"
          >
            {{ cliente.nombre }} ({{ cliente.email }})
          </option>
        </select>



        
        <label for="cantidad-input">Cantidad:</label>
<input id="cantidad-input" type="number" v-model="cantidad" />

<label for="accion-select">Acción:</label>
<select id="accion-select" v-model="accionID">
  <option disabled value="">Seleccione una acción</option>
  <option :value="1">Comprar</option>
  <option :value="2">Vender</option>
</select>

<button @click="cargarOperacion">Realizar operación</button>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import getCriptoData from "./src/services/apiCrypto";

const selected = ref(""); 
const precio = ref(null); 

const cargarDato = async () => {
  if (!selected.value) return;

  try {
    const response = await getCriptoData(selected.value);
    precio.value = response.data.ask; // Guardamos el precio
  } catch (error) {
    console.error("Error al obtener datos:", error);
    precio.value = null;
  }
};

import api from "./src/services/api";

const clientes = ref([]);

const cargarClientes = async () => {
  const res = await api.get("Cliente");
  clientes.value = res.data;
};
onMounted(cargarClientes);

const selectedCliente = ref("");
const cantidad = ref(0);
const accionID = ref("");

const cargarOperacion = async () => {
  if (!selected.value || !selectedCliente.value || !accionID.value || !cantidad.value) {
    alert("Por favor, complete todos los campos");
    return;
  }

  const montoARS = precio.value * cantidad.value;

  const operacion = {
    CuentaID: selectedCliente.value.cuentaID,  // ajustalo según tu modelo
    CriptoCode: selected.value,
    Cantidad: cantidad.value,
    Fecha: new Date().toISOString(),
    AccionID: accionID.value,
    MontoARS: montoARS
  };

  try {
    await api.post('Operacion', operacion);
    console.log('Operación cargada con éxito');
  } catch (error) {
    console.error('Error al cargar la operación:', error);
  }
};



</script>
