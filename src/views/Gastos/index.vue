<template>
	<main>
		<section v-if="loading">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
		</section>
		<section v-else>
			<div class="gastos-grid" v-if="planActual">
				<div class="div1">
					<BotonGastos @gasto-registrado="actualizarGastos" />
				</div>
				<div class="div2"> Categorias </div>
				<div class="div3"> Grafico ultimos 6 meses </div>
				<div class="div4">
					<TablaGastos ref="tablaGastosRef" />
				</div>
			</div>
			<div v-else>
				<p>No tienes un plan activo.</p>
				<router-link to="/">Ir a inicio</router-link>
			</div>
		</section>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BotonGastos from './components/botonGastos.vue';
import TablaGastos from './components/tablaGastos.vue'
import { supabase } from '@/lib/supabaseClient.js'

const tablaGastosRef = ref(null)
const loading = ref(true)
const user = ref(null)
const planActual = ref(null)

async function fetchUser() {
	const { data } = await supabase.auth.getUser()
	user.value = data.user
}

async function cargarPlanActual() {
	const { data, error } = await supabase
		.from("planesfinanzas")
		.select("*")
		.eq("estado", "activo")
		.eq("id_usuario", user.value.id)
		.maybeSingle();

	if (error) {
		console.error("Error al cargar el plan actual:", error.message)
		planActual.value = null
	} else {
		planActual.value = data
	}
}

const actualizarGastos = () => {
	tablaGastosRef.value.fetchGastos()
}

onMounted(async () => {
	await fetchUser()
	await cargarPlanActual()
	loading.value = false
})

</script>

<style scoped>
section {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.gastos-grid {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(11, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
}

.gastos-grid > div {
	border-radius: 1rem;
	padding: 0.6rem;
}

.div1 {
	grid-area: 1 / 1 / 3 / 6;
	background-color: #e6ddd7;
}

.div2 {
	grid-area: 3 / 1 / 6 / 6;
}

.div3 {
	grid-area: 1 / 6 / 6 / 11;
}

.div4 {
	grid-area: 6 / 1 / 12 / 11;
	background-color: transparent;
	border: 1px solid #6B7280;
}
</style>
