<template>
    <section>
    <div class="desc">
        <h1 class="title is-4">Transações</h1>

        <div class="select is-info">
            <select @change="changeTimePeriod" v-model="timePeriod">
                <option value="all">Todo Período</option>
                <option value="7">Esta semana</option>
                <option value="90">Este mês</option>
                <option value="180">6 meses</option>
                <option value="365">1 ano</option>
            </select>
        </div>
    </div>
    
    

    <div class="table-container">
    
    <div v-if="filteredTransactions.length == 0" class="warn">
        <p>Não há nenhuma transação registrada neste período</p>
    </div>

    <table v-else class="table is-striped fixed-height">
        <thead class="fixed-width">
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(transaction, index) in filteredTransactions" :key="index">
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
        transactions: Array,
    },
    data(){
        return {
            timePeriod: 'all',
            filteredTransactions: []
        }
    },
    watch: {
        transactions: {
            immediate: true, // Executa o watch assim que o componente for criado
            handler(newTransactions) {
                this.filteredTransactions = newTransactions;
            }
        }
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
        },
        changeTimePeriod(){
            var period = this.timePeriod;
            this.$emit('changeTimePeriod', period);

            if(period == 'all'){
                this.filteredTransactions = this.transactions;
            } else {
                var periodDays = Number.parseInt(period);
                var minDate = new Date();
                minDate.setDate(minDate.getDate() - periodDays);

                this.filteredTransactions = this.transactions
                .filter(t => new Date(t.date) >= minDate);
            }

            
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
    height: 300px !important;
    width: 605px;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}
.table-container table {
    table-layout: fixed; /* Ajuda a controlar o layout da tabela e evitar que ela ultrapasse os limites */
}
.desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.fixed-width {
    width: 605px;
}
.warn {
    overflow: hidden !important;
    height: 300px !important;
    width: 605px;
    background-color: #F1EFEC;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
}
</style>