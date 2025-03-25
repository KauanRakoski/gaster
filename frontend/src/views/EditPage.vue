<template>
    <UserNav/>
    <section class="mother">
        <h3 class="title is-4">Registrar nova transação</h3>

        <form onsubmit="event.preventDefault()" class="column is-one-third is-centered">
            <div class="columns mb-small">
                <div class="field column">
                    <label for="amount"><strong>Valor:</strong></label>
                    <input required type="text" class="input" name="amount" placeholder="6.25" v-model="amount">
                </div>

                <div class="field column">
                    <label for="amount"><strong>Data:</strong></label>
                    <input type="date" name="date" class="input" v-model="date">
                </div>
            </div>

            <div class="field mt-small">
                <label for="description"><strong>Descrição:</strong></label>
                <input type="text" name="description" class="input" placeholder="Compras no supermercado..." v-model="description">
            </div>

            <div class="field select-holder">
                <label for="category"><strong>Categoria:</strong></label>
                <span class="select">
                    <select required name="category" class="select" v-model="category" @change="handleChange">
                        <option value="0">Escolha uma categoria</option>
                        <option v-for="(cat, index) in categories" :key="index" :value="cat.id">
                            {{ cat.name }}
                        </option>
                        <optgroup label="Ações">
                            <option value="delete">🗑️ Excluir categoria selecionada</option>
                        </optgroup>
                    </select>
                </span>
            </div>

            <div class="field has-addons is-full">
            <div class="control">
                <input class="input" v-model="category_name" type="text" placeholder="Adicionar categoria...">
            </div>
            
        <div class="control">
            <button class="button is-info" @click="createCategory">Adicionar</button>
        </div>
        
        </div>

        <div class="is-display-flex is-align-items-center">
            <label for="color">Cor da categoria:</label>
            <input type="color" v-model="category_color" name="color" id="color">
        </div>

            <div class="buttons">
                <button class="in" @click="submitForm('entrada')">Registar Entrada</button>
                <button class="out" @click="submitForm('gasto')">Registrar Gasto</button>
            </div>
        </form>
    </section>
</template>

<script>
import UserNav from './components/UserNav.vue';
import api from '@/api';

export default {
    name: 'EditPage',
    components: {
        UserNav
    },
    data(){
        return {
            amount: '',
            description: '',
            date: '',
            category: 1,
            toBeDeleted: undefined,
            category_color: '#000000',
            category_name: '',
            categories: []
        }
    },
    created(){
        var token = localStorage.getItem('token');
        api.get('/rawcategory', {headers: { Authorization: token }})
            .then(res => {
                this.categories = res.data.categories;

                api.get(`/transaction/${this.$route.params.id}`, {headers: { Authorization: token }})
                    .then(res => {
                        var transaction = res.data.transaction;
                        console.log(transaction)
                        this.amount = transaction.amount;
                        this.description = transaction.description;
                        this.category = transaction.category_id;
                        this.date = transaction.date.split("T")[0];
                    });
            });

        
    },
    methods: {
        submitForm (type){
            var token = localStorage.getItem('token');

            var body = {
                amount: Number.parseFloat(this.amount),
                type: type,
                description: this.description,
                date: this.date,
                category_id: Number.parseInt(this.category)
            }

            console.log(body);

            api.post('/transaction', body, {
                headers: { Authorization: token }
            }).then(() => this.$router.push({name: 'home'}))
        },
        createCategory(){
            var token = localStorage.getItem("token");

            api.post('/category', {
                name: this.category_name,
                color: this.category_color
            }, {headers: { Authorization: token }}).then(() => this.category_name = '').then(() => {
                api.get('/rawcategory', {headers: { Authorization: localStorage.getItem('token') }})
                .then(res => this.categories = res.data.categories);
            })
        },
        handleChange() {
            if (this.category === "delete") {
                if (this.toBeDeleted) {
                  this.deleteSelectedCategory();
                }
                // Restaura a seleção para evitar inconsistências
                this.category = null;
            } else {
            // Atualiza a última categoria válida selecionada
            this.toBeDeleted = this.category;
            } 
        },
        deleteSelectedCategory() {
            var token = localStorage.getItem("token");

            console.log(`/category/${this.toBeDeleted}`)
            api.delete(`/category/${this.toBeDeleted}`, {
                headers: {Authorization: token}
            }).then(() => {
                this.categories = this.categories.filter(c => c.id !== this.toBeDeleted);
                this.selectedCategory = null;
            })
        }
    }
}
</script>

<style>
.mother {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
h3{
    margin: 50px 0 30px 0 !important;
}
.in{
    background-color: #24A1AE;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 15px;
    color: white;
    font-weight: bold;
}
.out {
    background-color: #D84040;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 15px;
    color: white;
    font-weight: bold;
}
.select-holder {
    display: flex;
    flex-direction: row;
    align-items: center;
}
label {
    margin-right: 10px;
}
.mb-small{
    margin-bottom: 0px !important;
}
.mt-small{
    margin-top: 0px !important;
}
.buttons {
    margin-top: 30px;
}
#color {
  padding: 0;
  width: 30px; /* Ajuste conforme necessário */
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
}
#color::-webkit-color-swatch {
  border-radius: 5px;
}

#color::-moz-color-swatch {
  border-radius: 5px;
}

</style>