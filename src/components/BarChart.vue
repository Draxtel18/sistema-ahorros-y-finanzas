<template>
    <Bar :data="data" :options="options" />
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    props: ['data'],
    components: {
        Bar
    },
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };
    }
};

/*
export default {
    name: 'App',
    components: {
        Bar
    },
    data() {
        return {
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [
                    {

                        backgroundColor: '#f87979',
                        data: [120, 0, 80, 100, 400, 215]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
            }
        }
    }
}
    */

</script>