<script>
import DonutChart from '@/components/DonutChart.vue';
import { supabase } from '@/lib/supabaseClient.js';
const { data: { user } } = await supabase.auth.getUser();

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
        }
    },
    methods: {
        async fetchGastos() {
            try {
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
    <DonutChart v-if="gastosDonutData" :data="gastosDonutData"/>
</template>