import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '257151218243-dui64n8itieftij6d5j1oheug45e4sb2.apps.googleusercontent.com'
})


createApp(App).mount('#app')
