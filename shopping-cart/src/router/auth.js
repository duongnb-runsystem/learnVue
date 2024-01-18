import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  });
};

export default checkAuth
