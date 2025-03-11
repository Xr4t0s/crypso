import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import VueConnectWallet from "../node_modules/vue-connect-wallet";
import {Chains, createWeb3Auth} from '@kolirt/vue-web3-auth'

const app = createApp(App)

app.use(createWeb3Auth({
	projectId: 'd61d68cb1a573a4678dc4bcad697bd68', // generate here https://cloud.walletconnect.com/ and turn on 'Supports Sign v2'
	chains: [
			Chains.base,
			Chains.mainnet,
			Chains.polygon,
			Chains.arbitrum
	]
}))
app.use(VueConnectWallet)
app.use(router)
app.mount('#app')