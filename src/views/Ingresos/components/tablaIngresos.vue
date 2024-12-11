<script>
import ModalEditarIngreso from './modalEditarIngreso.vue';
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
    components: {
        ModalEditarIngreso,
    },
    props: {
        planActual: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            ingresos: [],
            showEditModal: false,
            ingresoEditado: null,
            loading: true,
        };
    },
    methods: {
        async fetchIngreso() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return;

                const { data: ingresos, error } = await supabase
                    .from('plan_ingresos')
                    .select('*')
                    .eq('id_plan', this.planActual.id_plan)

                if (error) throw error;

                this.ingresos = ingresos;
            } catch (error) {
                console.error('Error cargando los ingresos:', error.message);
            }
        },
        async deleteGasto(id_ingreso) {
            if (!confirm('¿Seguro que deseas eliminar este ingreso?')) return;

            try {
                const { error } = await supabase.from('plan_ingresos').delete().eq('id_ingreso', id_ingreso);
                if (error) throw error;

                this.ingresos = this.ingresos.filter(gasto => gasto.id_ingreso !== id_ingreso); // 
                alert('Ingreso eliminado correctamente.');
            } catch (error) {
                console.error('Error eliminando Ingreso:', error.message);
            }
            this.$emit('ingreso-eliminado')
        },
        openEditModal(ingreso) {
            this.ingresoEditado = { ...ingreso};
            this.showEditModal = true;
        },
        async updateIngreso(ingresoEditado) {
            try {

                console.log(ingresoEditado);
                
                const {error } = await supabase
                    .from('plan_ingresos')
                    .update({
                        monto: ingresoEditado.monto,
                        descripcion: ingresoEditado.descripcion
                    })
                    .eq('id_ingreso', ingresoEditado.id_ingreso);

                if (error) throw error;
                this.showEditModal = false;

                await this.fetchIngreso();
                alert('Ingreso actualizado correctamente.');
            } catch (error) {
                console.error('Error actualizando Ingreso:', error.message);
            }
            this.$emit('ingreso-editado')
        },
    },
    async mounted() {
        await Promise.all([this.fetchIngreso()]);
        this.loading = false;
    },
};
</script>

<template>
    <div v-if="loading">
        <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
    <div v-else>
        <table class="tablita">
            <thead>
                <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingreso in ingresos" :key="ingreso.id_ingreso">
                    <th scope="row">{{ ingreso.tipo }}</th>
                    <td>{{ ingreso.monto }}</td>
                    <td>{{ ingreso.descripcion }}</td>
                    <td>{{ new Date(ingreso.fecha).toLocaleDateString() }}</td>
                    <td>
                        <button @click="openEditModal(ingreso)">Editar</button>
                    </td>
                    <td>
                        <button @click="deleteGasto(ingreso.id_ingreso)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Teleport to="body">
            <ModalEditarIngreso v-if="showEditModal" :show="showEditModal" :ingreso="ingresoEditado" @close="showEditModal = false" @save="updateIngreso">
            </ModalEditarIngreso>
        </Teleport>
    </div>
</template>

<style scoped>
div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tablita {
    width: 100%;
    height: 100%;
}


table {
    width: 100%;
    color: #6B7280;
}

thead {
    color: #374151;
    background-color: #F9FAFB;
}

thead>tr>th,
tbody>tr>td,
tbody>tr>th {
    padding: 0.5rem 0.5rem;
    text-align: center;
}

tbody>tr>th {
    white-space: nowrap;
}

button {
    background-color: #6B7280;
    width: 100%;
    height: 30px;
    border-radius: 0.5rem;
}

button:hover {
    background-color: #93919f;
}
</style>
