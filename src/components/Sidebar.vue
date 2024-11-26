<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="logo">
            <img :src="logoURL" alt="Vue" />
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-symbols-outlined">
                    keyboard_double_arrow_right
                </span>
            </button>
        </div>

        <h3>Menu</h3>
        <div class="menu">
            <router-link to="/" class="button">
                <span class="material-symbols-outlined">home</span>
                <span class="text">Home</span>
            </router-link>
            <router-link to="/ahorros" class="button">
                <span class="material-symbols-outlined">savings</span>
                <span class="text">Ahorros</span>
            </router-link>
            <router-link to="/ingresos" class="button">
                <span class="material-symbols-outlined">receipt</span>
                <span class="text">Ingresos</span>
            </router-link>
            <router-link to="/gastos" class="button">
                <span class="material-symbols-outlined">payments</span>
                <span class="text">Gastos</span>
            </router-link>
            <router-link to="/historial" class="button">
                <span class="material-symbols-outlined">work_history</span>
                <span class="text">Historial</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div class="menu">
            <button @click="logout" class="button logout">
                <span class="material-symbols-outlined">logout</span>
                <span class="text">Logout</span>
            </button>
            <section class="button profile">
                <span class="material-symbols-outlined">account_circle</span>
                <span class="text">{{ userEmail }}</span>
            </section>
            <router-link to="/settings" class="button">
                <span class="material-symbols-outlined">settings</span>
                <span class="text">Settings</span>
            </router-link>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient';
import logoURL from '../assets/logo.svg'
import router from '@/router';

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
}

const logout = async () => {
    try {
        await supabase.auth.signOut();
        router.push('/login');
    } catch (error) {
        console.error('Error al cerrar conexion: ', error);
    }
}

const userEmail = ref('');

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        userEmail.value = user.email;
    }
});

</script>

<style scoped>
.profile {
    cursor: pointer;
}

.logout{
    font-size: 16px;
    width: 100%;
}

aside {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: var(--dark);
    color: var(--light);
    width: calc(2rem + 32px);
    overflow: hidden;
    height: 100vh;
    padding: 1rem;
    transition: 0.2s ease-in-out;
}

aside .flex {
    flex: 1 1 0%;
}

aside .logo {
    margin-bottom: 1rem;
}

aside .logo img {
    width: 2rem;
}

aside .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
}

aside .menu-toggle-wrap .menu-toggle {
    transition: 0.2s ease-in-out;
}

aside .menu-toggle-wrap .menu-toggle .material-symbols-outlined {
    font-size: 2rem;
    color: var(--light);
    transition: 0.2s ease-out;
}

aside .menu-toggle-wrap .menu-toggle:hover .material-symbols-outlined {
    color: var(--primary);
    transform: translateX(0.5rem);
}

aside h3,
aside .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

aside h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}

aside .menu {
    margin: 0 -1rem;
}

aside .menu .button {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    padding: 0.5rem 1rem;
}

aside .menu .button .material-symbols-outlined {
    font-size: 2rem;
    color: var(--light);
    transition: 0.2s ease-in-out;
}

aside .menu .button .text {
    color: var(--light);
    transition: 0.2s ease-in-out;
}

aside .menu .button:hover {
    background-color: var(--dark-alt);
}

aside .menu .button:hover .material-symbols-outlined,
aside .menu .button:hover .text {
    color: var(--primary);
}

aside .menu .button.router-link-exact-active {
    background-color: var(--dark-alt);
    border-right: 5px solid var(--primary);
}

aside .menu .button.router-link-exact-active .material-symbols-outlined,
aside .menu .button.router-link-exact-active .text {
    color: var(--primary);
}

aside .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

aside .footer p {
    font-size: 0.875rem;
    color: var(--grey);
}

aside.is-expanded {
    width: var(--sidebar-width);
}

aside.is-expanded .menu-toggle-wrap {
    top: -3rem;
}

aside.is-expanded .menu-toggle-wrap .menu-toggle {
    transform: rotate(-180deg);
}

aside.is-expanded h3,
aside.is-expanded .button .text {
    opacity: 1;
}

aside.is-expanded .button .material-symbols-outlined {
    margin-right: 1rem;
}

aside.is-expanded .footer {
    opacity: 0;
}

@media (max-width: 1024px) {
    aside {
        position: fixed;
        z-index: 99;
    }
}
</style>