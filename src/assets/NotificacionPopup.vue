<template>
  <div
    v-if="visible"
    class="notificacion"
    :class="{ 'animar-entrada': animandoEntrada, 'animar-salida': animandoSalida }"
  >
    <img :src="imagen" alt="Notificación" v-if="imagen" />
    <div>
      <h3>{{ titulo }}</h3>
      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref , defineExpose} from 'vue';

const visible = ref(false);
const titulo = ref('');
const mensaje = ref('');
const imagen = ref('');

const animandoEntrada = ref(false);
const animandoSalida = ref(false);

function mostrar(t, m, i = '') {
  titulo.value = t;
  mensaje.value = m;
  imagen.value = i;

  visible.value = true;
  animandoEntrada.value = true;
  animandoSalida.value = false;

  setTimeout(() => {
    animandoEntrada.value = false;
  }, 600);

  setTimeout(() => {
    animandoSalida.value = true;


    setTimeout(() => {
      visible.value = false;
      animandoSalida.value = false;
    }, 600);
  }, 3000);
}

defineExpose({ mostrar });
</script>

<style scoped>
.notificacion {
  position: fixed;
  width: 300px;
  height: 60px;
  top: 20px;
  right: 20px;
  background-color: #ced6f8;
  color: #1d1c72;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 1px 13px 10px rgba(0, 0, 0, 0.1);
}

.animar-entrada {
  animation: bounceInDown 0.6s ease forwards;
}

.animar-salida {
  animation: bounceInUp 0.6s ease forwards;
}

@keyframes bounceInDown {
  0% {
    opacity: 0;
    transform: translateY(-200px);
  }
  60% {
    opacity: 1;
    transform: translateY(30px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounceInUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-200px);
  }
}

.notificacion img {
  width: 40px;
  height: 40px;
}
</style>
