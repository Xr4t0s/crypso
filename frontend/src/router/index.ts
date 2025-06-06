import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/Home.vue';
import EarnView from '../views/Earn/Earn.vue';
import ProfileView from '../views/Profile/Profile.vue';

const routes = [
	{ path: '/', component: HomeView},
  { path: '/earn', component: EarnView },
  { 
		path: '/profile',
		component: ProfileView,
		meta: {
			requiresAuth: true
		}
	}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: "smooth" });
      }, 300); // Ajoute un léger délai de 300ms
    });
  }
});


router.beforeEach(async (to, from, next) => {
	from;
  const token = localStorage.getItem('token'); 

  if (to.meta.requiresAuth) {
    if (!token) {
      alert("⚠️ Vous devez être connecté pour accéder à cette page.");
      next('/'); // Pas de token = accès refusé
    } else {
      try {
        // 🔥 Envoie du token au serveur pour validation
        const response = await fetch("https://crypso-19f91d81c0fa.herokuapp.com/auth/validate-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // 🔥 Envoie du token dans les headers
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          next(); // ✅ Le token est valide, on accède à /profile
        } else {
          throw new Error("Token invalide");
        }
      } catch (error) {
        console.warn("Échec de la validation du token :", error);
        alert("❌ Votre session a expiré ou est invalide. Veuillez vous reconnecter.");
        localStorage.removeItem('token'); // Supprime le token invalide
        next('/earn'); // Redirection vers login
      }
    }
  } else {
    next(); // Si la route n'est pas protégée, on continue normalement
  }
});


export default router;
