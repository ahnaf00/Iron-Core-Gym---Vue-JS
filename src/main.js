import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)
const pinia  = createPinia()

app.use(pinia)
app.use(router)
// createApp(App).mount('#app')
app.mount('#app')
