<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Clientes</h2>
      <form @submit.prevent="guardarCliente">
        <label>Nombre</label>
        <input v-model.trim="form.nombre" placeholder="Ej: Juan Perez" required />

        <label>Email</label>
        <input v-model.trim="form.email" type="email" placeholder="Ej: juan@email.com" required />

        <button type="submit">{{ editandoId ? 'Guardar cambios' : 'Crear cliente' }}</button>
        <button v-if="editandoId" type="button" class="secondary" @click="cancelarEdicion">Cancelar</button>
      </form>
    </section>

    <section class="card">
      <h2 class="title">Listado</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in clientes" :key="c.clienteID">
            <td>{{ c.clienteID }}</td>
            <td>{{ c.nombre }}</td>
            <td>{{ c.email }}</td>
            <td>
              <div class="actions">
                <button type="button" class="secondary" @click="prepararEdicion(c)">Editar</button>
                <button type="button" class="danger" @click="eliminarCliente(c.clienteID)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <NotificacionPopup ref="notificacionRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CargarCliente, EditarCliente, EliminarCliente, MostrarClientes } from '../components/Cliente';
import NotificacionPopup from '@/assets/NotificacionPopup.vue';

onMounted(() => {
  cargarClientes();
});

const notificacionRef = ref(null);
const editandoId = ref(null);
const clientes = ref([]);
const form = ref({ nombre: '', email: '' });

async function guardarCliente() {
  if (editandoId.value) {
    const ok = await EditarCliente(editandoId.value, form.value.nombre, form.value.email);
    if (ok) {
      notificacionRef.value?.mostrar('Cliente actualizado', 'Se guardaron los cambios.');
      cancelarEdicion();
      await cargarClientes();
    } else {
      notificacionRef.value?.mostrar('Error', 'No se pudo actualizar el cliente.');
    }
  } else {
    const response = await CargarCliente(form.value.nombre, form.value.email);
    if (response) {
      notificacionRef.value?.mostrar('Cliente creado', 'Se creó el cliente y su cuenta inicial.');
      form.value = { nombre: '', email: '' };
      await cargarClientes();
    } else {
      notificacionRef.value?.mostrar('Error', 'No se pudo crear el cliente.');
    }
  }
}

function prepararEdicion(cliente) {
  editandoId.value = cliente.clienteID;
  form.value = { nombre: cliente.nombre, email: cliente.email };
}

function cancelarEdicion() {
  editandoId.value = null;
  form.value = { nombre: '', email: '' };
}

async function cargarClientes() {
  const response = await MostrarClientes();
  if (response?.data) {
    clientes.value = response.data;
  } else {
    notificacionRef.value?.mostrar('Error', 'No se pudo obtener la lista de clientes.');
  }
}

async function eliminarCliente(id) {
  const response = await EliminarCliente(id);
  if (response) {
    notificacionRef.value?.mostrar('Cliente eliminado', 'Eliminado correctamente.');
    await cargarClientes();
  } else {
    notificacionRef.value?.mostrar('Error', 'No se pudo eliminar el cliente.');
  }
}
</script>

<style>
.actions {
  display: flex;
  gap: 0.4rem;
}
</style>