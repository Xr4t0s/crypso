<script setup lang="ts">
</script>
<template>
	<div class="w-full min-h-screen p-6 text-white">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <!-- 📌 Profil (Colonne 1 - fixe) -->
      <div class="bg-black p-6 rounded-lg shadow-lg border border-emerald-700 flex flex-col items-center">
        <img src="/vite.svg" alt="Avatar" class="w-32 h-32 rounded-full border-4 border-emerald-500">
        <h2 class="mt-4 text-2xl font-bold">John Doe</h2>
        <p class="text-emerald-400">@johndoe</p>
      </div>

      <!-- 📌 Stats & Infos (Colonne 2 & 3 - extensibles) -->
      <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Stats Box 1 -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-emerald-700 text-center">
          <h3 class="text-lg font-semibold">Total Abonnements</h3>
          <p class="text-3xl font-bold text-emerald-400">125</p>
        </div>

        <!-- Stats Box 2 -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-emerald-700 text-center">
          <h3 class="text-lg font-semibold">Références</h3>
          <p class="text-3xl font-bold text-emerald-400">42</p>
        </div>

        <!-- Stats Box 3 -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-emerald-700 text-center">
          <h3 class="text-lg font-semibold">Notifications</h3>
          <p class="text-3xl font-bold text-emerald-400">8</p>
        </div>

        <!-- Stats Box 4 -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-emerald-700 text-center">
          <h3 class="text-lg font-semibold">Total Gagné</h3>
          <p class="text-3xl font-bold text-emerald-400">1.2 ETH</p>
        </div>
      </div>
    </div>
  </div>
	<!-- <div data-aos="fade-in" data-aos-duration="3000" class="w-auto gap-12 m-6 p-6 mt-6 h-auto rounded-2xl flex flex-col md:flex-row items-center justify-self-auto text-white font-bold border border-emerald-700 bg-black">
		<img src="/vue.svg"  class="w-48 md:w-72"/>
		<div class="text-4xl bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent text-center flex-row md:text-right md:text-5xl">
			Ici les utilisateurs trouverons leur profile ainsi que leurs
		<span class="text-emerald-500 animate-pulse">
			stats, abonnements, referals, etc
		</span>
		</div>
	</div> -->
</template>