<template>
  <div class="grid">
    <section class="card">
      <h2 class="title">Panel principal</h2>
      <p>Frontend completo y simple para gestionar clientes, cuentas, operaciones y reportes.</p>
    </section>

    <section class="grid grid-2">
      <router-link class="card quick-link" to="/clientes">Clientes</router-link>
      <router-link class="card quick-link" to="/cuentas">Cuentas</router-link>
      <router-link class="card quick-link" to="/operaciones">Operaciones</router-link>
      <router-link class="card quick-link" to="/dashboard">Dashboard</router-link>
      <router-link class="card quick-link" to="/movimientos">Movimientos</router-link>
      <router-link class="card quick-link" to="/historial-precios">Historial de precios</router-link>
    </section>
  </div>
</template>

<style scoped>
.quick-link {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
}

.quick-link:hover {
  border-color: #2563eb;
  color: #2563eb;
}
</style>
