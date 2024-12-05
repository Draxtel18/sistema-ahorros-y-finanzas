<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()


export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            gasto: '',
            categoria: '',
            descripcion: '',
            categorias: [],
        };
    },
    methods: {
        async handleGasto() {
            if (!this.gasto || !this.categoria) {
                alert('Por favor, complete todos los campos');
                return;
            }

            const mesActual = new Date().getMonth() + 1;
            const añoActual = new Date().getFullYear();

            try {
                if (!user) return;

                // Enviar datos a la tabla 'gastos'
                const { data, error } = await supabase
                    .from('gastos')
                    .insert([
                        {
                            user_id: user.id, // ID del usuario actual
                            monto: parseFloat(this.gasto),
                            categoria: this.categoria,
                            fecha: new Date(), // Fecha actual
                            descripcion: this.descripcion,
                            mes: mesActual,
                            año: añoActual,
                        },
                    ]);

                if (error) throw error;

                // Resetear campos y cerrar modal
                this.gasto = '';
                this.categoria = '';
                this.descripcion = '';
                this.$emit('close');
                alert('Gasto registrado con éxito.');
            } catch (error) {
                console.error('Error registrando gasto:', error.message);
            }
        },
        async fetchCategorias() {
            try {
                if (!user) return;

                const { data: categorias, error } = await supabase
                    .from('categorias')
                    .select('nombre')

                if (error) throw error;

                this.categorias = categorias.map(cat => cat.nombre);
            } catch (error) {
                console.error('Error cargando categorías:', error.message);
            }
        },
    },
    mounted() {
        this.fetchCategorias();
    },
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot>
                        <h3>Registro de gastos</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot>
                        <form @submit.prevent="handleGasto()" class="gasto-form">
                            <label for="ipGasto">Ingresar gasto</label>
                            <input v-model="gasto" type="number" name="gasto" placeholder="Monto del gasto" id="ipGasto">
                            <label for="cbCategoria">Ingresar categoria</label>
                            <select name="categoria" id="cbCategoria" v-model="categoria">
                                <option disabled value="">Escoja una categoria</option>
                                <option v-for="cat in categorias" :key="cat" :value="cat">
                                    {{ cat }}
                                </option>
                            </select>
                            <label for="ipDescripcion">Agregar Descripcion</label>
                            <textarea v-model="descripcion" type="text" id="ipDescripcion" placeholder="Opcional (Max. 100 caracteres)" 
                            v-bind:maxlength="100   "></textarea>
                        </form>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot>
                        <button class="modal-default-button" @click="handleGasto" type="submit">Confirmar</button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
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
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer .modal-default-button {
    float: right;
    background-color: #42b983;
    padding: 0.5rem 0.4rem;
    border-radius: 0.5rem;
}

.gasto-form label {
    display: block;
    margin-bottom: 8px;
}

.gasto-form input,
.gasto-form select,
.gasto-form textarea {
    background-color: #d4d0cd;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
    resize: none;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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