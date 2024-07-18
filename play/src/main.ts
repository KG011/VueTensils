import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@kg01/components/icons'
import '@kg01/theme-chalk/src/index.scss'
import Tree from '@kg01/components/tree'
import Button from '@kg01/components/button'

const plugins=[
    Icon,
    Tree,
    Button
]
const app=createApp(App)
plugins.forEach(plugin=>app.use(plugin))
app.mount('#app')
