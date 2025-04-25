<script setup>
import { ref } from 'vue';
import FeaturedMovie from './FeaturedMovie.vue';

// Testdaten für die Filme
const movies = [
  {
    id: 1,
    posterUrl: 'https://placehold.co/600x400',
    title: 'Featured Movie 1',
    link: '#',
    genre: 'Drama',
    duration: 90,
    description: 'This is a description for Featured Movie 1.',
  },
  {
    id: 2,
    posterUrl: 'https://placehold.co/600x400',
    title: 'Featured Movie 2',
    link: '#',
    genre: 'Comedy',
    duration: 110,
    description: 'This is a description for Featured Movie 2.',
  },
  {
    id: 3,
    posterUrl: 'https://placehold.co/600x400',
    title: 'Featured Movie 3',
    link: '#',
    genre: 'Action',
    duration: 120,
    description: 'This is a description for Featured Movie 3.',
  },
  {
    id: 4,
    posterUrl: 'https://placehold.co/600x400',
    title: 'Featured Movie 4',
    link: '#',
    genre: 'Thriller',
    duration: 100,
    description: 'This is a description for Featured Movie 4.',
  },
];

const currentIndex = ref(0);

// Methods to navigate the slider
const nextMovie = () => {
  currentIndex.value = (currentIndex.value + 1) % movies.length;
};

const prevMovie = () => {
  currentIndex.value = (currentIndex.value - 1 + movies.length) % movies.length;
};
</script>

<template>
  <div class="featured-movie-slider">
    <button @click="prevMovie" class="slider-button prev">❮</button>

    <div class="slider-container">
      <div
        class="slider-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <FeaturedMovie
          v-for="(movie, index) in movies"
          :key="movie.id"
          :movie="movie"
          class="slider-item"
          :class="{ centered: index === currentIndex }"
        >
          <template #poster>
            <img :src="movie.posterUrl" :alt="movie.title + ' Poster'" />
          </template>
          <template #title>
            <h2>
              <a :href="movie.link">{{ movie.title }}</a>
            </h2>
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
        </FeaturedMovie>
      </div>
    </div>

    <button @click="nextMovie" class="slider-button next">❯</button>
  </div>
</template>

<style scoped>
.featured-movie-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.slider-container {
  width: 100%;
  overflow: hidden;
  margin: 0 40px; 
  transition: transform 0.3s ease-in-out;
}

.slider-container:hover{
    transform: scale(1.05); /* Slightly larger on hover */
    opacity: 1; /* Full opacity on hover */
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-item {
  flex: 0 0 100%; /* Each item takes full width */
  opacity: 0.5; /* Blended effect for non-centered items */
  transform: scale(0.8); /* Smaller size for non-centered items */
  transition: transform 0.5s ease, opacity 0.5s ease;
  box-sizing: border-box;
  padding: 10px;
}



.slider-item.centered {
  opacity: 1; /* Full opacity for the centered item */
  transform: scale(1); /* Full size for the centered item */
}

.slider-button {
  background: none;
  border: none;
  color: red;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.slider-button.prev {
  left: 10px;
}

.slider-button.next {
  right: 10px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>