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

// Guard de navegación global para verificar autenticación
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession();
  const isAuthenticated = !!data.session;

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    // Si el usuario ya está autenticado, redirige al home desde login o register
    next({ name: 'home' });
  } else {
    // Permite la navegación
    next();
  }
});


export default router


/*

import { useUserStore } from '@/stores/useUserStore';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Ruta protegida
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardar navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/'); // Redirigir a la página de login si no está autenticado
  } else {
    next(); // Continuar a la ruta solicitada
  }
});


// src/stores/useUserStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api'; // Asegúrate de importar tu API aquí

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null); // Información del usuario
  const isLoggedIn = computed(() => userInfo.value !== null); // Computado para verificar si está logueado

  const updateUserInfo = (user) => {
    userInfo.value = user;
    localStorage.setItem('jwt-token', user.token); // Guardar el token en localStorage
  };

  const login = async (formStore) => {
    const { user } = await api.login(formStore);
    updateUserInfo(user);
  };

  const register = async (formStore) => {
    const { user } = await api.register(formStore);
    updateUserInfo(user);
  };

  const logout = () => {
    userInfo.value = null; // Limpiar información del usuario
    localStorage.removeItem('jwt-token'); // Eliminar el token de localStorage
  };

  return { userInfo, isLoggedIn, login, register, logout };
});

<!-- src/views/Login.vue -->
<template>
  <form @submit.prevent="onLogin">
    <input v-model="form.username" placeholder="Username" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <router-link to="/register">No tienes una cuenta? Regístrate aquí</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const form = ref({ username: '', password: '' });

const onLogin = async () => {
  try {
    await userStore.login(form.value);
    router.push('/dashboard'); // Redirigir al dashboard tras login exitoso
  } catch (error) {
    console.error(error); // Manejo de errores (puedes mostrar un mensaje al usuario)
  }
};
</script>


<!-- src/views/Register.vue -->
<template>
  <form @submit.prevent="onRegister">
    <input v-model="form.username" placeholder="Username" required />
    <input v-model="form.email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
    <router-link to="/">Ya tienes una cuenta? Inicia sesión aquí</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const form = ref({ username: '', email: '', password: '' });

const onRegister = async () => {
  try {
    await userStore.register(form.value);
    router.push('/dashboard'); // Redirigir al dashboard tras registro exitoso
  } catch (error) {
    console.error(error); // Manejo de errores
  }
};
</script>
*/