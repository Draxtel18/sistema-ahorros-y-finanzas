<template>
	<main>
		<div>
			<section>
				<h2>Bienvenido a SavyProc</h2>
				<p>Es nesecario tener una cuenta para poder usar nuestros servicios</p>
				<div>
					<p>¿No tienes una cuenta?</p>
					<router-link to="/register" class="button">Crear cuenta</router-link>
				</div>
			</section>
			<form @submit.prevent="handleLogin()" class="login-form">
				<label for="username">Correo Electronico</label>
				<input v-model="email" type="text" id="username" placeholder="Ingrese su correo" required>

				<label for="password">Contraseña</label>
				<input v-model="password" type="password" id="password" placeholder="Ingrese su contraseña">

				<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

				<div>
					<button type="submit">Iniciar sesión</button>
				</div>
			</form>
		</div>
	</main>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/lib/useAuth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
	try {
		await loginUser(email.value, password.value);
		router.push('/');
	} catch (error) {
		errorMessage.value = error.message;
	}
};

</script>


<style scoped>
#app main {
	padding: 1rem;
	margin-left: 0;
}

main {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

main>div {
	background-color: #fff;
	height: 100%;
	width: 100%;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 2rem;
}

section {
	width: 50%;
	margin: 0 1.4rem;
}

section>h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
}

section>p {
	font-size: 1.4rem;
	margin-bottom: 1rem;
}

section>div {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	flex-wrap: wrap;
}

section>div>p {
	font-size: 1.1rem;
}

section .button {
	text-decoration: none;
	border: 1px solid #6e6762;
	color: #000;
	padding: 12px 24px;
	border-radius: 4px;
}

section .button:hover {
	background-color: #b6aca5;
}

.login-form {
	width: 50%;
	background-color: #e6ddd7;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 32px;
	width: 400px;
	margin: 0 auto;
}

.login-form label {
	display: block;
	margin-bottom: 8px;
}

.login-form input {
	background-color: #d4d0cd;
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	margin-bottom: 16px;
}

.login-form div {
	display: flex;
	justify-content: center;
	margin-top: 1rem;
}

.login-form button {
	background-color: #6e6762;
	color: white;
	padding: 12px 24px;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	cursor: pointer;
	margin-right: 16px;
}

.login-form button:hover {
	background-color: #524e4b;
}

.login-form p {
	margin-bottom: 1rem;
}
</style>