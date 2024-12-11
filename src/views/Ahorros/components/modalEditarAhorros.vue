<script>
import { supabase } from '@/lib/supabaseClient.js';

export default {
  props: {
    ahorro: {
      type: Object,
      default: null
    },
    show: Boolean,
  },
  data() {
    return {
      monto: this.ahorro?.monto || '',
      descripcion: this.ahorro?.descripcion || '',
    };
  },
  emits: ['save', 'close'],
  watch: {
    ahorro: {
      handler(newValue) {
        this.monto = newValue?.monto || '';
        this.descripcion = newValue?.descripcion || '';
      },
      deep: true,
    },
  },
  methods: {
    saveChanges() {
      if (!this.monto) {
        alert('El campo de monto no puede estar vacío.');
        return;
      }

      // Emitir los cambios al componente padre
      this.$emit('save', {
        ...this.ahorro,
        monto: parseFloat(this.monto),
        descripcion: this.descripcion,
      });
      this.$emit('close'); // Cerrar el modal
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
              <h3>Editar Ahorro</h3>
              <button class="modal-default-button" @click="$emit('close')">
                <span class="material-symbols-outlined">close</span>
              </button>
            </slot>
          </div>
          <div class="modal-body">
            <slot>
              <form @submit.prevent="saveChanges()" class="ahorro-form">
                <label for="inputMonto">Monto</label>
                <input
                  v-model="monto" type="number" id="inputMonto"placeholder="Monto del ahorro"/>
                <label for="inputDescripcion">Descripción (Opcional)</label>
                <textarea
                  v-model="descripcion" id="inputDescripcion"placeholder="Máximo 100 caracteres"  maxlength="100"></textarea>
              </form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot>
              <button
                class="modal-default-button" @click="saveChanges" type="submit">
                Guardar Cambios
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