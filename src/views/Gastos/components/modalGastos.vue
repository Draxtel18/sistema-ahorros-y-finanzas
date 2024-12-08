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
                            user_id: user.id, 
                            monto: parseFloat(this.gasto),
                            categoria: this.categoria,
                            fecha: new Date(),
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
                this.$emit('gasto-registrado');
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
                            <label for="ipDescripcion">Agregar Descripcion (Opcional)</label>
                            <textarea v-model="descripcion" type="text" id="ipDescripcion" placeholder="Max. 100 caracteres" 
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

textarea {
    height: 70px;
}

</style>