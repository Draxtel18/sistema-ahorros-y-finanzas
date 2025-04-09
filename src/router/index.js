import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Settings from '@/views/Settings/index.vue'

// --------------
const Ahorros = () => import('@/views/Ahorros/index.vue');
const Ingresos = () => import('@/views/Ingresos/index.vue');
const Gastos = () => import('@/views/Gastos/index.vue');
const Historial= () => import('@/views/Historial/index.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true }
    },
    {
      path: '/ingresos',
      name: 'ingresos',
      component: Ingresos,
      meta: { requiresAuth: true }
    },
    {
      path: '/ahorros',
      name: 'ahorros',
      component: Ahorros,
      meta: { requiresAuth: true }
    },
    {
      path: '/gastos',
      name: 'gastos',
      component: Gastos,
      meta: { requiresAuth: true }
    },
    {
      path: '/historial',
      name: 'historial',
      component: Historial,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession();
  const isAuthenticated = !!data.session;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router
