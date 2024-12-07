<script>
/*
import DonutChart from '@/components/DonutChart.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
*/
import ModalPlan from './components/modalPlan.vue';


import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()


export default {
	components: {
		/*
		DonutChart,
		LineChart,
		BarChart,
		*/
		ModalPlan,
	},
	data() {
		return {
			/*
			gastosData: null,
			ahorrosData: null,
			ingresosData: null,
			gastado: null,
			total: null,
			*/
			planActual: null,
			loading: true,
			showModal: false,
		};
	},
	methods: {
		async cargarPlanActual() {
			const { data, error } = await supabase
				.from("planesfinanzas")
				.select("*")
				.eq("estado", "activo")
				.eq("id_usuario", user.id)
				.single();


			if (error) {
				console.error("Error al cargar el plan actual:", error.message);
				this.planActual = null;
			} else {
				this.planActual = data;
			}
		},
		async cancelarPlan() {
			if (confirm("¿Estás seguro de cancelar el plan actual?")) {
				const { error } = await supabase
					.from("planesfinanzas")
					.update({ estado: "cancelado" })
					.eq("id_plan", this.planActual.id_plan);

				if (error) {
					console.error("Error al cancelar el plan:", error.message);
				} else {
					alert("Plan cancelado con éxito.");
					this.planActual = null;
				}
			}
		},
		/*
		async fetchGastos() {
			const mesActual = new Date().getMonth() + 1;
			const añoActual = new Date().getFullYear();

			try {
				const { data: gastos, error: gastosError } = await supabase
					.from('gastos')
					.select('monto')
					.eq('mes', mesActual)
					.eq('año', añoActual)
					.eq('user_id', user.id);
				if (gastosError) throw error;

				const { data: ingresos, error: ingresosError } = await supabase
					.from('ingresos_2')
					.select('monto')
					.eq('mes', mesActual)
					.eq('año', añoActual)
					.eq('user_id', user.id);
				if (ingresosError) throw error;

				const gastado = gastos.reduce((acc, item) => acc + item.monto, 0);
				const disponible = ingresos.reduce((acc2, item2) => acc2 + item2.monto, 0) - gastado;
				const presupuesto = ingresos.reduce((acc2, item2) => acc2 + item2.monto, 0)

				this.gastado = gastado;
				this.total = presupuesto;

				this.gastosData = {
					labels: ['Gastado', 'Disponible'],
					datasets: [
						{
							data: [gastado, disponible],
							backgroundColor: ['#8A3', '#BBB'],
							borderColor: ['transparent']
						},
					],
				};
			} catch (error) {
				console.error('Error al cargar los datos de gastos:', error.message);
			}
		},
		async fetchAhorros() {
			try {
				const meses = this.getUltimos6Meses();

				const { data: ahorros, error } = await supabase
					.from('ahorros')
					.select('monto, mes')
					.eq('user_id', user.id);
				if (error) throw error;

				const datosAhorros = meses.map(mes =>
					ahorros.find(a => a.mes === mes) ? ahorros.find(a => a.mes === mes).monto : null
				);

				this.ahorrosData = {
					labels: meses.map(m => this.getNombreMes(m)),
					datasets: [
						{
							label: 'Ahorros',
							backgroundColor: '#36A2EB',
							data: datosAhorros
						}
					]
				};
			} catch (error) {
				console.error('Error cargando datos de ahorros:', error.message);
			}
		},
		async fetchIngresos() {
			try {
				const meses = this.getUltimos6Meses();
				const { data: ingresos, error } = await supabase
					.from('ingresos_2')
					.select('monto, mes')
					.eq('user_id', user.id)
					.eq('fuente', 'Extra');
				if (error) throw error;

				const datosIngresos = meses.map(mes => {
					const ingresosMes = ingresos.filter(i => i.mes === mes);
					return ingresosMes.length > 0
						? ingresosMes.reduce((suma, ingreso) => suma + ingreso.monto, 0)
						: null;
				});

				this.ingresosData = {
					labels: meses.map(m => this.getNombreMes(m)),
					datasets: [
						{
							label: 'Ingresos',
							backgroundColor: '#FF6384',
							data: datosIngresos
						}
					]
				};
			} catch (error) {
				console.error('Error cargando datos de ingresos:', error.message);
			}
		},
		getUltimos6Meses() {
			const mesActual = new Date().getMonth() + 1;
			return Array.from({ length: 6 }, (_, i) => ((mesActual - i - 1 + 12) % 12) + 1).reverse();
		},
		getNombreMes(mes) {
			const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
			return nombresMeses[mes - 1];
		},
		*/
	},
	async mounted() {
		/*
		await Promise.all([
			this.fetchGastos(),
			this.fetchAhorros(),
			this.fetchIngresos(),
		]);
		this.gastado;
		*/
		await this.cargarPlanActual();
		this.loading = false;
		this.presupuesto;
	}
};
</script>

