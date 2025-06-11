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
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

.bg-gray-50 {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.bg-white {
  background: #fff;
}

.shadow-md, .shadow {
  box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.08), 0 1.5px 4px 0 rgba(30, 41, 59, 0.04);
}

.rounded-lg {
  border-radius: 1rem;
}

.input {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: #f9fafb;
  transition: border-color 0.2s;
  outline: none;
}

.input:focus {
  border-color: #6366f1;
  background: #fff;
}

.btn {
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.08);
}

.btn:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  transition: box-shadow 0.2s, transform 0.2s;
}

li:hover {
  box-shadow: 0 8px 32px 0 rgba(30, 41, 59, 0.12);
  transform: translateY(-2px) scale(1.01);
}

.font-semibold {
  color: #1e293b;
}

.text-gray-500 {
  color: #64748b;
}

.text-gray-800 {
  color: #1e293b;
}
</style>