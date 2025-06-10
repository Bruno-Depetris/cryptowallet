<template>
  <div class="container">
    <nav class="menu">
      <router-link to="/clientes" class="menu-item">
        <span class="icon">📄</span>
        <span>Clientes</span>
      </router-link>
      <router-link to="/operaciones" class="menu-item">
        <span class="icon">💱</span>
        <span>Operaciones</span>
      </router-link>
      <router-link to="/dashboard" class="menu-item">
        <span class="icon">📊</span>
        <span>Dashboard</span>
      </router-link>
    </nav>
    <section class="welcome">
      <h1>
        Bienvenido a
        <span class="typing">{{ currentCrypto }}</span>
        <span class="cursor">|</span>
      </h1>
    </section>
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
      setTimeout(() => { isDeleting = true; typeEffect() }, 3200)
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
  font-family: 'Fira Sans', sans-serif;
  --primary-foreground: #333;
  --primary-background: #f0f2f5;
  color: #333;
  --bg: #f0f2f5;
  --primary: #333;
  --accent: #aac1ff;
  --secondary: #6c757d;
  --text: #555;
  --text-light: #777;
  --text-dark: #222;
  --text-muted: #999;
  --text-highlight: #3a65db;
  --border: #e0e0e0;
  --border-light: #f0f0f0;
  --border-dark: #ccc;
  --border-accent: #3a65db;
  --border-radius: 8px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --menu-bg: #ffffff;
  --menu-shadow: 0 1px 13px rgba(12, 28, 255, 0.363);
  --radius: 12px;
  --font: 'Fira Sans', sans-serif;
  --font-mono: 'Fira Mono', monospace;
  box-sizing: border-box;
  overflow: hidden;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 0 1rem;
  background: bla;
}

.menu {
  display: flex;
  gap: 2rem;
  background: var(--menu-bg);
  box-shadow: var(--menu-shadow);
  border-radius: var(--radius);
  padding: 1.2rem 2.5rem;
  margin-bottom: 3rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.1rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 12px;
  transition: background 0.18s, color 0.18s;
}

.menu-item:hover, .menu-item.router-link-exact-active {
  background: var(--accent);
  color: #3a65db;  
}

.icon {
  font-size: 1.3rem;
}

.welcome {
  text-align: center;
}

h1 {
  font-size: 5.5rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -1px;
  margin: 0;
}

.typing {
  color: var(--accent);
  font-family: 'Fira Mono', monospace;
  font-size: 5.5rem;
  font-weight: 700;
  margin-left: 0.4rem;
  color: rgb(39, 43, 250);
}

.cursor {
  display: inline-block;
  color: var(--accent);
  font-size: 2.5rem;
  animation: blink 1s steps(1) infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 600px) {
  .menu {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1.2rem;
  }
  h1, .typing, .cursor {
    font-size: 1.5rem;
  }
}
</style>
