<script setup>
import { RouterView, useRoute } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
</script>

<template>
    <SpeedInsights />
    <Sidebar v-if="route.name !== 'login' && route.name !== 'register'"/>
    <RouterView />
</template>

<style>
:root {
    --primary: #4ade80;
    --primary-alt: #22c55e;
    --grey: #64748b;
    --dark: #1e293b;
    --dark-alt: #334155;
    --light: #f1f5f9;
    --sidebar-width: 300px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

#app {
    display: flex; 
}

#app main {
    flex: 1 1 0;
    padding: 2rem;
    overflow-y: auto;
    margin-left: 4rem;
    width: 100%;
	height: 100vh;
    display: flex;
	align-items: center;
	justify-content: center;
}

@media (max-width: 1024px) {
    .app main {
        padding-left: 6rem;
    }
}

circle {
    fill: none;
    stroke: hsl(214, 97%, 59%);
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
}

svg {
    width: 6em;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>


<!--
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const countries = ref([])

async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data
}

onMounted(() => {
    getCountries()
})
</script>

<template>
    <ul>
        <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
    </ul>
</template>
-->
