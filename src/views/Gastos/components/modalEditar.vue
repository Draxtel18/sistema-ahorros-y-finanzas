<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
    props: {
        gasto: Object,
        show: Boolean,
    },
    data() {
        return {
            monto: this.gasto.monto,
            categoria: this.gasto.categoria,
            descripcion: this.gasto.descripcion,
            categorias: [],
        };
    },
    methods: {
        saveChanges() {
            this.$emit('save', { ...this.gasto, monto: this.monto, categoria: this.categoria, descripcion: this.descripcion });
            this.$emit('close');
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
                        <h3>Editar Gasto</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot>
                        <form @submit.prevent="saveChanges()" class="gasto-form">
                            <label for="ipGasto">Ingresar monto</label>
                            <input v-model="monto" type="number" placeholder="Monto del gasto" id="ipGasto" />

                            <label for="cbCategoria">Categoría</label>
                            <select v-model="categoria" id="cbCategoria">
                                <option disabled value="">Seleccione una categoría</option>
                                <option v-for="cat in categorias" :key="cat" :value="cat">
                                    {{ cat }}
                                </option>
                            </select>

                            <label for="ipDescripcion">Descripción (Opcional)</label>
                            <textarea v-model="descripcion" id="ipDescripcion" placeholder="Máximo 100 caracteres"
                                maxlength="100"></textarea>
                        </form>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot>
                        <button class="modal-default-button" @click="saveChanges" type="submit">Guardar Cambios</button>
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