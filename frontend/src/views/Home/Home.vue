<script setup lang="ts">
</script>
<template>
	<div data-aos="fade-in" data-aos-duration="3000" class="w-auto gap-12 m-6 p-6 h-auto rounded-2xl flex flex-col md:flex-row items-center justify-self-auto text-white font-bold border border-emerald-700 bg-black">
		<img src="/vue.svg"  class="w-48 md:w-72"/>
			<div class="text-3xl bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent text-center flex-row md:text-right md:text-4xl">
				Finally get your customers to read your
			<span class="text-emerald-500 animate-pulse">
				newsletters
			</span>
			!<br><br>Mdrrr c'est ma première page puissante sa grand mère la reine de keh
			</div>
  	</div>
	<div class="text-4xl pt-24 pb-24 text-bold italic text-center">Bref ici ca sera la page d'acceuil du site ou je ferais une présentation du projet et ou je mettrais tout les liens et compagnies et des petits effets.</div>
</template>

<style>
@keyframes slide-in {
	from {
		transform: translateX(0);
		opacity: 0;
	}
	to {
		transform: translateX(100%);
		opacity: 1;
	}
}

.animate-slide-in {
	animation: slide-in 0.7s ease-out forwards;
}
</style>