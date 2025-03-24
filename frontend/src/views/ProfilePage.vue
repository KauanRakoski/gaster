<template>
    <div>
        <UserNav/>

        <section class="page">
            <div>
                <h3 class="title is-4">Detalhes do perfil:</h3>
                <p><span class="bold">Email:</span> {{ user_email }}</p>
                <p><span class="bold">Número de celular:</span> {{ user_phone }}</p>

                <div class="buttons">
                    <button class="button-c primary">Editar Dados</button>
                    <button class="button-c danger" @click="logout">Sair</button>
                </div>

                <div class="api-token">
                    <p><span class="bold">Chave de API:</span></p>
                    <p class="copiable">{{ api_token }} <button class="button">Copy</button></p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import UserNav from './components/UserNav.vue';
import api from '@/api';

export default {
    name: 'ProfilePage',
    components: {
        UserNav
    },
    data(){
        return {
            user_email: '',
            user_phone: '',
            api_token: ''
        }
    },
    created(){
        var token = localStorage.getItem('token');
        this.api_token = token.split(' ')[1];
        api.get('/user', {
            headers: { Authorization: token}
        }).then(res => {
            console.log(res)
            this.user_email = res.data.userdata.email;
            this.user_phone = res.data.userdata.phone_number;
        })
    },
    methods: {
        logout(){
            localStorage.removeItem("token");
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style scoped>
.bold {
    font-weight: bold;
}
.button-c{
    background-color: #24A1AE;
    color: white;
    font: bold;
    padding: 10px;
    width: 100px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 12px;
}
.buttons {
    margin: 10px 0 10px 0 !important;
}
.primary {
    background-color: #24A1AE;
}
.danger {
    background-color: #D84040;
}
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
}
.api-token {
    padding: 1em;
    background-color: #CAEEF2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}
p {
    margin-top: 10px;
}
.copyable {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>