<script setup>
import ListedMovie from '@/components/ListedMovie.vue';
import NavBar from '../components/NavBar.vue';
import TheWelcome from '../components/NavBar.vue'
</script>


<template>
  <main>
<ListedMovie>
  <template #poster>
    <img src="https://placehold.co/600x400" alt="Movie Poster">
  </template>
  <template #Title>
    <h3>Movie Title</h3>
  </template>
  <template #genre>
    <p>Action</p>
  </template>
  <template #duration>
    <p>120</p>
  </template>
</ListedMovie>
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