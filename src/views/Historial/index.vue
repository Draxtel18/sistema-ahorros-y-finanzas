<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
	data() {
		return {
			planes: [],
			loading: true,
		}
	},
	methods: {
		async fetchPlanes() {
			try {
				if (!user) return;

				const { data: planes, error } = await supabase
					.from('planesfinanzas')
					.select('*')
					.eq('id_usuario', user.id)
					.order('created_at', { ascending: false })

				if (error) throw error;
				this.planes = planes;
			} catch (error) {
				console.error('Error cargando los planes:', error.message);
			}
		}
	},
	async mounted() {
		await this.fetchPlanes();
		this.loading = false;
	},
}
</script>

<template>
	<main>
		<div v-if="loading">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
		</div>
		<div v-else class="tablita">
			<h3>Historial de planes de finanzas</h3>
			<table>
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Sueldo</th>
						<th scope="col">Fecha Inicio</th>
						<th scope="col">Fecha Fin</th>
						<th scope="col">Estado</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="planes in planes" :key="planes.id_plan">
						<th scope="row">{{ planes.id_plan }}</th>
						<td>{{ planes.sueldo_base }}</td>
						<td>{{ planes.fecha_inicio }}</td>
						<td>{{ planes.fecha_fin }}</td>
						<td>{{ planes.estado }}</td>
						<td>
							<button @click="exportarPlan()">Exportar</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</main>
</template>

<style scoped>
.tablita {
	width: 100%;
	height: 100%;
}

h3 {
	margin-bottom: 1rem;
}

table {
	width: 100%;
	color: #6B7280;
}

thead {
	color: #374151;
	background-color: #F9FAFB;
}

thead>tr>th,
tbody>tr>td,
tbody>tr>th {
	padding: 1rem 1rem;
	text-align: center;
}

tbody>tr>th {
	white-space: nowrap;
}

button {
	background-color: #6B7280;
	width: 100%;
	height: 30px;
	border-radius: 0.5rem;
}

button:hover {
	background-color: #93919f;
}
</style>
