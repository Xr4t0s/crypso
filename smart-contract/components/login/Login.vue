<script setup lang="ts">
import { ref } from 'vue'
// import SignUp from './components/SignUp.vue'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isMenuOpen = ref(false)
const activeTab = ref<'login' | 'signup'>('login') // Gère les onglets

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value
}

const login = async () => {
	console.log("Tentative de connexion...")
	errorMessage.value = ""
	try {
		const response = await fetch('http://localhost:3000/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value
		})
		})
		const data = await response.json()
		console.log(data)
		if (!response.ok) throw new Error(data.message)
		localStorage.setItem('token', data.access_token)
	}
	catch (error: any) {
		if (error.response && error.response.data) {
			// Si l'API retourne un message d'erreur
			errorMessage.value = error.response.data.message || "Une erreur est survenue."
		} else if (error.message) {
			// Si l'erreur a un message spécifique
			errorMessage.value = error.message
		} else {
			// Erreur générique
			errorMessage.value = "Une erreur inconnue est survenue."
		}
	}

}

const signup = async () => {
	console.log("Tentative d'enregistrement...")
	errorMessage.value = ""
	try {
		const response = await fetch('http://localhost:3000/auth/signup', {
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
			// Si l'API retourne un message d'erreur
			errorMessage.value = error.response.data.message || "Une erreur est survenue."
		} else if (error.message) {
			// Si l'erreur a un message spécifique
			errorMessage.value = error.message
		} else {
			// Erreur générique
			errorMessage.value = "Une erreur inconnue est survenue."
		}
	}
}

const GoogleLogin = () => {
  window.location.href = "http://localhost:3000/auth/google/redirect";
};

</script>

<template>
	<div>
	  <Button @click="toggleMenu" class="button login">Connect</button>
  
	  <Teleport to="body">
		<div v-if="isMenuOpen" class="modal-overlay" @click="toggleMenu">
		  <div class="modal-content" @click.stop>

			  <button :class="{ active: activeTab === 'login' }" class="button" @click="activeTab = 'login'">Login</button>
			  <button :class="{ active: activeTab === 'signup' }" class="button" @click="activeTab = 'signup'">Register</button>

			<div class="tab-content">
			  <div v-if="activeTab === 'login'">
				<h4>Log-in to your account with your email !</h4>
				<form @submit.prevent="login">
				  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				  <input v-model="email" type="email" placeholder="Enter your email" required />
				  <input v-model="password" type="password" placeholder="Enter your password" required />
				  <button type="submit" class="button">Login</button>
				</form>
			  </div>
  
			  <div v-else>
				<h4>Open an account easily</h4>
				<form @submit.prevent="signup">
				  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				  <input v-model="username" type="username" placeholder="Enter your username" required />
				  <input v-model="email" type="email" placeholder="Enter your email" required />
				  <input v-model="password" type="password" placeholder="Enter your password" required />
				  <button type="submit" class="button">Register</button>
				</form>
				<h4>You can also signup using your socials account !</h4>
				<button @click="GoogleLogin" class="button google-login">
					<img class="google-icon" src="/google.svg" alt="Google logo" />
				</button>
			  </div>
			</div>
		  </div>
		</div>
	  </Teleport>
	</div>
  </template>
  
  
  <style scoped>
  .button {
	color: white;
  }
  .google-login {
	padding-left: 15px;
	width: 40px;
	outline: none;
  }

  .google-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10px;
	scale: 2.5;
	height: 20px;
  }

  /* Overlay */
  .modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
  }
  
  /* Contenu de la modale */
  .modal-content {
	background: #222;
	color: white;
	padding: 20px;
	border-radius: 10px;
	width: 350px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 1);
	position: relative;
  }
  

  .tabs button {
	flex: 1;
	border: none;
	cursor: pointer;
	background: #444;
	color: white;
	transition: 0.3s;
  }
  .tabs button:hover {
	background: #666;
  }
  
  .tabs button.active {
	background: #666;
	font-weight: bold;
	outline: none;
  }
  
  /* Contenu des onglets */
  .tab-content {
	display: flex;
	flex-direction: column;
	align-items: left;
  }
  
  /* Bouton de fermeture */
  .close-button {
	position: absolute;
	top: 2px;
	right: 2px;
	background: none;
	border: none;
	color: white;
	font-size: 12px;
	cursor: pointer;
  }
  
  .close-button:hover {
	background-color: red;
  }
  
  /* Formulaire */
  form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-bottom: 10px;
  }
  
  input {
	padding: 8px;
	border: 1px solid #444;
	border-radius: 15px;
	background: #333;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  
  .error {
	color: red;
	font-size: 14px;
	margin-top: 10px;
  }
  </style>
  