<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Clientes</h1>
    <form @submit.prevent="crearCliente">
      <input v-model="cliente.nombre" placeholder="Nombre" class="input" />
      <input v-model="cliente.email" placeholder="Email" class="input" type="email" />
      <button type="submit" class="btn">Crear</button>
    </form>

    <ul class="mt-4">
      <li v-for="c in clientes" :key="c.clienteID">
        {{ c.nombre }} - {{ c.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const cliente = ref({ nombre: '', email: '' });
const clientes = ref([]);

const cargarClientes = async () => {
  const res = await api.get('Cliente');
  clientes.value = res.data;
};

const crearCliente = async () => {
  await api.post('Cliente', cliente.value);
  cliente.value = { nombre: '', email: '' };
  await cargarClientes();
};

onMounted(cargarClientes);
</script>

<style scoped>
.input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
}
</style>
