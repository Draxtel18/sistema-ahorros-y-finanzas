<script>
import ModalEditarAhorro from './modalEditarAhorros.vue';
import { supabase } from '@/lib/supabaseClient.js';

export default {
  components: {
    ModalEditarAhorro,
  },
  props: {
    planActual: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ahorros: [],
      showEditModal: false,
      ahorroEditado: null,
      loading: true,
    };
  },
  methods: {
    async fetchAhorro() {
      try {
        const { data: ahorros, error } = await supabase
          .from('plan_ahorro')
          .select('*')
          .eq('id_plan', this.planActual.id_plan);

        if (error) throw error;

        this.ahorros = ahorros;
      } catch (error) {
        console.error('Error cargando los ahorros:', error.message);
      }
    },
    async deleteAhorro(id_ahorro) {
      if (!confirm('¿Seguro que deseas eliminar este ahorro?')) return;

      try {
        const { error } = await supabase
          .from('plan_ahorro')
          .delete()
          .eq('id_ahorro', id_ahorro);

        if (error) throw error;

        this.ahorros = this.ahorros.filter(ahorro => ahorro.id_ahorro !== id_ahorro);
        alert('Ahorro eliminado correctamente.');
      } catch (error) {
        console.error('Error eliminando el ahorro:', error.message);
      }
      this.$emit('ahorro-eliminado');
    },
    openEditModal(ahorro) {
      this.ahorroEditado = { ...ahorro };
      this.showEditModal = true;
    },
    async updateAhorro(ahorroEditado) {
      try {
        const { error } = await supabase
          .from('plan_ahorro')
          .update({
            monto: ahorroEditado.monto,
            descripcion: ahorroEditado.descripcion
          })
          .eq('id_ahorro', ahorroEditado.id_ahorro);

        if (error) throw error;

        this.showEditModal = false;
        await this.fetchAhorro();
        alert('Ahorro actualizado correctamente.');
      } catch (error) {
        console.error('Error actualizando el ahorro:', error.message);
      }
      this.$emit('ahorro-editado');
    },
  },
  async mounted() {
    await this.fetchAhorro();
    this.loading = false;
  },
};
</script>

<template>
    <div v-if="loading">
        <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
    <div v-else>
      <table class="tablita">
        <thead>
          <tr>
            <th scope="col">Monto</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ahorro in ahorros" :key="ahorro.id_ahorro">
            <td scope="row">{{ ahorro.monto }}</td>
            <td>{{ ahorro.descripcion }}</td>
            <td>{{ new Date(ahorro.fecha).toLocaleDateString() }}</td>
            <td>
              <button @click="openEditModal(ahorro)">Editar</button>
              <button @click="deleteAhorro(ahorro.id_ahorro)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Teleport to="body">
        <ModalEditarAhorro
            v-if="showEditModal"
            :show="showEditModal"
            :ahorro="ahorroEditado"
            @close="showEditModal = false"
            @save="updateAhorro"
        />
        </Teleport>
    </div>
</template>

<style scoped>
div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tablita {
    width: 100%;
    height: 100%;
}


table {
    width: 100%;
    color: #6B7280;
}

thead {
    color: #374151;
    background-color: #F9FAFB;
}

thead>tr>th,
tbody>tr>td,
tbody>tr>th {
    padding: 0.5rem 0.5rem;
    text-align: center;
}

tbody>tr>th {
    white-space: nowrap;
}

button {
    background-color: #6B7280;
    width: 100%;
    height: 30px;
    border-radius: 0.5rem;
}

button:hover {
    background-color: #93919f;
}
</style>
