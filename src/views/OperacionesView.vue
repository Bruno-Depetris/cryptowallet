<template>
  <div class="operaciones-container">
    <h1>Operaciones</h1>
    <div class="formulario-contenedor">
      <h2>Realizar una operación</h2>

      <label for="crypto-select">Criptomoneda</label>
      <select id="crypto-select" v-model="criptoCode" @change="cargarDato" class="crypto-select"> 
        <option disabled value="">Seleccione una criptomoneda</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="USDT">Tether (USDT)</option>
      </select>
      <p class="precio-actual">
        Precio Actual de 1 {{ criptoCode }}:
        <strong>
          {{ precio !== null ? "$ " + precio : "Selecciona una criptomoneda" }}
        </strong>
      </p>

      <p class="monto-moneda">
        Cantidad de la moneda comprada:
        <strong>
          {{ montoMoneda !== null ? montoMoneda.toFixed(8) + " " + criptoCode : " " }}
        </strong>
      </p>

      <label for="cliente-select">Cliente</label>
      <select id="cliente-select" v-model="selectedCliente" class="cliente-select">
        <option disabled value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">
          {{ cliente.nombre }} ({{ cliente.email }})
        </option>
      </select>

      <label for="cantidad-input">Ingrese un monto</label>
      <input id="cantidad-input" type="number" v-model="cantidad" min="0" />

      <label for="accion-select">Acción</label>
      <select id="accion-select" v-model="accionID">
        <option disabled value="">Seleccione una acción</option>
        <option value="1">Comprar</option>
        <option value="2">Vender</option>
      </select>

      <button class="btn-operacion" @click="cargarOperacion">Realizar operación</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import getCriptoData from "../services/apiCrypto";
import api from "../services/api";

const clientes = ref([]);
const criptoCode = ref(""); 
const precio = ref(null); 
const montoMoneda = ref(null)
const selectedCliente = ref("");
const cantidad = ref(0);
const accionID = ref("");

const cargarDato = async () => {
  if (!criptoCode.value) return;
  try {
    const response = await getCriptoData(criptoCode.value);
    precio.value = response.data.ask;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    precio.value = null;
  }
};

watch([precio, cantidad], ([nuevoPrecio, nuevaCantidad]) => {
  if (nuevoPrecio !== null && nuevaCantidad > 0) {
    montoMoneda.value = nuevaCantidad / nuevoPrecio;
  } else {
    montoMoneda.value = null;
  }
});

const cargarClientes = async () => {
  const res = await api.get("Cliente");
  clientes.value = res.data;
};
onMounted(cargarClientes);

const cargarOperacion = async () => {
  if (!criptoCode.value || !selectedCliente.value || !accionID.value || !cantidad.value) {
    alert("Por favor, complete todos los campos");
    return;
  }

  const montoARS = precio.value / cantidad.value;

  const operacion = {
    CuentaID: selectedCliente.value.cuentaID,
    CriptoCode: criptoCode.value,
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

<style scoped>
:root {
  --primary: #22223b;
  --secondary: #4a4e69;
  --accent: #9a8c98;
  --background: #f2e9e4;
  --white: #fff;
  --border-radius: 14px;
  --shadow: 0 4px 24px rgba(34,34,59,0.08);
}

.operaciones-container {
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

h1 {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.formulario-contenedor {
  background: var(--white);
  padding: 32px 28px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  min-width: 340px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

h2 {
  color: var(--secondary);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

label {
  color: var(--primary);
  font-size: 0.98rem;
  margin-bottom: 4px;
  font-weight: 500;
}

select,
input[type="number"] {
  padding: 10px 12px;
  border: 1px solid var(--accent);
  border-radius: 8px;
  background: #faf9f6;
  font-size: 1rem;
  margin-bottom: 8px;
  transition: border 0.2s;
  outline: none;
}

select:focus,
input[type="number"]:focus {
  border: 1.5px solid var(--secondary);
}

.precio-actual,
.monto-moneda {
  background: #f8f7fa;
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--secondary);
  font-size: 0.98rem;
  margin-bottom: 0;
}

strong {
  color: var(--primary);
  font-weight: 600;
}

.btn-operacion {
  margin-top: 10px;
  padding: 12px 0;
  background: linear-gradient(90deg, var(--secondary), var(--accent));
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 2px 8px rgba(74, 78, 105, 0.08);
}

.btn-operacion:hover {
  background: linear-gradient(90deg, var(--accent), var(--secondary));
  transform: translateY(-2px) scale(1.03);
}
</style>