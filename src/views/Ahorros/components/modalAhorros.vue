<script>
import { supabase } from '@/lib/supabaseClient.js';

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
      monto: '',
      descripcion: '',
    };
  },
  emits: ['ahorro-registrado', 'close'],
  methods: {
    async handleAhorro() {
      if (!this.monto) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('plan_ahorro')
          .insert([
            {
              id_plan: this.planActual.id_plan,
              monto: parseFloat(this.monto),
              fecha: new Date(),
              descripcion: this.descripcion,
            },
          ]);

        if (error) throw error;

        // Limpiar los campos y emitir eventos
        this.monto = '';
        this.descripcion = '';
        this.$emit('close');
        this.$emit('ahorro-registrado');
        alert('Ahorro registrado con éxito.');
      } catch (error) {
        console.error('Error registrando ahorro:', error.message);
      }
    },
  },
};
</script>



<template>
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-container">
          <div class="modal-header">
            <slot>
              <h3>Registrar Ahorro</h3>
              <button class="modal-default-button" @click="$emit('close')">
                <span class="material-symbols-outlined">close</span>
              </button>
            </slot>
          </div>
          <div class="modal-body">
            <slot>
              <form @submit.prevent="handleAhorro()" class="ahorro-form">
                <label for="inputMonto">Ingresar monto del ahorro</label>
                <input
                  v-model="monto"
                  type="number"
                  id="inputMonto"
                  placeholder="Monto del ahorro"
                />
                <label for="inputDescripcion">Descripción (Opcional)</label>
                <textarea
                  v-model="descripcion"
                  id="inputDescripcion"
                  placeholder="Máximo 100 caracteres"
                  maxlength="100"
                ></textarea>
              </form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot>
              <button class="modal-default-button" @click="handleAhorro" type="submit">
                Confirmar
              </button>
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

.ahorro-form label {
    display: block;
    margin-bottom: 8px;
}

.ahorro-form input,
.ahorro-form select,
.ahorro-form textarea {
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