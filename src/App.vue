<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <!-- <div class="container"> -->
    <RouterView />
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
import APIURLService from './services/API.service';
  export default {
    name: 'App'
  }
  
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.form{
    position: relative;
    width: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
  }

nav {
  width: 100%;
  text-align: center;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1rem;
    /* margin-top: 1rem; */
  }
}
</style>
