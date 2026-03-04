<template>
  <div class="grid grid-2">
    <section class="card">
      <h2 class="title">Clientes</h2>
      <form @submit.prevent="guardarCliente">
        <label>Nombre</label>
        <input v-model.trim="form.nombre" placeholder="Ej: Juan Perez" required />

        <label>Email</label>
        <input v-model.trim="form.email" type="email" placeholder="Ej: juan@email.com" required />

        <button type="submit" :disabled="cargando">{{ editandoId ? 'Guardar cambios' : 'Crear cliente' }}</button>
        <button v-if="editandoId" type="button" class="secondary" @click="cancelarEdicion">Cancelar</button>
      </form>

      <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
    </section>

    <section class="card">
      <div class="toolbar">
        <h2 class="title">Listado</h2>
        <button type="button" class="secondary" @click="cargarClientes" :disabled="cargando">Recargar</button>
      </div>

      <p v-if="!clientes.length" class="muted">No hay clientes cargados.</p>

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
                <button type="button" class="danger" @click="eliminarCliente(c.clienteID)" :disabled="cargando">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CargarCliente, EditarCliente, EliminarCliente, MostrarClientes } from '../components/Cliente';

onMounted(() => {
  cargarClientes();
});

const editandoId = ref(null);
const clientes = ref([]);
const cargando = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('ok');
const form = ref({ nombre: '', email: '' });

async function guardarCliente() {
  try {
    cargando.value = true;
    mensaje.value = '';

    if (editandoId.value) {
      await EditarCliente(editandoId.value, form.value.nombre, form.value.email);
      mensaje.value = 'Cliente actualizado correctamente.';
      mensajeTipo.value = 'ok';
      cancelarEdicion();
    } else {
      await CargarCliente(form.value.nombre, form.value.email);
      mensaje.value = 'Cliente creado correctamente.';
      mensajeTipo.value = 'ok';
      form.value = { nombre: '', email: '' };
    }

    await cargarClientes();
  } catch (error) {
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
  }
}

async function cargarClientes() {
  try {
    cargando.value = true;
    clientes.value = await MostrarClientes();
    
  } catch (error) {
    clientes.value = [];
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
  }
}

async function eliminarCliente(id) {
  if (!window.confirm(`¿Eliminar cliente ${id}?`)) {
    return;
  }

  try {
    cargando.value = true;
    await EliminarCliente(id);
    mensaje.value = 'Cliente eliminado correctamente.';
    mensajeTipo.value = 'ok';
    await cargarClientes();
  } catch (error) {
    mensaje.value = error.message;
    mensajeTipo.value = 'error';
  } finally {
    cargando.value = false;
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
</script>

<style scoped>
.actions {
  display: flex;
  gap: 0.4rem;
}
</style>