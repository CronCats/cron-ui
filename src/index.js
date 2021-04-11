import 'regenerator-runtime/runtime'

import { createApp } from 'vue'

import Home from './pages/Home'

import './nes.min.css'
import './index.css'

const app = createApp(Home)

app.mount('#app')
