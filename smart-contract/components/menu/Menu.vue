<script setup lang="ts">
import { ref } from 'vue';
import Login from '../login/Login.vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToHome = () => {
  router.push('/home');
  toggleMenu(); // Ferme le menu après la navigation
};
</script>

<template>
  <button @click="toggleMenu" class="menu-button" :class="{ 'rotated': isMenuOpen }">
    ☰ 
  </button>
  <aside :class="['sidebar', { 'open': isMenuOpen }]">
    <ul>
      <li><a @click="goToHome" href="#">Home 🏠</a></li>
      <li><a href="#">Earn 🪙</a></li>
      <li><a href="#">Documentation 📝</a></li>
      <li><a href="#">Profile 🪪</a></li>
      <li><a href="#">Settings ⚙️</a></li>
      <li><a href="#">About 🔎</a></li>
			<Login class="login-btn" />
    </ul>
  </aside>
</template>

<style scoped>
.login-btn {
  position: absolute;
  bottom: 10%;
  right: 0%;
  padding-right: 10px;
}

.menu-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease-in-out;
}

.menu-button.rotated {
  transform: rotate(360deg);
}

.menu-button:focus {
  outline: none;
  box-shadow: none;
}

.sidebar {
  position: fixed;
  top: 60px;
  right: -250px;
  width: 200px;
  height: 100vh;
  background-color: #222;
  color: white;
  transition: right 0.4s ease-in-out;
}

.sidebar.open {
  right: 0;
  top: 60px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: right;
  align-items: center;
  border-radius: 10px;
}

.sidebar li:hover {
  background-color: #333;
  transition: 0.4s;
}

.sidebar a {
  color: white;
  text-decoration: none;
}
</style>
