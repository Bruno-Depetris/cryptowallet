<template>
  <div class="container">
    <h1>Bienvenido a CryptoWallet</h1>
    <p>Selecciona una opción:</p>

    <ul class="menu-list">
      <li><router-link to="/clientes">📄 Ver Clientes</router-link></li>
      <li><router-link to="/operaciones">💱 Ver Operaciones</router-link></li>
      <li><router-link to="/dashboard">📊 Ver Dashboard</router-link></li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style>

body{
    margin: 1%;
    padding: 0;
    background: #ffffff; /* Gray-100 */
    overflow: hidden    ;
}
.container {

  min-height: 100vh;
  display: flex;
  border-radius: 30px ;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #ececec;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  text-align: center;
  box-shadow: 0px 1px 10px 1px #bcb8ff; ;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5; 
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: #6b7280; /* Gray-500 */
}

.menu-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 320px;
}

.menu-list li {
  margin-bottom: 1rem;
}

.menu-list a {
  display: block;
  background-color: white;
  color: #4f46e5; /* Indigo-600 */
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.menu-list a:hover {
  background-color: #e0e7ff; /* Indigo-100 */
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}
</style>
