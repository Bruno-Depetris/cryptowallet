<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Clientes</h1>
      <form @submit.prevent="crearCliente" class="space-y-4">
        <input
          v-model="cliente.nombre"
          placeholder="Nombre"
          class="input w-full"
        />
        <input
          v-model="cliente.email"
          placeholder="Email"
          class="input w-full"
          type="email"
        />
        <button type="submit" class="btn w-full">Crear</button>
      </form>
    </div>

    <div class="mt-8 w-full max-w-md">
      <ul>
        <li
          v-for="c in clientes"
          :key="c.clienteID"
          class="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <span>
            <span class="font-semibold">{{ c.nombre }}</span>
            <span class="text-gray-500">- {{ c.email }}</span>
          </span>
        </li>
      </ul>
    </div>
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
</style>