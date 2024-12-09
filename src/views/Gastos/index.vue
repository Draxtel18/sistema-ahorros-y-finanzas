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
					<BotonGastos :planActual="planActual" @gasto-registrado="actualizarGastos" />
				</div>
				<div class="div2">
					<GraficoGastos :planActual="planActual" ref="graficoGastosRef"/>
				</div>
				<div class="div5">
					<GraficoDonutGastos :planActual="planActual" ref="graficoDonutGastosRef"/>
				</div>
				<div class="div3"> Grafico ultimos 6 meses </div>
				<div class="div4">
					<TablaGastos :planActual="planActual" ref="tablaGastosRef" @gasto-editado="actualizarGastos" @gasto-eliminado="actualizarGastos" />
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
import BotonGastos from './components/botonGastos.vue'
import TablaGastos from './components/tablaGastos.vue'
import GraficoGastos from './components/graficoGastos.vue'
import GraficoDonutGastos from './components/graficoDonutGastos.vue'

import { supabase } from '@/lib/supabaseClient.js'

const tablaGastosRef = ref(null)
const graficoGastosRef = ref(null)
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
	graficoGastosRef.value.fetchGastos()
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
	grid-column-gap: 8px;
	grid-row-gap: 8px;
}

.gastos-grid > div {
	border-radius: 1rem;
	padding: 0.6rem;
}

.div1 {
	grid-area: 1 / 1 / 2 / 6;
	background-color: #e6ddd7;
}

.div2 {
	grid-area: 2 / 1 / 6 / 4;
	display: flex;
	align-items: center;
}

.div5{
	grid-area: 2 / 4 / 6 / 6;
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
