<template>
    <div class="grid grid-2">
        <section class="card">
            <h2 class="title">Crear cuenta</h2>

            <form @submit.prevent="crearCuenta">
                <label>Cliente ID</label>
                <input v-model.number="form.clienteID" type="number" min="1" required />

                <label>Estado ID</label>
                <input v-model.number="form.estadoID" type="number" min="1" required />

                <button type="submit" :disabled="cargando">Crear cuenta</button>
            </form>

            <p class="muted">Si el cliente ya tiene cuenta, el back devuelve la existente.</p>
            <p v-if="mensaje" class="message" :class="mensajeTipo">{{ mensaje }}</p>
        </section>

        <section class="card">
            <div class="toolbar">
                <h2 class="title">Listado de cuentas</h2>
                <button type="button" class="secondary" @click="cargarCuentas" :disabled="cargando">Recargar</button>
            </div>

            <p v-if="!cuentas.length" class="muted">No hay cuentas cargadas.</p>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado ID</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cuenta in cuentas" :key="cuenta.cuentaID">
                        <td>{{ cuenta.cuentaID }}</td>
                        <td>{{ cuenta.clienteID ?? cuenta.cliente?.clienteID ?? '-' }}</td>
                        <td>{{ cuenta.cliente?.nombre || '-' }}</td>
                        <td>{{ cuenta.cliente?.email || '-' }}</td>
                        <td>{{ cuenta.estadoID ?? cuenta.estado?.estadoID ?? '-' }}</td>
                        <td>{{ cuenta.estado?.estado || '-' }}</td>
                        <td>
                            <button type="button" class="danger" @click="eliminarCuenta(cuenta.cuentaID)" :disabled="cargando">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CrearCuenta, EliminarCuenta, MostrarCuentas } from '@/components/Cuentas';

const cuentas = ref([]);
const cargando = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('ok');
const form = ref({
    clienteID: null,
    estadoID: 1
});

onMounted(() => {
    cargarCuentas();
});

async function cargarCuentas() {
    try {
        cargando.value = true;
        cuentas.value = await MostrarCuentas();
    } catch (error) {
        cuentas.value = [];
        mensaje.value = error.message;
        mensajeTipo.value = 'error';
    } finally {
        cargando.value = false;
    }
}

async function crearCuenta() {
    try {
        cargando.value = true;
        mensaje.value = '';
        await CrearCuenta(Number(form.value.clienteID), Number(form.value.estadoID));
        mensaje.value = 'Cuenta creada/obtenida correctamente.';
        mensajeTipo.value = 'ok';
        await cargarCuentas();
    } catch (error) {
        mensaje.value = error.message;
        mensajeTipo.value = 'error';
    } finally {
        cargando.value = false;
    }
}

async function eliminarCuenta(id) {
    if (!window.confirm(`¿Eliminar cuenta ${id}?`)) {
        return;
    }

    try {
        cargando.value = true;
        await EliminarCuenta(id);
        mensaje.value = 'Cuenta eliminada correctamente.';
        mensajeTipo.value = 'ok';
        await cargarCuentas();
    } catch (error) {
        mensaje.value = error.message;
        mensajeTipo.value = 'error';
    } finally {
        cargando.value = false;
    }
}
</script>

<style scoped>
</style>