<script>
import ModalEditar from './modalEditar.vue';
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
    components: {
        ModalEditar,
    },
    props: {
        planActual: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            gastos: [],
            showEditModal: false,
            gastoEditado: null,
            loading: true,
        };
    },
    methods: {
        async fetchGastos() {
            try {
                if (!user) return;

                const currentDate = new Date();
                const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
                const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

                const { data: gastos, error } = await supabase
                    .from('plan_gastos')
                    .select('*, subcategorias(nombre, id_subcategoria)')
                    .eq('id_plan', this.planActual.id_plan)
                    .gte('fecha', firstDay)
                    .lte('fecha', lastDay);

                if (error) throw error;

                this.gastos = gastos;
            } catch (error) {
                console.error('Error cargando los gastos:', error.message);
            }
        },
        async deleteGasto(id_gasto) {
            if (!confirm('¿Seguro que deseas eliminar este gasto?')) return;

            try {
                const { error } = await supabase.from('plan_gastos').delete().eq('id_gasto', id_gasto);
                if (error) throw error;

                this.gastos = this.gastos.filter(gasto => gasto.id_gasto !== id_gasto); // 
                alert('Gasto eliminado correctamente.');
            } catch (error) {
                console.error('Error eliminando gasto:', error.message);
            }
            this.$emit('gasto-eliminado')
        },
        openEditModal(gasto) {
            this.gastoEditado = { ...gasto, id_subcategoria: gasto.id_subcategoria };
            
            this.showEditModal = true;
        },
        async updateGasto(gastoEditado) {
            try {
                const { error } = await supabase
                    .from('plan_gastos')
                    .update({
                        monto: gastoEditado.monto,
                        id_subcategoria: gastoEditado.id_subcategoria,
                        descripcion: gastoEditado.descripcion
                    })
                    .eq('id_gasto', gastoEditado.id_gasto);

                if (error) throw error;
                this.showEditModal = false;

                await this.fetchGastos();
                alert('Gasto actualizado correctamente.');
            } catch (error) {
                console.error('Error actualizando gasto:', error.message);
            }
            this.$emit('gasto-editado')
        },
    },
    async mounted() {
        await Promise.all([this.fetchGastos()]);
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
                    <th scope="col">Categoría</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="gasto in gastos" :key="gasto.id">
                    <th scope="row">{{ gasto.subcategorias.nombre }}</th>
                    <td>{{ gasto.monto }}</td>
                    <td>{{ gasto.descripcion }}</td>
                    <td>{{ new Date(gasto.fecha).toLocaleDateString() }}</td>
                    <td>
                        <button @click="openEditModal(gasto)">Editar</button>
                    </td>
                    <td>
                        <button @click="deleteGasto(gasto.id_gasto)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Teleport to="body">
            <ModalEditar v-if="showEditModal" :show="showEditModal" :gasto="gastoEditado" @close="showEditModal = false" @save="updateGasto">
            </ModalEditar>
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
