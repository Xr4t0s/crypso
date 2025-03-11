<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const stayLogged = ref(false);

const activeTab = ref<'login' | 'register'>('login');
const isLoading = ref(false);
const isTransitioning = ref(false);

const errorMessage = ref('')

const Login = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("https://dapp-crypso-heroku-01adf7990845.herokuapp.com/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        stayLogged: stayLogged.value
      })
    });
		const data = await response.json();
		if (!response.ok) throw new Error(data.message)
		localStorage.setItem('token', data.access_token)
  } catch (error: any) {
    return;
  } finally {
    isLoading.value = false;
  }
	window.location.assign('/profile')
};

const Signup = async () => {
	isLoading.value = true;
	console.log("Tentative d'enregistrement...")
	errorMessage.value = ""
	try {
		const response = await fetch('https://dapp-crypso-heroku-01adf7990845.herokuapp.com/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username.value,
				email: email.value,
				password: password.value
			})
		})
		const data = await response.json()
		if (!response.ok) throw new Error(data.message)
		localStorage.setItem('token', data.token)
	}
	catch (error: any) {
		if (error.response && error.response.data) {
			errorMessage.value = error.response.data.message || "Une erreur est survenue."
		} else if (error.message) {
			errorMessage.value = error.message
		} else {
			errorMessage.value = "Une erreur inconnue est survenue."
		}
	}
	finally {
    isLoading.value = false;
  }
	window.location.replace('/profile');
}

const switchTab = (tab: 'login' | 'register') => {
  if (activeTab.value === tab || isTransitioning.value) return;

  isTransitioning.value = true;
  setTimeout(() => {
    activeTab.value = tab;
    isTransitioning.value = false;
  }, 200); // Temps de l'animation
};

</script>

<template>
  <div class="text-3xl mt-6 flex justify-around font-bold mb-4 w-full border border-emerald-700 rounded-lg
	transform transition-all duration-700 translate-x-[-100%] opacity-0 animate-slide-in">
    <button 
      class="w-full px-4 py-2 rounded-l-lg transition-all duration-300"
      :class="{'bg-emerald-900': activeTab === 'login', 'bg-black hover:bg-emerald-900 opacity-50': activeTab !== 'login'}"
      @click="switchTab('login')">
      Login
    </button>
    <button 
      class="w-full px-4 py-2 rounded-r-lg transition-all duration-300"
      :class="{'bg-emerald-900': activeTab === 'register', 'bg-black hover:bg-emerald-900 opacity-50': activeTab !== 'register'}"
      @click="switchTab('register')">
      Register
    </button>
  </div>

  <!-- Conteneur avec animation -->
  <div class="transition-container" :class="{ 'fade-out': isTransitioning }">
    <form v-if="activeTab === 'login'" @submit.prevent="Login" class="bg-black p-6 rounded-lg shadow-md w-auto md:w-160 h-auto border border-emerald-700">
      <input v-model="email" type="email" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="Enter your email" required />
      <input v-model="password" type="password" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="********" required />
      <button type="submit" class="w-full hover:scale-102 focus:scale-95 bg-gradient-to-tr from-emerald-800 to-black mt-8 bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all duration-300 transform" :class="{ 'scale-95 opacity-75': isLoading }" :disabled="isLoading">
        {{ isLoading ? '...' : 'Connect' }}
      </button>
    </form>

    <form v-if="activeTab === 'register'" @submit.prevent="Signup" class="bg-black p-6 rounded-lg shadow-md w-auto md:w-160 h-auto border border-emerald-700">
      <input v-model="username" type="text" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="Enter a username" required />
			<input v-model="email" type="email" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="Enter your email" required />
      <input v-model="password" type="password" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="Enter your password" required />
      <input v-model="confirmPassword" type="password" class="w-full p-2 rounded bg-gray-700 text-white mb-4 placeholder:text-sm" placeholder="Confirm your password" required />
      <button type="submit" class="w-full mt-8 hover:scale-102 focus:scale-95 bg-gradient-to-tr from-emerald-800 to-black bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all duration-300 transform" :class="{ 'scale-95 opacity-75': isLoading }" :disabled="isLoading">
        {{ isLoading ? '...' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Animation de transition */
.fade-out {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.transition-container {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}


</style>