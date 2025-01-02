import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import radioView from '../views/radioView.vue'
import InicioSesion from '../views/InicioSesion.vue'
import cancionesView from '../views/cancionesView.vue'
import PerfilView from '@/views/perfilView.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/canciones'
  },
  {
    path:'/login',
    name:'login',
    component:InicioSesion,
    
  },
  {
    path:'/canciones',
    name:'canciones',
    component:cancionesView,
  }, 
  {
    path:'/radio',
    name:'radio',
    component:radioView,
  }, 
  {
    path:'/perfil',
    name:'perfil',
    component:PerfilView,
  }, 
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router