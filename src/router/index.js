import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ClientesView from '../views/ClientesView.vue';
import OperacionesView from '@/views/OperacionesView.vue';
import CuentasView from '@/views/CuentasView.vue'; 
import DashboardView from '@/views/DashboardView.vue';
import MovimientosView from '@/views/MovimientosView.vue';
import HistorialPreciosView from '@/views/HistorialPreciosView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/clientes', component: ClientesView },
  { path: '/cuentas', component: CuentasView },
  { path: '/operaciones', component: OperacionesView },
  { path: '/dashboard', component: DashboardView },
  { path: '/movimientos', component: MovimientosView },
  { path: '/historial-precios', component: HistorialPreciosView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
