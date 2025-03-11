<script setup>
import { watch } from "vue";
import { computed, ref } from "vue";
import { account, connect, accountDetails } from "@kolirt/vue-web3-auth";

// Adresse formatée pour affichage
const formattedAddress = computed(() => {
  if (!account.address) return "";
  return account.address.slice(0, 6) + "..." + account.address.slice(-4);
});

// État pour stocker la réponse du backend
const apiResponse = ref(null);
const mark = ref(false);

const loginWallet = async () => {
	if (!account.address) {
    console.warn("Aucune adresse de wallet connectée");
    return;
  }

  try {
    const response = await fetch("https://crypso-19f91d81c0fa.herokuapp.com/auth/walletLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: account.address }),
    });

    const data = await response.json();
    apiResponse.value = data;
    console.log("Réponse API :", data);
		localStorage.setItem('token', data.access_token)
		mark.value = !mark.value
		window.location.hre = '/earn'
  } catch (error) {
    console.error("Erreur API :", error);
  }
}

// Fonction pour appeler l'API NestJS
const identicateWallet = async () => {
  if (!account.address) {
    console.warn("Aucune adresse de wallet connectée");
    return;
  }

  try {
    const response = await fetch("https://crypso-19f91d81c0fa.herokuapp.com/auth/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: account.address }),
    });

    const data = await response.json();
    apiResponse.value = data.message;
		if (apiResponse.value === "Wallet déjà enregistré")
			await loginWallet()
  } catch (error) {
    console.error("Erreur API :", error);
  }
};

watch(
  () => account.connected, // Observe le changement de connexion
  (isConnected) => {
    if (isConnected) {
      identicateWallet(); // Exécute la fonction quand la connexion est réussie
			isConnected = !isConnected
    }
		if (!isConnected && localStorage.getItem('token'))
			localStorage.removeItem('token')
  }
);

</script>

<template>
  <div v-if="account.connected" class="flex flex-col">
    <button @click="accountDetails()" class="text-left">
      {{ formattedAddress }}
    </button>
  </div>

  <div v-else class="flex flex-col">
    <button @click="connect()">
      Connect
    </button>
  </div>
</template>

