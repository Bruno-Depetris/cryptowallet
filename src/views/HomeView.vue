<template>
  <div class="container">
    <ul class="menu-list">
      <li><router-link to="/clientes">📄 Ver Clientes</router-link></li>
      <li><router-link to="/operaciones">💱 Ver Operaciones</router-link></li>
      <li><router-link to="/dashboard">📊 Ver Dashboard</router-link></li>
    </ul>
    <h1>
      Bienvenido a 
      <span class="typing">{{ currentCrypto }}</span>
      <span class="cursor">|</span>
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cryptos = [
  'Bitcoin',
  'Ethereum',
  'Solana',
  'Dogecoin',
  'Cardano',
  'Ripple',
  'Litecoin',
  'Polkadot'
]

const currentCrypto = ref('')
let index = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {

  const word = cryptos[index]
  if (!isDeleting) {
    currentCrypto.value = word.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === word.length) {
      setTimeout(() => { isDeleting = true; typeEffect() }, 1200)
      return
    }
  } else {
    currentCrypto.value = word.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      index = (index + 1) % cryptos.length
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 120)
}

onMounted(() => {
  typeEffect()
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #18181b;
  background-image: url('https://www.telefonica.com/es/wp-content/uploads/sites/4/2022/06/Imagen1.jpg?w=1224&h=673&crop=1');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #f3f4f6;
  overflow: hidden;
  filter: contrast(1.1) brightness(0.9);
  backdrop-filter: blur(5px);
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  backdrop-filter: none;
}

.menu-list {
  list-style: none;
  padding: 10px;
  width: 95%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  background: rgba(24, 24, 27, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0,0,0,0.3);
  display: flex;
  top: 0;
  left: 2.5%;
  border-radius: 10rem;
  z-index: 10;
}

.menu-list li {
  margin: 0 1rem;
}

.menu-list a {
  display: block;
  background-color: #23232b;
  color: #a5b4fc;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: background-color 0.25s, box-shadow 0.25s, color 0.25s;
}

.menu-list a:hover {
  background-color: #3730a3;
  color: #fff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #a5b4fc;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 16px #000a;
  background: rgba(24,24,27,0.7);
  border-radius: 1rem;
  padding: 1.5rem 2.5rem;
  margin-top: 5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.typing {
  color: #fbbf24;
  min-width: 120px;
  display: inline-block;
  font-family: 'Fira Mono', monospace;
  letter-spacing: 0.04em;
}

.cursor {
  display: inline-block;
  width: 1ch;
  color: #fbbf24;
  animation: blink 0.8s steps(1) infinite;
  font-weight: bold;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
