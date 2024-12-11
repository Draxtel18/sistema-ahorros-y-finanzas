<script>
import DonutChart from '@/components/DonutChart.vue';
import { supabase } from '@/lib/supabaseClient.js';

export default {
  components: {
    DonutChart,
  },
  props: {
    planActual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ahorrosDonutData: null,
      loading: true,
      ahorrado: null,
    };
  },
  methods: {
    async fetchDistribucion() {
      try {
        // Obtener la distribución del presupuesto
        const { data: distribucion, error } = await supabase
          .from('distribucionpresupuesto')
          .select('ahorros, dinerototal')
          .eq('id_plan', this.planActual.id_plan)
          .single();

          console.log(distribucion);
          

        if (error) throw error;

        this.totalAhorros = distribucion.ahorros;

        this.ahorrado = distribucion.ahorros;

        // Crear datos para el gráfico
        this.ahorrosDonutData = {
          labels: ['Ahorros'],
          datasets: [
            {
              data: [this.totalAhorros],
              backgroundColor: ['#4CAF50'], // Verde para representar los ahorros
              borderColor: ['transparent'],
            },
          ],
        };
      } catch (error) {
        console.error('Error al obtener los datos de ahorros:', error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchDistribucion();
    this.ahorrado;
  },
};
</script>

<template>
  <div class="donita">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <DonutChart v-if="ahorrosDonutData" :data="ahorrosDonutData" />
      <p>{{ ahorrado }} ahorrados </p>
    </div>
  </div>
</template>

<style scoped>
.donita {
  width: 100%;
  
}

.donita > div{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}


.donita > p {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  color: #6b7280;
}
</style>
