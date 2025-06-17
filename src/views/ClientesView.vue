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
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Lista de Clientes</h2>
      <ul>
        <li
          v-for="c in clientes"
          :key="c.clienteID"
          :id="c.clienteID"
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

  <div class="notificacion">
    <p id="titulo"> </p>
    <p id="mensaje"> </p>
    <img src="" alt="" id="imagen">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CargarCliente,EliminarCliente, MostrarClientes } from '../components/Cliente';

onMounted(() => {
  Mostrar();

  // ✅ Mover esto adentro para asegurar que el DOM existe
  const volverAtras = document.querySelector('.volver-atras');
  if (volverAtras) {
    volverAtras.addEventListener('click', () => {
      window.location.href = '/';
    });
  }

});

const cliente = ref({ nombre: '', email: '' });
const clientes = ref([]);
var id = 0;
const notificacion = ref({
  titulo: '',
  mensaje: '',
  imagen: ''
});

// Función para mostrar notificación
function mostrarNotificacion(titulo, mensaje, imagen) { 
  
  notificacion.value.titulo = titulo;
  notificacion.value.mensaje = mensaje;
  notificacion.value.imagen = imagen;
  const notificacionElement = document.querySelector('.notificacion');
  notificacionElement.style.display = 'block';

  
  setTimeout(() => {
    notificacionElement.style.display = 'none';
  }, 3000);
}



// Función para eliminar un cliente
addEventListener('click', async function(event) {
  if (event.target.id === 'eliminar') {
    id = event.target.closest('li').getAttribute('id');
    mostrarNotificacion('Eliminar Cliente', `cliente eliminado`, '');
    const response = await EliminarCliente(id);
    if(response){
      Mostrar();
    }else{
      console.error("Error al eliminar el cliente");      
    }

    // this.alert(id);
  }
});



async function CrearClietne() {
  const response = await CargarCliente(cliente.value.nombre, cliente.value.email);
  if (response) {
    alert('Cliente creado con éxito');

    cliente.value = { nombre: '', email: '' };
    await Mostrar();
  } else {
    console.error("Error al crear el cliente");
  }
}

async function Mostrar() {
  const response = await MostrarClientes();
  if (response) {
    clientes.value = response.data;
  } else {
    console.error("Error al obtener la lista de clientes");
  }
}
</script>


<style scoped>
.notificacion {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px rgba(30, 41, 59, 0.08);
  z-index: 1000;
}
.notificacion p {
  margin: 0;
  color: #1e293b;
}
.notificacion img {
  max-width: 100px;
  margin-top: 0.5rem;
}
#titulo {
  font-weight: bold;
  font-size: 1.2rem;
}
#mensaje {
  font-size: 1rem;
}
#imagen {
  width: 100%;
  height: auto;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

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