<template>
    <div class="donut">
        <Doughnut :data="chartData" :options="options" />
    </div>
</template>

<style scoped>
    .donut{
        width: 100%;
    }
</style>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    components: { Doughnut },
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                animation: {
                    animateRotate: true,
                    duration: 1000,
                },
            }),
        },
    },
    computed: {
        chartData() {
            return this.data;
        },
    },
};
</script>

<style scoped>
.wou {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}
</style>
