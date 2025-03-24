<template>
    <div>
        <PublicNav/>

        <section class="center">
            <h1 v-if="this.$route.params.token" class="title is-3">Redefinir senha</h1>
            <h1 v-else class="title is-3">Recuperar senha</h1>

            <form v-if="!this.$route.params.token" onsubmit="event.preventDefault()" class="column is-half">
                <div>
                    <label for="email" class="label">Insira o email para recuperação de senha:</label>
                    <input type="email" v-model="email" class="input" name="email" placeholder="bruce@wayne.co">
                    <p class="help">{{ info }}</p>
                </div>

                <button @click="submitForm" class="button is-primary column is-full mt">Enviar link de recuperação</button>
            </form>

            <form v-else onsubmit="event.preventDefault()" class="column is-half">
                <div>
                    <label for="email" class="label">Insira a nova senha:</label>
                    <input type="password" v-model="password" class="input" name="email" placeholder="**********">
                    <p class="help">{{ info }}</p>
                </div>

                <button @click="submitPassword" class="button is-primary column is-full mt">Enviar link de recuperação</button>
            </form>
        </section>
    </div>
</template>

<script>
import PublicNav from './components/PublicNav.vue';
import api from '../api.js'

export default {
    name: 'RecoverPage',
    components: {
        PublicNav
    },
    data(){
        return {
            email: '',
            info: '',
            password: ''
        }
    },
    methods: {
        submitForm(){
            api.post('/recover', {
                email: this.email
            }).then(() => {
                this.info = 'Um email foi enviado para o endereço fornecido com um link de recuperação!'
            }).catch(() => this.info = 'Ocorreu um erro ao enviar email. Tente novamente mais tarde.')
        },
        submitPassword(){
            var token = this.$route.params.token;

            api.put('/user', {
                token: token,
                password: this.password
            }).then((res) =>{
                console.log(res)
                this.info = 'Senha alterada com sucesso!'
            })
            .catch((err) =>{
                console.log(err)
                this.info = 'Ocorreu um erro! Verifique se o token é válido e não está expirado.'
            })
        }
    }
}
</script>

<style scoped>
form{
    * {
        margin-top: 15px;
    }
    
}
</style>