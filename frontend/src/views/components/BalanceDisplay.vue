<template>
    <section>
        <h3 class="title is-4">Balanço</h3>
        <div class="basic-data">
            <p><span class="title is-6">Entradas</span> <span class="entrada">{{ formatCurrency(inAmount) }}</span></p>
            <p><span class="title is-6 sec">Saídas:</span> <span class="gasto">{{ formatCurrency(outAmount) }}</span></p>
        </div>
        
        <p><span class="title is-6">Disponível:</span> <span class="balance">{{ formatCurrency(inAmount - outAmount) }}</span></p>
    </section>
</template>

<script>
export default {
    name: 'BalanceDisplay',
    props: {
        inAmount: Number,
        outAmount: Number
    },
    methods: {
        formatCurrency(value){
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        }
    }
}
</script>

<style>
.basic-data {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
}
.sec {
    margin-left: 30px;
}
.balance {
    font-weight: bold;
}
</style>