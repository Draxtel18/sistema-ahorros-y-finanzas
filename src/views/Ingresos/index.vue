<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
import TablaIngresos from './components/tablaIngresos.vue';
import BotonIngresos from './components/botonIngresos.vue';
import GraficoUltimosIngresos from './components/graficoUltimosIngresos.vue';
import PromedioIngresos from './components/promedioIngresos.vue';

const tablaIngresosRef = ref(null)
const graficoUltimosRef = ref(null)
const promedioIngresosRef = ref(null)
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


		console.log(data);
		
	if (error) {
		console.error("Error al cargar el plan actual:", error.message)
		planActual.value = null
	} else {
		planActual.value = data
	}
}

const actualizarGastos = () => {
	tablaIngresosRef.value.fetchIngreso()
	graficoUltimosRef.value.fetchIngreso()
	promedioIngresosRef.value.fetchIngreso()
}


onMounted(async () => {
	await fetchUser()
	await cargarPlanActual()
	loading.value = false
})

</script>

<template>
	<main>
		<section v-if="loading">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
		</section>
		<section v-else>
			<div class="ingresos-grid" v-if="planActual">
				<div class="div1">
					<BotonIngresos :planActual="planActual" @ingreso-registrado="actualizarGastos" />
				</div>
				<div class="div2">
					<PromedioIngresos :planActual="planActual" ref="promedioIngresosRef"/>
				</div>
				<div class="div3">
					<GraficoUltimosIngresos :planActual="planActual" ref="graficoUltimosRef"/>
				</div>
				<div class="div4">
					<TablaIngresos :planActual="planActual" ref="tablaIngresosRef" @ingreso-editado="actualizarGastos" @ingreso-eliminado="actualizarGastos" />
				</div>
			</div>
			<div v-else>
				<p>No tienes un plan activo.</p>
				<router-link to="/">Ir a inicio</router-link>
			</div>
		</section>
	</main>
</template>


<style scoped>

section {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.ingresos-grid {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(11, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
}

.ingresos-grid > div {
	border-radius: 1rem;
	padding: 0.6rem;
}

.div1 {
	grid-area: 1 / 1 / 3 / 6;
	background-color: #e6ddd7;
}

.div2 {
	grid-area: 3 / 1 / 6 / 6;
	padding: 0 !important;
}

.div3 {
	grid-area: 1 / 6 / 6 / 11;
	display: flex;
	align-items: center;
	justify-content: center;
}

.div4 {
	grid-area: 6 / 1 / 12 / 11;
	background-color: transparent;
	border: 1px solid #6B7280;
}


@media (max-width: 900px) {
	.ingresos-grid {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	.div1,
	.div2,
	.div3,
	.div4 {
		grid-area: auto;
		width: 100%;
		height: fit-content;
	}
}
</style>
