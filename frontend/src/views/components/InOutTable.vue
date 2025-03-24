<template>
    <section>
    <h1 class="title is-4">Transações</h1>
    <div class="table-container">
    <table class="table is-striped fixed-height">
        <thead>
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
                <td>{{ formatDate(transaction.date) }}</td>
                <td>{{ transaction.description }}</td>
                <td>{{ transaction.category_name }}</td>
                <td :class="transaction.type ? 'entrada' : 'gasto'">R${{ transaction.amount }}</td>
                <td><ActionButtons :id="transaction.id" @deleteTransaction="deleteTransaction(transaction.id)"/></td>
            </tr>
        </tbody>
    </table>
    </div>

    </section>
</template>

<script>
import api from '@/api';
import ActionButtons from './ActionButtons.vue';

export default {
    name: 'InOutTable',
    components: {
        ActionButtons
    },
    props: {
        transactions: Array
    },
    methods: {
        formatDate(date){
            var dateObj = new Date(date);
            var day = dateObj.getDate().toString().padStart(2, '0');
            var month = dateObj.getMonth() + 1;
            month = month.toString().padStart(2, '0');

            return `${day}/${month}/${dateObj.getFullYear()}`
        },
        deleteTransaction(id){
            var token = localStorage.getItem('token');

            api.delete(`/transaction/${id}`, {
                headers: { Authorization: token }
            }).then(() => this.$emit('requestRefresh'));
        }
    }
}
</script>

<style>
.entrada {
    color: #16C47F !important;
}
.gasto {
    color: #F93827 !important;
}
.table-container {
    max-height: 300px !important;
    overflow-y: scroll !important;
}
.table-container table {
    table-layout: fixed; /* Ajuda a controlar o layout da tabela e evitar que ela ultrapasse os limites */
}

</style>