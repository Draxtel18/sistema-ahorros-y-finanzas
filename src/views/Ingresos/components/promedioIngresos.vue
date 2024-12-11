<script>
import modalIngresos from './modalIngresos.vue';
import { supabase } from '@/lib/supabaseClient.js';

export default {
    components: {
        modalIngresos,
    },
    props: {
        planActual: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            showModal: false,
            promedio: null,
        }
    },
    methods: {
        async fetchIngreso() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.error('El usuario no está disponible');
                    return;
                }

                const { data: planes, error } = await supabase
                    .from('planesfinanzas')
                    .select('id_plan, fecha_inicio, plan_ingresos(monto)')
                    .eq('id_usuario', user.id)
                    .order('id_plan', { ascending: false })
                    .limit(6);

                const totalIngresos = planes.reduce((sum, plan) => {
                    const sumaPlan = plan.plan_ingresos.reduce((sumPlan, ingreso) => sumPlan + ingreso.monto, 0);
                    return sum + sumaPlan;
                }, 0);

                const cantidadPlanes = planes.length;

                this.promedio = parseFloat(totalIngresos / cantidadPlanes).toFixed(2);

                if (error) throw error;
            } catch (error) {
                console.error('Error al obtener ultimos Ingresos:', error);
            }
        }
    },
    async mounted() {
        await this.fetchIngreso();
        this.promedio;
    }
}
</script>

<style scoped>
.outer {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
    position: relative;
}

.dot {
    width: 5px;
    aspect-ratio: 1;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px #ffffff;
    border-radius: 100px;
    z-index: 2;
    right: 10%;
    top: 10%;
    animation: moveDot 6s linear infinite;
}

@keyframes moveDot {

    0%,
    100% {
        top: 10%;
        right: 10%;
    }

    25% {
        top: 10%;
        right: calc(100% - 35px);
    }

    50% {
        top: calc(100% - 30px);
        right: calc(100% - 35px);
    }

    75% {
        top: calc(100% - 30px);
        right: 10%;
    }
}

.card {
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 9px;
    border: solid 1px #202222;
    background-size: 20px 20px;
    background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    color: #fff;
    padding: 2rem;
}

.ray {
    width: 220px;
    height: 45px;
    border-radius: 100px;
    position: absolute;
    background-color: #c7c7c7;
    opacity: 0.4;
    box-shadow: 0 0 50px #fff;
    filter: blur(10px);
    transform-origin: 10%;
    top: 0%;
    left: 0;
    transform: rotate(40deg);
}

.card .text {
    font-weight: bolder;
    font-size: 4rem;
    background: linear-gradient(45deg, #000000 4%, #fff, #000);
    background-clip: text;
    color: transparent;
}

.line {
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: #2c2c2c;
}

.topl {
    top: 10%;
    background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
}

.bottoml {
    bottom: 10%;
}

.leftl {
    left: 10%;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, #747474 30%, #222424 70%);
}

.rightl {
    right: 10%;
    width: 1px;
    height: 100%;
}
</style>

<template>
    <div class="outer">
        <div class="dot"></div>
        <div class="card">
            <div class="ray"></div>
            <div class="text">S/{{ promedio }}</div>
            <div>Ingresos promedios</div>
            <div class="line topl"></div>
            <div class="line leftl"></div>
            <div class="line bottoml"></div>
            <div class="line rightl"></div>
        </div>
    </div>
</template>
