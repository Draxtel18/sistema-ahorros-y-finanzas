<template>
	<main>
		<!--
			<section class="linea">
				<h1>Ingresos mensuales de este mes: S/ 1500 + <span>120</span></h1>
			</section>
		-->
		<section>
			<div class="div1">
				<h2>Gastos</h2>
				<div class="donut">
					<DonutChart />
				</div>
				<div class="cont-button">
					<router-link to="/gastos" class="button">Ir a gastos</router-link>
				</div>
			</div>
			<div class="div2">
				<h2>Ahorros</h2>
				<div>
					<LineChart />
				</div>
				<div class="cont-button">
					<router-link to="/ahorros" class="button">Ir a ahorros</router-link>
				</div>
			</div>
			<div class="div3">
				<h2>Ingresos Extras</h2>
				<div>
					<BarChart />
				</div>
				<div class="cont-button">
					<router-link to="/ingresos" class="button">Ir a ingresos</router-link>
				</div>
			</div>
		</section>
	</main>
</template>
<script>
import DonutChart from '@/components/DonutChart.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';

export default {
	components: {
		DonutChart,
		LineChart,
		BarChart
	}
};
</script>

<style scoped>
main {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
}

section {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(6, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	height: 100%;
	width: 100%;
}

.div1 {
	grid-area: 1 / 1 / 7 / 4;
}

.div1 .donut {
	width: 300px;
}

.div2 {
	grid-area: 1 / 4 / 4 / 6;
}

.div3 {
	grid-area: 4 / 4 / 7 / 6;
}

section>div {
	width: 100%;
	background-color: #e4e8eb;
	padding: 1.2rem;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

section>div>h2 {
	text-align: center;
	margin-bottom: 1rem;
}

section>div>p {
	text-align: center;
	margin-top: 0.5rem;
}

section img {
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
	section {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	.div1,
	.div2,
	.div3 {
		grid-area: auto;
		width: 100%;
	}

	
}
</style>