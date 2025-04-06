<template>
    <nav>
        <router-link to="/" class="logo-holder">
            <img  class="logo" src="../../assets/logo.svg">
            <h1 class="title is-4">Gaster</h1>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'PublicNav'
}
</script>

<style scoped>
nav {
    background-color: #2973B2;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
h1 {
    color: #FFFFFF;
}
.logo-holder {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.logo {
    margin: 2px 10px 0 15px;
    width: 35px;
}
</style>