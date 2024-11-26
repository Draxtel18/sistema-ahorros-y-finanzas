<template>
    <div class="donut">
        <Doughnut :data="chartData" :options="options" />
    </div>
    <div class="wou">
        <button @click="addExpense">Agregar Gasto</button>
        <p>{{ gastosActuales }} de {{ presupuesto }} </p>
    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Doughnut,
    },
    setup() {
        const presupuesto = 1300;
        const gastosActuales = ref(430.3);

        const calcularPorcentaje = () => (gastosActuales.value / presupuesto) * 100;

        const chartData = ref({
            labels: ['Gastado', 'Disponible'],
            datasets: [
                {
                    data: [calcularPorcentaje(), 100 - calcularPorcentaje()],
                    backgroundColor: ['#8A3', '#BBB'],
                    borderColor: ['transparent']
                },
            ],
        });

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                Tooltip: {
                    display: false
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000,
            },
            
            
        };

        const addExpense = () => {
            const newExpense = Math.floor(Math.random() * 200);
            if (gastosActuales.value + newExpense <= presupuesto) {
                gastosActuales.value += newExpense;
            } else {
                gastosActuales.value = presupuesto;
            }

            chartData.value = {
                labels: ['Gastado', 'Disponible'],
                datasets: [
                    {
                        data: [calcularPorcentaje(), 100 - calcularPorcentaje()],
                        backgroundColor: ['#8A3', '#BBB'],
                    },
                ],
            };
        };

        return {
            chartData,
            options,
            addExpense,
            presupuesto,
            gastosActuales
        };
    },
};
</script>

<style scoped>

.wou{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}


</style>
