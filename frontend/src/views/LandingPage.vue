<template>
    <PublicNav/>

    <section class="is-display-flex is-align-items-center is-justify-content-space-around mt-100">
        <div class="column text">
            <h1 class="title is-3">Organize suas finanças</h1>

            <p>
            Aqui você visualiza entradas e saídas com clareza e toma decisões melhores para o seu bolso. 
            Tudo em um só lugar, de forma prática e segura.
            </p>

            <router-link class="cta" to="/login">Entrar agora</router-link>
        </div>

        <img class="column strt" src="../assets/first.svg" alt="Pessoa organizando metas financeiras">
    </section>
</template>

<script>
import PublicNav from './components/PublicNav.vue';

export default {
    name: 'LandingPage',
    components: {
        PublicNav
    }
}
</script>

<style scoped>
.strt {
    max-width: 400px !important;
    height: 400px;
    padding: 0 !important;
}
.mt-100 {
    margin-top: 50px;
}
.text {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.cta{
    background-color: #24A1AE;
    color: white;
    font: bold;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
}
</style>