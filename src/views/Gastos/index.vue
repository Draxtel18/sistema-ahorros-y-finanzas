<template>
	<main>
		<section>
			<div class="div1"> <BotonGastos/> </div>
			<div class="div2"> Categorias </div>
			<div class="div3"> Grafico ultimos 6 meses </div>
			<div class="div4"> <TablaGastos/> </div>
		</section>
	</main>
</template>

<script>
import BotonGastos from './components/botonGastos.vue';
import TablaGastos from './components/tablaGastos.vue';

export default{
	components: {
		BotonGastos,
		TablaGastos,
	},
}
</script>

<style scoped>

main {
	width: 100%;
	height: 100vh;
}

section {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(11, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
}

div {
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
}
</style>


<!--Estilos generales dentro de la vista, modales y circulo de carga-->
<style>
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

.modal-header{
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