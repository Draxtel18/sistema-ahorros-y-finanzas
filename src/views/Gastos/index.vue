<template>
	<main>
		<section>
			<div class="div1">
				<BotonGastos @gasto-registrado="actualizarGastos" />
			</div>
			<div class="div2"> Categorias </div>
			<div class="div3"> Grafico ultimos 6 meses </div>
			<div class="div4">
				<TablaGastos ref="tablaGastosRef" />
			</div>
		</section>
	</main>
</template>

<script setup>
import { ref } from 'vue'
import BotonGastos from './components/botonGastos.vue';
import TablaGastos from './components/tablaGastos.vue';

const tablaGastosRef = ref(null)

const actualizarGastos = () => {
	tablaGastosRef.value.fetchGastos()
}
</script>

<style scoped>
section {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(11, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
}

section > div {
	background-color: blue;
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
