import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ClientesView from '../views/ClientesView.vue';
import OperacionesView from '@/views/OperacionesView.vue';
import CuentasView from '@/views/CuentasView.vue'; 

// import otras vistas más adelante

const routes = [
  { path: '/', component: HomeView },
  { path: '/clientes', component: ClientesView },
  { path: '/operaciones', component: OperacionesView },
  { path: '/cuentas', component: CuentasView},
  // otras rutas que vayas creando...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
