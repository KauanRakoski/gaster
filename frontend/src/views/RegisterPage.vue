<template>
    <PublicNav/>
    <section class="center">
        <h1 class="title is-3">Cadastrar um novo usuário</h1>

        <form onsubmit="event.preventDefault()" class="column is-half">
            <div>
                <label for="email" class="label">Email:</label>
                <input type="email" v-model="email" class="input" name="email" placeholder="bruce@wayne.co">
                <p class="help is-danger">{{ emailError }}</p>
            </div>

            <div class="mt">
                <label for="phone" class="label">Número de telefone:</label>
                <input type="text" v-model="phone" class="input" name="phone" placeholder="(55) 99999-9999">
            </div>

            <div class="mt">
                <label for="password" class="label">Senha:</label>
                <input :type="passwordType" v-model="password" class="input" name="password" placeholder="***********">
                <p class="help is-danger">{{ passwordError }}</p>

                <div class="show-text">
                    <input @change="showHidePassword" type="checkbox" id="">
                    <label class="help">Mostrar senha</label>
                </div>
            </div>


            <button @click="submitForm" class="button is-primary column is-full mt">Realizar Cadastro</button>
        </form>
    </section>
</template>

<script>
import api from '../api';
import PublicNav from './components/PublicNav';

export default {
    name: 'RegisterPage',
    components: {
        PublicNav
    },
    data(){
        return {
            passwordType: 'password',
            email: '',
            phone: '',
            password: '',
            emailError: '',
            passwordError: '',
        }
    },
    methods: {
        showHidePassword(){
            if (this.passwordType == 'password')
                this.passwordType = 'text';
            else
                this.passwordType = 'password';
        },
        submitForm(){
            console.log(this.email, this.phone, this.password);
            var body = {
                email: this.email,
                phone_number: this.phone,
                password: this.password
            }
            
            api.post('/user', body).then(() => {
                this.$router.push({name: 'login'})
            }
            ).catch(err => {
                if (err.status == 403)
                    this.emailError = err.response.data.description;
                else{
                    this.emailError = err.response.data.emailError;
                    this.passwordError = err.response.data.passwordError;
                }
            })
        }
    }
}
</script>

<style>
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
}
.mt {
    margin-top: 10px;
}
.show-text {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
        margin-top: 1px;
        margin-right: 5px;
    }
}

</style>