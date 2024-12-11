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
            default: null
        },
    },
    data() {
        return {
            gastosUltimos: null,
            loading: true,
        }
    },
    methods: {
        async fetchGastos() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return;
                
                const { data: planes, error } = await supabase
                    .from('planesfinanzas')
                    .select('id_plan, fecha_inicio, sueldo_base, plan_gastos(monto)')
                    .eq('id_usuario', user.id)
                    .order('created_at', { ascending: false })
                    .limit(6);

                if (error) throw error;

                const planesSuma = planes.map(plan => ({
                    id_plan: plan.id_plan,
                    total_gastos: plan.plan_gastos.reduce((sum, gasto) => sum + gasto.monto, 0)
                }));

                const planesOrdenados = planesSuma.reverse();

                const labels = planesOrdenados.map(plan => plan.id_plan);
                const data = planesOrdenados.map(plan => plan.total_gastos);

                this.gastosUltimos = {
                    labels, 
                    datasets: [
                        {
                            label: 'Gastos',
                            backgroundColor: '#4caf50',
                            data
                        }
                    ]
                }

            } catch (error) {
                console.error('Error al obtener ultimos gastos:', error);
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
    <LineChart v-if="gastosUltimos" :data="gastosUltimos" />
</template>

<style scoped></style>