import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locales/index'
import initAxios from '@/api/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
initAxios()

app.mount('#app')
