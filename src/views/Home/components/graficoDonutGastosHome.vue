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
      gastosDonutData: null,
      loading: true,
      gastado: null,
      disponible: null,
    };
  },
  methods: {
    async fetchDistribucion() {
      try {
        // Obtener la distribución del presupuesto
        const { data: distribucion, error } = await supabase
          .from('distribucionpresupuesto')
          .select('gustos, necesidades, dinerototal')
          .eq('id_plan', this.planActual.id_plan)
          .single();

        if (error) throw error;

        // Sumar "gustos" y "necesidades" para calcular el presupuesto de gastos
        const presupuestoGastos = distribucion.gustos + distribucion.necesidades;

        // Simular el gasto (por ahora solo mostrar el monto como completamente disponible)
        const gastado = 0; // Por defecto no hay gastos registrados
        const disponible = presupuestoGastos - gastado;

        this.gastado = parseFloat(gastado.toFixed(2));
        this.disponible = parseFloat(disponible.toFixed(2));

        // Preparar datos para el gráfico
        this.gastosDonutData = {
          labels: gastado > 0 ? ['Gastado', 'Disponible'] : ['Disponible'],
          datasets: [
            {
              data: gastado > 0 ? [gastado, disponible] : [disponible],
              backgroundColor: gastado > 0 ? ['#FF6B6B', '#C8D6E5'] : ['#C8D6E5'],
              borderColor: ['transparent'],
            },
          ],
        };
      } catch (error) {
        console.error('Error al obtener los datos de distribución de gastos:', error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchDistribucion();
  },
};
</script>

<template>
  <div class="donita">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <DonutChart v-if="gastosDonutData" :data="gastosDonutData" />
      <p>{{ gastado }} de {{ gastado + disponible }}</p>
    </div>
  </div>
</template>

<style scoped>
.donita {
  width: 100%;
  padding: 2rem;
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
