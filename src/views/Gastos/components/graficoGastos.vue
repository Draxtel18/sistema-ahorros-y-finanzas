<script>
import BarChart from '@/components/BarChart.vue';
import { supabase } from '@/lib/supabaseClient.js';

export default {
    components: {
        BarChart,
    },
    props: {
        planActual: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            gastosData: null,
            loading: true,
        }
    },
    methods: {
        async fetchGastos() {
            try {
                const { data: gastos, error } = await supabase
                    .from('plan_gastos')
                    .select(`
                        subcategorias(id_categoria, categorias(nombre)),
                        monto
                    `)
                    .eq('id_plan', this.planActual.id_plan)
                    .in('subcategorias.id_categoria', [1, 2])

                if (error) throw error;

                // Agrupar gastos por categoría
                const gastosPorCategoria = gastos.reduce((acc, gasto) => {
                    const categoria = gasto.subcategorias.id_categoria;
                    acc[categoria] = (acc[categoria] || 0) + gasto.monto;
                    return acc;
                }, {});

                // Obtener nombres de categorías
                const { data: categorias } = await supabase
                    .from('categorias')
                    .select('id, nombre')
                    .filter('nombre', 'in', '("necesidades","gustos")')

                // Preparar datos para el gráfico
                this.gastosData = {
                    labels: categorias.map(cat => cat.nombre),
                    datasets: [
                        {
                            label: 'Gastos por Categoría',
                            backgroundColor: '#f87979',
                            data: categorias.map(cat =>
                                gastosPorCategoria[cat.id] || 0
                            )
                        }
                    ]
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
    <BarChart v-if="gastosData" :data="gastosData"/>
</template>

<style scoped>

</style>