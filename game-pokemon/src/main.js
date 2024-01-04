import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router/index.js'
import Card from '@/components/Card.vue'
import ProcessBar from '@/components/ProcessBar.vue'
import ButtonCustom from '@/components/ButtonCustom.vue'
const app = createApp(App);
app.use(router);
app.mount('#app');
app.component('Card', Card);
app.component('ProgressBar', ProcessBar)
app.component('ButtonCustom', ButtonCustom)
