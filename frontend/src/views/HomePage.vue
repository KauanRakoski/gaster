<template>
  <div class="home">
    <UserNav/>

    <section class="home-view">
      <CategoriesDisplay ref="graph"/>

      <section class="column-view">
        <InOutTable :transactions="transactions" @requestRefresh="refreshPage"/>
        <BalanceDisplay :inAmount="inAmount" :outAmount="outAmount"/>
      </section>
      
    </section>
  </div>
</template>

<script>
import UserNav from './components/UserNav.vue';
import InOutTable from './components/InOutTable.vue';
import CategoriesDisplay from './components/CategoriesDisplay.vue';
import BalanceDisplay from './components/BalanceDisplay.vue';
import api from '@/api';

export default {
  name: 'HomePage',
  components: {
    UserNav, InOutTable, CategoriesDisplay, BalanceDisplay
  },
  data(){
    return {
      transactions: [],
      inAmount: 0,
      outAmount: 0
    }
  },
  created(){
    var usertoken = localStorage.getItem("token");

    api.get('/transaction', {
      headers: { Authorization: `${usertoken}` }
    }).then(res => {
      var transactions = res.data.transactions;

      this.transactions = transactions;
      this.inAmount = transactions.filter(t => t.type == 1).reduce((acc, current) => acc + Number(current.amount), 0);
      this.outAmount = transactions.filter(t => t.type == 0).reduce((acc, current) => acc + Number(current.amount), 0);
    })
  },
  methods: {
    refreshPage(){
      var usertoken = localStorage.getItem("token");

      api.get('/transaction', {
        headers: { Authorization: `${usertoken}` }
      }).then(res => {
        var transactions = res.data.transactions;
        this.$refs.graph.refreshGraph();

        this.transactions = transactions;
        this.inAmount = transactions.filter(t => t.type == 1).reduce((acc, current) => acc + Number(current.amount), 0);
        this.outAmount = transactions.filter(t => t.type == 0).reduce((acc, current) => acc + Number(current.amount), 0);
      })
    }
  }
}
</script>

<style scoped>
.home-view{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
}
.column-view {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px !important;
  margin-top: 0px !important;

}
</style>
