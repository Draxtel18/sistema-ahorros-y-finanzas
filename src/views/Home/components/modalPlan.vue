<script>
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()


export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            fechaInicio: "",
            fechaFin: "",
            sueldoBase: "",
        };
    },
    methods: {
        async crearPlan() {
            if (!this.fechaInicio || !this.fechaFin || !this.sueldoBase) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            try {
                const { data, error } = await supabase
                .from("planesfinanzas").insert({
                    id_usuario: user.id,    
                    sueldo_base: parseFloat(this.sueldoBase),
                    fecha_inicio: this.fechaInicio,
                    fecha_fin: this.fechaFin,
                    estado: "activo",
                    created_at: new Date(),
                }).select();

                if (error) throw error;
                alert("Plan creado con éxito.");
                this.$emit("close");
                this.$emit("cargarPlanActual")
            } catch (error) {
                console.error("Error al crear el plan:", error.message);
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
                        <h3>Iniciar Plan</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot>
                        <form @submit.prevent="crearPlan" class="gasto-form">
                            <label for="fechaInicio">Fecha de Inicio</label>
                            <input type="date" v-model="fechaInicio" id="fechaInicio" required />

                            <label for="fechaFin">Fecha de Fin</label>
                            <input type="date" v-model="fechaFin" id="fechaFin" required />

                            <label for="sueldoBase">Ingresar su Sueldo Base</label>
                            <input type="number" v-model="sueldoBase" id="sueldoBase" required />

                        </form>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot>
                        <button class="modal-default-button" type="submit" @click="crearPlan()">Confirmar</button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.categorias-check {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
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

.modal-header {
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