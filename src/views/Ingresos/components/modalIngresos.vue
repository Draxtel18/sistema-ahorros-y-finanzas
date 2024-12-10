<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()


export default {
    props: {
        show: Boolean,
        planActual: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            ingreso: '',
            descripcion: '',
        };
    },
    emits: ['ingreso-registrado', 'close'],
    methods: {
        async handleGasto() {
            if (!this.ingreso) {
                alert('Por favor, complete todos los campos');
                return;
            }

            try {
                if (!user) return;

                const { data, error } = await supabase
                    .from('plan_ingresos')
                    .insert([
                        {
                            id_plan: this.planActual.id_plan, 
                            monto: parseFloat(this.ingreso),
                            tipo: 'Extra',
                            fecha: new Date(),
                            descripcion: this.descripcion,
                        },
                    ]);

                    console.log(data);
                    

                if (error) throw error;
                
                this.ingreso = '';
                this.descripcion = '';
                this.$emit('close');
                this.$emit('ingreso-registrado');
                alert('Ingreso registrado con éxito.');
            } catch (error) {
                console.error('Error registrando Ingreso:', error.message);
            }
        },
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
                            <input v-model="ingreso" type="number" name="gasto" placeholder="Monto del gasto" id="ipGasto">
                            <label for="ipDescripcion">Agregar Descripcion (Opcional)</label>
                            <textarea v-model="descripcion" type="text" id="ipDescripcion" placeholder="Max. 100 caracteres" 
                            v-bind:maxlength="100"></textarea>
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