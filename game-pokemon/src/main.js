import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import Card from './views/Card.vue'
const app = createApp(App);
app.use(router);
app.mount('#app');
app.component('Card', Card);
