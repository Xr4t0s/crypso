<script setup lang="ts">
import Header from './components/Headers/Header.vue';
import { ref, onMounted } from 'vue';

const bgClass = ref('bg-gray-900 bg-gradient-to-r from-gray-900 to-emerald-900 animate-gradient');

onMounted(() => {
  document.getElementById('app')?.classList.add(...bgClass.value.split(' '));
});
</script>

<template>
  <div class="flex flex-col justfiy-beetween pt-14 items-center p-6 min-h-screen bg-black bg-gradient-to-tr from-black to-emerald-900 text-white animate-gradient">
  <div class="relative z-10">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
  </div>
</template>