import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/global.scss'

import { faRightToBracket, faMagnifyingGlass, faChevronUp, faSort, faArrowDownAZ, faCoffee, faAddressCard, faCartShopping, faCaretUp, faStar, faMoneyBillWave, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Thêm các biểu tượng vào thư viện Font Awesome
library.add(faRightToBracket, faMagnifyingGlass, faChevronUp, faSort, faArrowDownAZ, faCoffee, faAddressCard, faCartShopping, faCaretUp, faStar, faMoneyBillWave, faArrowDownZA);
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)

app.mount('#app')

export default app
