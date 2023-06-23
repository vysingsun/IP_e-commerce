import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/homeAdmin/category',
      name: 'homeAdmin/category',
      component: () => import('../views/HomeAdminView.vue')
    },
    {
      path: '/homeAdmin/item',
      name: 'homeAdmin/item',
      component: () => import('../views/ItemAdminView.vue')
    },
    {
      path: '/homeAdmin/product',
      name: 'homeAdmin/product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue')
    }
  ]
})

export default router
