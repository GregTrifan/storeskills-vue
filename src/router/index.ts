import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'StoreSkills'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login - StoreSkills'
    }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: {
      title: 'Products - StoreSkills',
      requiresAuth: true
    }
  },
  {
    path: '/product/:id?',
    name: 'product',
    component: ProductDetailView,
    props: true,
    meta: {
      title: 'Product Details - StoreSkills',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Not Found - StoreSkills'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

/**
 * Check if a route requires authentication
 */
const requiresAuth = (to: RouteLocationNormalized): boolean => {
  return !!to.meta.requiresAuth
}

/**
 * Navigation guard to check authentication
 */
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  
  // Set document title
  document.title = (to.meta.title as string) || 'StoreSkills'
  
  // Check if the route requires authentication
  if (requiresAuth(to)) {
    // If user is not authenticated, redirect to login
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  // If trying to access login page while already authenticated, redirect to home
  if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }
  
  next()
})

export default router
