import 'regenerator-runtime/runtime'

import VueNear from './plugins/near'
import { createApp, h } from 'vue'

import './nes.min.css'
import './index.css'

const routes = {
  '/': 'Home',
  '/tasks': 'Tasks',
  '/create-task': 'CreateTask',
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    ViewComponent() {
      const matchingPage = routes[this.currentRoute] || '404'
      return require(`./pages/${matchingPage}.vue`).default
    }
  },

  render() {
    return h(this.ViewComponent)
  },

  created() {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
    })
  }
}

const app = createApp(SimpleRouter)

app.use(VueNear, { env: process.env.NODE_ENV || 'development' })

app.mount('#app')
