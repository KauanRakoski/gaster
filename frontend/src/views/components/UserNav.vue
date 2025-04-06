<template>
    <nav>
        <router-link to="/home" class="logo-holder">
            <img  class="logo" src="../../assets/logo.svg">
            <h1 class="title is-4">Gaster</h1>
        </router-link>
        

        <ul>
            <li>
                <router-link to="create" class="createbtn">Adicionar transação</router-link>
            </li>

            <li>
                <router-link to="/profile">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#ffffff"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#ffffff"></path> </g></svg>
                </router-link>
            </li>
        </ul>
        
    </nav>
</template>

<script>
export default {
    name: 'UserNav'
}
</script>

<style scoped>
nav {
    background-color: #2973B2;
    display: flex;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
h1 {
    color: #FFFFFF;
    padding: 0 !important;
    margin: 0 !important;
}
svg {
    width: 25px;
    margin-top: 8px;
}

ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.createbtn{
    background-color: #24A1AE;
    color: white;
    font: bold;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 12px;
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