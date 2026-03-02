<template>
  <div id="app" class="app-shell">
    <header class="topbar">
      <h1>Billetera Crypto</h1>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/clientes">Clientes</router-link>
        <router-link to="/cuentas">Cuentas</router-link>
        <router-link to="/operaciones">Operaciones</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/movimientos">Movimientos</router-link>
        <router-link to="/historial-precios">Historial</router-link>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

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
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
}

.topbar h1 {
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
}

.topbar nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topbar a {
  text-decoration: none;
  color: #374151;
  padding: 0.4rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}

.topbar a.router-link-exact-active {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
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

table {
  width: 100%;
  border-collapse: collapse;
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
</style>