<template>
	<main>
		<div v-if="loading">
			<svg viewBox="25 25 50 50">
				<circle r="20" cy="50" cx="50"></circle>
			</svg>
		</div>
		<section v-else>
			<div class="home-grid" v-if="planActual">
				<div class="div1">
					<h2>Plan Actual</h2>
					<div>
						<div>
							<p><strong>Fecha de inicio:</strong> {{ planActual.fecha_inicio }}</p>
							<p><strong>Fecha de fin:</strong> {{ planActual.fecha_fin }}</p>
							<p><strong>Sueldo base:</strong> {{ planActual.sueldo_base }}</p>
						</div>
						<div>
							<button id="show-modal" @click="showModal = true">Comenzar Nuevo Plan</button>
							<button @click="cancelarPlan">Cancelar Plan Actual</button>
						</div>
					</div>
				</div>
				<div class="div2">
					<h2>Gastos</h2>
					<div class="donut">
						<!--
							<DonutChart v-if="gastosData" :data="gastosData" />
							<p>Has gastado {{ gastado }} de {{ total }} </p>
						s-->
					</div>
					<div class="cont-button">
						<router-link to="/gastos" class="button">Ir a gastos</router-link>
					</div>
				</div>
				<div class="div3">
					<h2>Ahorros</h2>
					<div>
						<!--
							<LineChart v-if="ahorrosData" :data="ahorrosData" />
						-->
					</div>
					<div class="cont-button">
						<router-link to="/ahorros" class="button">Ir a ahorros</router-link>
					</div>
				</div>
				<div class="div4">
					<h2>Ingresos Extras</h2>
					<div>
						<!--
							<BarChart v-if="ingresosData" :data="ingresosData" />
						-->
					</div>
					<div class="cont-button">
						<router-link to="/ingresos" class="button">Ir a ingresos</router-link>
					</div>
				</div>
			</div>
			<div v-else>
				<p>No tienes un plan activo.</p>
				<button id="show-modal" @click="showModal = true">Comenzar Nuevo Plan</button>
			</div>
		</section>


	</main>

	<Teleport to="body">
		<ModalPlan :show="showModal" @close="showModal = false">
		</ModalPlan>
	</Teleport>
</template>

<style scoped>
main,
section {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 100vh;
}

section {
	height: 100%;
}

.home-grid {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(10, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	height: 100%;
	width: 100%;
}

.div1 {
	grid-area: 1 / 1 / 4 / 4;
}

.div1>div {
	display: flex;
	flex-direction: row;
	gap: 1.5rem;
}

.div1>div>div {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.div1>div>div>button,
#show-modal {
	background-color: #bbb;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
}

.div1>div>div>button:last-of-type {
	background-color: rgb(199, 51, 51);
}

.div2 .donut {
	width: 300px;
}

.div2 .donut>p {
	display: flex;
	justify-content: center;
	margin-top: 1.5rem;
	font-size: 1.1rem;
}

.div2 {
	grid-area: 4 / 1 / 11 / 4;
}

.div3 {
	grid-area: 1 / 4 / 6 / 7;
}

.div4 {
	grid-area: 6 / 4 / 11 / 7;
}

.home-grid>div {
	width: 100%;
	background-color: #e4e8eb;
	padding: 1.2rem;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.home-grid>div>h2 {
	text-align: center;
	margin-bottom: 1rem;
}

.home-grid>div>p {
	text-align: center;
	margin-top: 0.5rem;
}

.home-grid img {
	width: 100%;
	margin-bottom: 2rem;
}

.cont-button {
	display: flex;
	justify-content: center;
	margin-top: 1.5rem;
}

.button {
	text-decoration: none;
	background-color: #6e6762;
	padding: 12px 24px;
	color: #fff;
	border-radius: 1rem;
}

@media (max-width: 900px) {
	.home-grid {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	.div1,
	.div2,
	.div3,
	.div4 {
		grid-area: auto;
		width: 100%;
	}
}

/* From Uiverse.io by barisdogansutcu */
svg {
	width: 6em;
	transform-origin: center;
	animation: rotate4 2s linear infinite;
}
</style>
