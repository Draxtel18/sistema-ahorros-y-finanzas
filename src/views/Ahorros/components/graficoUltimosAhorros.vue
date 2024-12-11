<script>
import LineChart from '@/components/LineChart.vue';
import { supabase } from '@/lib/supabaseClient.js';

export default {
  components: {
    LineChart,
  },
  props: {
    planActual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ahorroUltimos: null,
      loading: true,
    };
  },
  methods: {
    async fetchAhorro() {
      try {
        const { data: ahorros, error } = await supabase
          .from('plan_ahorro')
          .select('monto, fecha')
          .eq('id_plan', this.planActual.id_plan)
          .order('fecha', { ascending: false })
          .limit(6);

        if (error) throw error;

        // Procesar los datos para el gráfico
        const labels = ahorros.map((ahorro) => new Date(ahorro.fecha).toLocaleDateString());
        const data = ahorros.map((ahorro) => ahorro.monto);

        this.ahorroUltimos = {
          labels,
          datasets: [
            {
              label: 'Ahorros',
              backgroundColor: '#4caf50',
              borderColor: '#4caf50',
              data,
            },
          ],
        };
      } catch (error) {
        console.error('Error al obtener los últimos ahorros:', error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchAhorro();
  },
};
</script>


<template>
    <LineChart v-if="ingresoUltimos" :data="ingresoUltimos" />
</template>

<style scoped></style>