<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
	data() {
		return {
			planActual: null,
			loading: true,
		}
	},
	methods: {
		async cargarPlanActual() {
			const { data, error } = await supabase
				.from("planesfinanzas")
				.select("*")
				.eq("estado", "activo")
				.eq("id_usuario", user.id)
				.maybeSingle();


			if (error) {
				console.error("Error al cargar el plan actual:", error.message);
				this.planActual = null;
			} else {
				this.planActual = data;
			}
		},
	},
	async mounted() {
		await this.cargarPlanActual();
		this.loading = false;
	}
}
</script>

<template>
	<main>
		<section v-if="loading">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
		</section>
		<section v-else>
			<div class="ahorros-grid" v-if="planActual">
				<div class="div1"> Ahorros </div>
				<div class="div2"> Hola </div>
				<div class="div3"> Hola </div>
				<div class="div4"> Hola </div>
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

.ahorros-grid {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(11, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
}

.ahorros-grid > div {
	background-color: blue;
	border-radius: 1rem;
	padding: 0.6rem;
}

.div1 {
	grid-area: 1 / 1 / 3 / 6;
}

.div2 {
	grid-area: 3 / 1 / 6 / 6;
}

.div3 {
	grid-area: 1 / 6 / 6 / 11;
}

.div4 {
	grid-area: 6 / 1 / 12 / 11;
}
</style>