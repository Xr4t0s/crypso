<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ConnectButton from "../Wallet/LoginWithWallet.vue";

const router = useRouter();
const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null); // Référence pour le menu

const Items = [
  { name: "Home", link: "/" },
  { name: "Earn", link: "/earn" },
  { name: "Documentation", link: "/docs" },
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
  { name: "About", link: "/about" },
  { name: "Login", link: "/login" },
  { name: "Connect" },
];

const navigateTo = (link: string) => {
  router.push(link).catch((err) => console.warn("Navigation error:", err));
};

// Toggle menu (empêche propagation pour éviter fermeture immédiate)
const toggleMenu = (event: Event) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleClick = (link: string) => {
  isMenuOpen.value = false;
  navigateTo(link);
};

// Fermer le menu si clic en dehors
const handleClickOutside = (event: MouseEvent) => {
  if (isMenuOpen.value && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <!-- Navbar -->
  <header class="fixed top-0 left-0 w-full bg-black bg-gradient-to-b shadow-lg z-50">
    <div class="w-full flex m-1 xl:px-4 justify-center md:justify-between items-center opacity-80 py-2 px-4">
      <!-- Logo -->
      <div class="text-xl font-bold tracking-wide">
        <a href="/" class="flex items-center gap-2">
          <span class="flex justify-center text-emerald-500 hover:scale-110 duration-500">KRTS</span>
        </a>
      </div>

      <!-- Menu Desktop -->
      <nav class="hidden md:flex space-x-6">
        <template v-for="item in Items" :key="item.name">
          <a v-if="item.link" @click="navigateTo(item.link)"
            class="text-xl hover:text-emerald-300 px-1 hover:bg-emerald-900 rounded-lg hover:scale-105 transition font-custom cursor-pointer">
            {{ item.name }}
          </a>
          <!-- Bouton Connect -->
          <ConnectButton v-else class="text-xl hover:text-emerald-300 px-1 hover:bg-emerald-900 rounded-lg hover:scale-105 transition font-custom cursor-pointer"/>
        </template>
      </nav>

      <!-- Bouton Burger (Mobile) -->
      <button @click="toggleMenu" class="md:hidden fixed bottom-[20px] right-[20px] scale-90 bg-black rounded-full p-1.5"
			:class="{'rotate-[180deg]': isMenuOpen, 'rotate-[-180deg]': !isMenuOpen}">
          <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" width="30" height="30"/>
      </button>
    </div>

    <!-- Menu Mobile avec Animation (Position en bas à droite) -->
    <transition name="slide-menu" class="border border-emerald-400">
      <div v-if="isMenuOpen" ref="menuRef"
        class="fixed bottom-16 right-5 w-60 bg-black rounded-2xl p-4 shadow-lg md:hidden">
        <ul class="flex flex-col space-y-3">
          <li v-for="item in Items" :key="item.name">
            <button v-if="item.link" @click="toggleClick(item.link)"
              class="text-emerald-500 hover:text-emerald-300 hover:bg-emerald-900 p-2 rounded-lg hover:scale-105 transition text-xl w-full text-left">
              {{ item.name }}
            </button>
          </li>
          <!-- Bouton Connect -->
          <li>
            <ConnectButton class="text-emerald-500 hover:text-emerald-300 hover:bg-emerald-900 p-2 rounded-lg hover:scale-105 transition text-xl w-full text-left" />
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-menu-enter-active, .slide-menu-leave-active {
  transition: transform 0.4s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-menu-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-menu-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
