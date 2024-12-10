<script>
import LineChart from '@/components/LineChart.vue';
import { supabase } from '@/lib/supabaseClient.js';
const { data: { user } } = await supabase.auth.getUser();

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
            ingresoUltimos: null,
            loading: true,
        }
    },
    methods: {
        async fetchIngreso() {
            try {
                const { data: planes, error } = await supabase
                    .from('planesfinanzas')
                    .select('id_plan, fecha_inicio, plan_ingresos(monto)')
                    .eq('id_usuario', user.id)
                    .order('created_at', { ascending: false })
                    .limit(6);

                if (error) throw error;

                const planesSuma = planes.map(plan => ({
                    id_plan: plan.id_plan,
                    total_ingresos: plan.plan_ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0)
                }));

                const planesOrdenados = planesSuma.reverse();

                const labels = planesOrdenados.map(plan => plan.id_plan);
                const data = planesOrdenados.map(plan => plan.total_ingresos);

                this.ingresoUltimos = {
                    labels, 
                    datasets: [
                        {
                            label: 'Ingresos',
                            backgroundColor: '#4caf50',
                            data
                        }
                    ]
                }

            } catch (error) {
                console.error('Error al obtener ultimos Ingresos:', error);
            }
        },
    },
    async mounted() {
        await this.fetchIngreso();
        this.loading = false;
    }
}
</script>

<template>
    <LineChart v-if="ingresoUltimos" :data="ingresoUltimos" />
</template>

<style scoped></style>