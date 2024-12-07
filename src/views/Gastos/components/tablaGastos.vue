<script>
import ModalEditar from './modalEditar.vue';
import { supabase } from '@/lib/supabaseClient.js';

const { data: { user } } = await supabase.auth.getUser()

export default {
    components: {
        ModalEditar,
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
                    .from('gastos')
                    .select('*')
                    .eq('user_id', user.id)
                    .gte('fecha', firstDay)
                    .lte('fecha', lastDay);

                if (error) throw error;

                this.gastos = gastos;
            } catch (error) {
                console.error('Error cargando los gastos:', error.message);
            }
        },
        async deleteGasto(id) {
            if (!confirm('¿Seguro que deseas eliminar este gasto?')) return;

            try {
                const { error } = await supabase.from('gastos').delete().eq('id', id);
                if (error) throw error;

                this.gastos = this.gastos.filter(gasto => gasto.id !== id); // Actualizar lista local
                alert('Gasto eliminado correctamente.');
            } catch (error) {
                console.error('Error eliminando gasto:', error.message);
            }
        },
        openEditModal(gasto) {
            this.gastoEditado = { ...gasto };
            this.showEditModal = true;
        },
        async updateGasto(gastoEditado) {
            try {

                const { error } = await supabase
                    .from('gastos')
                    .update({
                        monto: gastoEditado.monto,
                        categoria: gastoEditado.categoria,
                        descripcion: gastoEditado.descripcion
                    })
                    .eq('id', gastoEditado.id);

                if (error) throw error;
                this.showEditModal = false;

                await this.fetchGastos();
                alert('Gasto actualizado correctamente.');
            } catch (error) {
                console.error('Error actualizando gasto:', error.message);
            }
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
        <table>
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="gasto in gastos" :key="gasto.id">
                    <td>{{ gasto.categoria }}</td>
                    <td>{{ gasto.monto }}</td>
                    <td>{{ gasto.descripcion }}</td>
                    <td>{{ new Date(gasto.fecha).toLocaleDateString() }}</td>
                    <td>
                        <!--
                            <button @click="openEditModal(gasto)">Editar</button>
                        -->
                        <button @click="openEditModal(gasto)">Editar</button>
                        <button @click="deleteGasto(gasto.id)">Eliminar</button>
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
</style>
