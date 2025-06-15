<template>
  <div class="contenedor">

     <router-link to="/" class="volver-atras" >
      <span class="icon">⬅️</span>
      <span> Volver a Inicio</span>
      </router-link>

    <div class="contenedor-form">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Clientes</h1>


      <form @submit.prevent="CrearClietne" class="space-y-4">
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

    <div class="contenedor-clientes">
      <ul>
        <li
          v-for="c in clientes"
          :key="c.clienteID"
          class="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <span>
            <span class="font-semibold">{{ c.nombre }}</span>
            <span class="text-gray-500">- {{ c.email }}</span>
            <span class="button-delete"><button id="eliminar" >Eliminar</button></span>
            <span class="button-edit"><button id="editar">Editar</button></span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CargarCliente, MostrarClientes } from '../components/Cliente';

onMounted(() => {
  Mostrar();
//   ✅ ¿Para qué sirve onMounted?
// Se usa para:

// Llamar a una API cuando el componente aparece por primera vez.

// Cargar datos (como una lista de clientes, productos, etc.).

// Hacer suscripciones o configurar cosas que dependen del DOM.

// Ejecutar animaciones o efectos una vez que todo está listo.
});

const cliente = ref({ nombre: '', email: '' });
const clientes = ref([]);

addEventListener('click', function(event) {
  if (event.target.id === 'eliminar') {
    const id = event.target.closest('li').getAttribute('key');
    this.alert(`Eliminar cliente con ID: ${id}`);
  }
});


// async function EditarCliente(clienteId) {
//   const cliente = clientes.value.find(c => c.clienteID === clienteId);
//   if (cliente) {
//     const nuevoNombre = prompt("Ingrese el nuevo nombre:", cliente.nombre);
//     const nuevoEmail = prompt("Ingrese el nuevo email:", cliente.email);
//     if (nuevoNombre && nuevoEmail) {
//       cliente.nombre = nuevoNombre;
//       cliente.email = nuevoEmail;
//       // Aquí deberías llamar a una función para actualizar el cliente en la base de datos
//       await Mostrar(); // recargar la lista de clientes
//     }
//   } else {
//     console.error("Cliente no encontrado");
//   }
// }
// var volverAtras = document.querySelector('.volver-atras');
// volverAtras.addEventListener('click', function() {
//   window.location.href = '/';
// });
async function CrearClietne() {
  const response = await CargarCliente(cliente.value.nombre, cliente.value.email);
  if (response) {
    alert('Cliente creado con éxito');
    cliente.value = { nombre: '', email: '' };
    await Mostrar(); // recargar la lista de clientes
  } else {
    console.error("Error al crear el cliente");
  }
}


async function Mostrar(){
  const response = await MostrarClientes();
  if (response) {
    clientes.value = response.data;
  } else {
    console.error("Error al obtener la lista de clientes");
  }
}


</script>

<style scoped>
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  align-items: center;
  text-align: center;
}
.volver-atras {
  text-decoration: none ;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #f3f4f6;
  color: #1e293b;
  padding: 10px 20px;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.volver-atras:hover {
  background-color: #e5e7eb;
  color: #111827;
}
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #f3f4f6;
  min-height: 100vh;
}
.contenedor-form {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px rgba(30, 41, 59, 0.08);
}
.contenedor-form h1 {
  color: #1e293b;
}
.contenedor-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.contenedor-clientes {
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
}
.contenedor-clientes {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.08);
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
.button-delete button{
  margin-left: 10px;
  background-color: white ;
  border: 1px solid #dc2626;
  border-radius: 10px;
  color: #dc2626;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

}
.button-delete button:hover {
  background-color: #dc2626;
  color: white;
}
.button-edit button{
  margin-left: 10px;
  background-color: white ;
  border: 1px solid #2563eb;
  border-radius: 10px;
  color: #2563eb;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

}
.button-edit button:hover {
  background-color: #2563eb;
  color: white;
}
</style>