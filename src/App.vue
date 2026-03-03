<template>
  <div id="app" class="app-shell">
    <aside class="sidebar">
      <h1>Billetera Crypto</h1>
      <p class="subtitle">Panel universitario</p>

      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/clientes">Clientes</router-link>
        <router-link to="/cuentas">Cuentas</router-link>
        <router-link to="/operaciones">Operaciones</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/movimientos">Movimientos</router-link>
        <router-link to="/historial-precios">Historial Precios</router-link>
      </nav>

      <p class="api-base">
        API:
        {{ apiBase }}
      </p>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
const apiBase =
  process.env.VUE_APP_API_URL || 'https://billeteracryptoprojectapi-production.up.railway.app/api/';
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f6fb;
  color: #1f2937;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.sidebar {
  background: #111827;
  color: #f9fafb;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.sidebar h1 {
  margin: 0;
  font-size: 1.1rem;
}

.subtitle {
  margin: 0;
  color: #9ca3af;
  font-size: 0.88rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sidebar a {
  text-decoration: none;
  color: #d1d5db;
  padding: 0.5rem 0.65rem;
  border-radius: 0.45rem;
  font-size: 0.9rem;
}

.sidebar a.router-link-exact-active {
  background: #1f2937;
  color: #fff;
}

.api-base {
  margin-top: auto;
  font-size: 0.74rem;
  line-height: 1.4;
  color: #9ca3af;
  word-break: break-word;
}

.content {
  padding: 1rem 1.2rem;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
}

.title {
  margin: 0 0 1rem;
  font-size: 1.2rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.muted {
  color: #6b7280;
  font-size: 0.92rem;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.message {
  margin: 0.5rem 0 0;
  padding: 0.65rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.message.ok {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.message.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.7rem;
}

th,
td {
  text-align: left;
  padding: 0.6rem;
  border-bottom: 1px solid #e5e7eb;
}

input,
select,
button {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}

button {
  background: #2563eb;
  color: #fff;
  border: none;
  cursor: pointer;
}

button.secondary {
  background: #6b7280;
}

button.danger {
  background: #dc2626;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    gap: 0.65rem;
  }

  .sidebar nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .api-base {
    margin-top: 0.5rem;
  }
}
</style>

