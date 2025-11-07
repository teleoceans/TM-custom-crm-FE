import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'flowbite'

// Initialize theme early before app mounts
function initializeTheme() {
  if (typeof window === 'undefined') return
  
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = stored ? stored === 'dark' : prefersDark
  
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Initialize theme immediately
initializeTheme()

const app = createApp(App)

app.use(router)

app.mount('#app')
