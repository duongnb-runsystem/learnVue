import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/global.scss'

import { faEye, faEyeSlash, faRightToBracket, faMagnifyingGlass, faChevronUp, faSort, faArrowDownAZ, faCoffee, faAddressCard, faCartShopping, faCaretUp, faStar, faMoneyBillWave, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Thêm các biểu tượng vào thư viện Font Awesome
library.add(faEye, faEyeSlash, faRightToBracket, faMagnifyingGlass, faChevronUp, faSort, faArrowDownAZ, faCoffee, faAddressCard, faCartShopping, faCaretUp, faStar, faMoneyBillWave, faArrowDownZA);
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();
app.use(router)
app.use(pinia)

app.mount('#app')

export default app
