<script>
import ModalAhorros from './modalAhorros.vue';

export default {
  components: {
    ModalAhorros,
  },
  props: {
    planActual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  emits: ['ahorro-registrado'],
  methods: {
    emitirAhorroRegistrado() {
      this.$emit('ahorro-registrado');
    },
  },
};
</script>

<template>

    <button id="show-modal" @click="showModal = true">
      <span class="material-symbols-outlined icon">add</span> 
    </button>

    <Teleport to="body">
      <ModalAhorros
        :planActual="planActual"
        :show="showModal"
        @close="showModal = false"
        @ahorro-registrado="emitirAhorroRegistrado"
      />
    </Teleport>
  
</template>

<style scoped>
.tabla{
    display: inherit;
}

button {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    cursor: pointer;
}

span {
    width: 100%;
    padding: auto;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    font-size: 3.5em;
    transition: transform 0.2s ease-in-out;
    display: inline-block;
    cursor: pointer;
}

.icon:hover {
    transform: rotate(180deg) scale(1.3);
}
</style>
