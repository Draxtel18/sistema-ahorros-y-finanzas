<template>
	<main>
		<section>
			<div class="div1"> Hola </div>
			<div class="div2"> Hola </div>
			<div class="div3"> Hola </div>
			<div class="div4"> Hola </div>
		</section>
	</main>
</template>

<script>

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
