<script setup>
import ListedMovie from '../components/ListedMovie.vue';
import MovieList from '../components/MovieList.vue';
import FeaturedMovie from '@/components/FeaturedMovie.vue';
import NavBar from '../components/NavBar.vue';
import TheWelcome from '../components/NavBar.vue';
</script>


<template>
  <main> 
    <MovieList/>
    <p> Hello World </p>

  </main>
</template>
<script>
  
  export default {
    name: 'HomeView',
    components: {
      
    }
  }
  </script>