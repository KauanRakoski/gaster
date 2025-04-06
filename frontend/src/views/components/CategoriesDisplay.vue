<template>
    <section>
        <h3 class="title is-4">Gastos por categoria</h3>

        <div v-if="categories.length == 0" class="warn rmg">
            <p>Não foram registrados gastos neste período</p>
        </div>

        <div v-else>
            <Doughnut :data="chartdata" :options="chartoptions" />
        
            <ul class="legend">
                <li class="showCat" v-for="(category, index) in categories" :key="index">
                    <div class="colorbox" :style="`background-color: ${category.color}`"></div>
                    <p>{{ category.category_name }}</p>
                </li>
            </ul>
        </div>
        
    </section>
</template>

<script>
import api from '@/api';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default {
    name: 'CategoriesDisplay',
    components: {
        Doughnut
    },
    data(){
        return {
            categories: [],
            chartdata: {
                labels: [],
                datasets: [{
                    backgroundColor: [],
                    data: []
                }]
            },
            chartoptions: {
                responsive: false,
                maintainAspectRatio: false
            }
        }
    },
    created(){
        var token = localStorage.getItem('token');

        api.get('/category/all', { headers: { Authorization: token }})
            .then(res => {
                var categories = res.data.categories;
                this.categories = categories;

                this.chartdata = {
                    labels: categories.map(category => category.category_name),
                    datasets: [{
                        backgroundColor: categories.map(category => category.color),
                        data: categories.map(category => parseInt(category.total_amount))
                }]}
            })
            .catch(err => console.log(err))

           
    }, 
    methods: {
        refreshGraph(time_period){
            console.log(time_period)
            var token = localStorage.getItem('token');

        api.get(`category/${time_period}`, { headers: { Authorization: token }})
            .then(res => {
                var categories = res.data.categories;
                this.categories = categories;

                this.chartdata = {
                    labels: categories.map(category => category.category_name),
                    datasets: [{
                        backgroundColor: categories.map(category => category.color),
                        data: categories.map(category => parseInt(category.total_amount))
                }]}})
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
section {
    padding: 0px !important;
    margin-top: 0;
}
h3 {
    padding: 0;
    margin-top: 0 !important;
}
.field {
    margin-top: 20px;
}
.colorbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.showCat{
    display: flex;
    align-items: center;
}
.legend{
    margin-top: 30px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.rmg {
    margin-top: -5px;
}
</style>