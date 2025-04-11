<script setup>
import { ref, onMounted } from 'vue';
import ListedMovie from '../components/ListedMovie.vue';
import axios from 'axios';
import APIURLService from '@/services/API.service';

const movies = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get(APIURLService.getAPIUrl()+'/api/Showing'); 
        movies.value = response.data;
        console.log(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
});

// This is a placeholder for the movie data

const placeholderMovies = [
    {
        id: 1,
        posterUrl: 'https://placehold.co/600x400',
        title: 'Placeholder Movie 1',
        link: '#',
        genre: 'Drama',
        duration: 90,
        description: 'This is a placeholder description for Movie 1.'
    },
    {
        id: 2,
        posterUrl: 'https://placehold.co/600x400',
        title: 'Placeholder Movie 2',
        link: '#',
        genre: 'Comedy',
        duration: 110,
        description: 'This is a placeholder description for Movie 2.'
    },
    {
        id: 3,
        posterUrl: 'https://placehold.co/600x400',
        title: 'Placeholder Movie 3',
        link: '#',
        genre: 'Action',
        duration: 120,
        description: 'This is a placeholder description for Movie 3.'
    }
];

movies.value = placeholderMovies;

</script>

<template>
    <ListedMovie v-for="movie in movies" :key="movie.id">
        <template #poster>
            <img :src="movie.posterUrl" :alt="movie.title + ' Poster'">
        </template>
        <template #title>
            <h3>
                <a :href="movie.link">{{ movie.title }}</a>
            </h3>
        </template>
        <template #genre>
            <p>{{ movie.genre }}</p>
        </template>
        <template #duration>
            <p>{{ movie.duration }} Minutes</p>
        </template>
        <template #description>
            <p>{{ movie.description }}</p>
        </template>
    </ListedMovie>
</template>
