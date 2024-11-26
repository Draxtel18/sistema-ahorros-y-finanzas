<script setup>
import { RouterView, useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
</script>

<template>
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
}

@media (max-width: 1024px) {
    .app main {
        padding-left: 6rem;
    }
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
