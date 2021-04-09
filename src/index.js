import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import VueNear from './plugins/VueNear'

import Home from './pages/Home'

import './index.css'

const app = createApp(Home)

app.use(VueNear, {
  env: process.env.NODE_ENV || 'development',
  config: {
    appTite: 'Cron',
    contractName: 'cron.testnet'
  }
})

app.mount('#app')
