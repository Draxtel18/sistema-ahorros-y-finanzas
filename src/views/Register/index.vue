<template>
	<main>
		<div>

			<section>
				<h2>Bienvenido a SavyProc</h2>
				<p>Es nesecario tener una cuenta para poder usar nuestros servicios</p>
				<div>
					<p>¿Ya tienes una cuenta?</p>
					<router-link to="/login" class="button">Iniciar Sesion</router-link>
				</div>
			</section>

			<form @submit.prevent="handleRegister" class="registration-form">
				<label for="name">Nombre</label>
				<input v-model="name" type="text" id="name" placeholder="Ingrese su nombre">

				<label for="email">Correo electrónico</label>
				<input v-model="email" type="email" id="email" placeholder="Ingrese su correo electrónico">

				<label for="password">Contraseña</label>
				<input v-model="password"type="password" id="password" placeholder="Ingrese su contraseña">

				<label for="confirm-password">Repetir contraseña</label>
				<input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Repita su contraseña">

				<p v-if="errorMessage" class="error-message">{{errorMessage}}</p>

				<button type="submit">Registrarse</button>
			</form>
		</div>
	</main>
</template>


<script>
import { registerUser } from '@/lib/useAuth';

export default {
	data() {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			errorMessage: '',
		};
	},
	methods: {
		async handleRegister() {
			if (this.password !== this.confirmPassword) {
				this.errorMessage = "Las contraseñas no coinciden";
				return;
			}
			try {
				const user = await registerUser(this.email, this.password);
				// Puedes guardar el nombre en la base de datos usando una función adicional de Supabase si deseas.
				this.$router.push('/login'); // Redirige al login después de registrarse
			} catch (error) {
				this.errorMessage = error.message;
			}
		}
	}
}
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

.registration-form {
	background-color: #e6ddd7;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 32px;
	width: 400px;
	margin: 0 auto;
}

.registration-form label {
	display: block;
	margin-bottom: 8px;
}

.registration-form input {
	background-color: #d4d0cd;
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	margin-bottom: 16px;
}

.registration-form button {
	background-color: #6e6762;
	color: white;
	padding: 12px 24px;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	cursor: pointer;
	display: block;
	margin: 0 auto;
}

.registration-form p{
	margin-bottom: 1rem;
}

</style>