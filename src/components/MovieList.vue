<script setup>
import { ref, onMounted } from 'vue';
import ListedMovie from '../components/ListedMovie.vue';
import FeaturedMovie from './FeaturedMovie.vue';

const movies = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('https://api.example.com/movies'); // Replace with real API endpoint
        movies.value = response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
});

// This is a placeholder for the movie data

const placeholderMovies = [
    {
        id: 1,
        posterUrl: 'https://placehold.co/600x400',
        title: 'Featured Placeholder Movie 1',
        link: '#',
        genre: 'Drama',
        duration: 90,
        description: 'This is a placeholder description for Featured Movie 1.'
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

    <FeaturedMovie v-if="movies.length" :movie="movies[0]">
        <template #poster>
            <img :src="movies[0].posterUrl" :alt="movies[0].title + ' Poster'">
        </template>
        <template #title>
            <h2>
                <a :href="movies[0].link">{{ movies[0].title }}</a>
            </h2>
        </template>
        <template #genre>
            <p>{{ movies[0].genre }}</p>
        </template>
        <template #duration>
            <p>{{ movies[0].duration }} Minutes</p>
        </template>
        <template #description>
            <p>{{ movies[0].description }}</p>
        </template>

    </FeaturedMovie>

    <ListedMovie v-for="movie in movies.slice(1)" :key="movie.id">
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
