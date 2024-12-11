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
            default: null
        },
    },
    data() {
        return {
            gastosDonutData: null,
            loading: true,
            ingresosData: null,
			gastado: null,
			total: null,
        }
    },
    methods: {
        async fetchGastos() {
            try {
                const { data: gastos, error: gastosError } = await supabase
					.from('plan_gastos')
					.select('monto')
					.eq('id_plan', this.planActual.id_plan)
				if (gastosError) throw error;

                const { data: ingresos, error: ingresosError } = await supabase
					.from('plan_ingresos')
					.select('monto')
					.eq('id_plan', this.planActual.id_plan);
				if (ingresosError) throw error;                

                const gastado = gastos.reduce((acc, item) => acc + item.monto, 0);
				const disponible = ingresos.reduce((acc2, item2) => acc2 + item2.monto, 0) - gastado;
				const presupuesto = ingresos.reduce((acc2, item2) => acc2 + item2.monto, 0)

                this.gastado = parseFloat(gastado.toFixed(2));
				this.total = parseFloat(presupuesto.toFixed(2));

                this.gastosDonutData = {
					labels: ['Gastado', 'Disponible'],
					datasets: [
						{
							data: [gastado, disponible],
							backgroundColor: ['#8A3', '#BBB'],
							borderColor: ['transparent']
						},
					],
				};
                
                
            } catch (error) {
                console.error('Error al obtener gastos:', error);
            }
        },
    },
    async mounted() {
        await this.fetchGastos();
        this.loading = false;
    }
}
</script>

<template>
    <div class="donita">
        <DonutChart v-if="gastosDonutData" :data="gastosDonutData"/>
        <p>{{ gastado }} de {{ total }}</p>
    </div>
</template>

<style scoped>
.donita{
    width: 100%;
    padding: 3rem;
}
.donita > p {
	display: flex;
	justify-content: center;
	margin-top: 1.5rem;
    color: #6B7280;
}
</style>