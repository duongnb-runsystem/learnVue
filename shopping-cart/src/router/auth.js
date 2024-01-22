import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRestaurantStore } from '@/stores/restaurant.js';
import fireBaseApp from '@/firebase.js';

const checkAuth = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/home' || to.path === '/') {
      const auth = getAuth(fireBaseApp);
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          to.path === '/home' ? next() : next('/home');
        } else {
          to.path === '/' ? next() : next('/');
        }
      });
    } else {
      next();
    }

    if (to.path === '/home' && from.path === '/shop') {
      useRestaurantStore().setRestaurant(null);
      next();
    }
  });
};

export default checkAuth;
