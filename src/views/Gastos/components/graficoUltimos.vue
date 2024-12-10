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
            gastosUltimos: null,
            loading: true,
        }
    },
    methods: {
        async fetchGastos() {
            try {
                const { data: planes, error } = await supabase
                    .from('planesfinanzas')
                    .select('id_plan, fecha_inicio, estado, sueldo_base')
                    .eq('id_usuario', user.id)
                    .order('created_at', { ascending: false })
                    .limit(6);

                if (error) throw error;
                console.log(planes);

                const planesOrdenados = planes.reverse();

                const labels = planesOrdenados.map(plan => plan.id_plan); // Fechas
                const data = planesOrdenados.map(plan => plan.sueldo_base);

                this.gastosUltimos = {
                    labels, // Fechas de los planes
                    datasets: [
                        {
                            label: 'Sueldo Base por Plan',
                            backgroundColor: '#4caf50',
                            data // Valores de sueldo base
                        }
                    ]
                }

                console.log(this.gastosUltimos);
                

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