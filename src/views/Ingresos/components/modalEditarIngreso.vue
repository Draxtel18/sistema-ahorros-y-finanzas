<script>

export default {
    props: {
        ingreso: Object,
        show: Boolean,
    },
    data() {
        return {
            monto: this.ingreso.monto,
            descripcion: this.ingreso.descripcion,
        };
    },
    methods: {
        saveChanges() {
            this.$emit('save', { ...this.ingreso, monto: this.monto, descripcion: this.descripcion });
            this.$emit('close');                     
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
                        <h3>Editar Ingreso</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot>
                        <form @submit.prevent="saveChanges()" class="gasto-form">
                            <label for="ipGasto">Ingresar ingreso</label>
                            <input v-model="monto" type="number" placeholder="Monto del gasto" id="ipGasto" />

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