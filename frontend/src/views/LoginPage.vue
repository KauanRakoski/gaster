<template>
  <PublicNav/>
  <section class="center">
      <h1 class="title is-3">Entrar</h1>

      <form onsubmit="event.preventDefault()" class="column is-half">
          <div>
              <label for="email" class="label">Email:</label>
              <input type="email" v-model="email" class="input" name="email" placeholder="bruce@wayne.co">
              <p class="help is-danger">{{ emailError }}</p>
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


          <button @click="submitForm" class="button is-primary column is-full mt">Entrar</button>
      </form>

      <router-link to="/recover" class="mt">Esqueci a senha</router-link>
      <router-link to="/register" class="mt">Ainda não possui uma conta? Cadastre-se</router-link>
  </section>
</template>

<script>
import api from '../api'
import PublicNav from './components/PublicNav'

export default {
  name: 'LoginPage',
  components: {
    PublicNav
  },
  data(){
    return {
      passwordType: 'password',
      emailError: '',
      passwordError: '',
      email: '',
      password: ''
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

      var body = {
        email: this.email,
        password: this.password
      }

      api.post('/login', body).then(res => {
        localStorage.setItem("token", `Bearer ${res.data.description}`);
        this.$router.push({name: 'home'});
      }).catch(err => {
          if (err.response.status == 401){
            this.emailError = '';
            this.passwordError = 'Senha incorreta!';
          } 
          
          if (err.response.status == 404){
            this.passwordError = '';
            this.emailError = 'Insira um email existente e válido!'
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
    margin-top: 50px;
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