<script setup>
import { ref, onMounted } from 'vue';
import ListedMovie from '../components/ListedMovie.vue';
import axios from 'axios';
import APIURLService from '@/services/API.service';
import TimeConverterService from '@/services/TimeConverter.service';
import FeaturedMovie from './FeaturedMovie.vue';
import ShowingsList from './ShowingsList.vue';

const movies = ref([]);
const showings = ref([]);
const featInd = ref(3);

onMounted(async () => {
    try {
        const response = await axios.get(APIURLService.getAPIUrl()+'/api/Movie/GetAllMovies'); 
        movies.value = response.data;
        for (let movie of movies.value) {
            const showingsResponse = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingsByMovieId', {
                params: {
                    movieId: movie.id
                }
            });
            showings.value.push(showingsResponse.data);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
});


</script>


<template>
    <h1>Aktuelles Programm</h1>
    <!-- <FeaturedMovie v-if="movies.length" :movie="movies[featInd]">
        <template #poster>
            <img :src="movies[featInd].posterUrl" :alt="movies[featInd].name + ' Poster'">
        </template>
        <template #title>
            <h2>
                <a :href="movies[featInd].link">{{ movies[featInd].name }}</a>
            </h2>
        </template>
        <template #genre>
            <p>{{ movies[featInd].genre }}</p>
        </template>
        <template #duration>
            <p>{{ movies[featInd].duration }} Minutes</p>
        </template>
        <template #description>
            <p>{{ movies[featInd].description }}</p>
        </template>
        <template #action>
            <a :href="'#' + movies[featInd].name" class="buy-ticket" style="color: black;">
                Tickets kaufen
            </a>
        </template>

    </FeaturedMovie> -->

    <div class="movie-list">
        <ListedMovie v-for="movie in movies" :key="movie.id" :movie="movie" :id="movie.name">
            <template #poster>
                <img :src="movie.posterUrl" :alt="movie.name + ' Poster'" class="movie-poster">
            </template>
            <template #title>
                <h3>
                    <a :href="movie.link">{{ movie.name }}</a>
                </h3>
            </template>
            <template #genre>
                <p>{{ movie.genre }}</p>
            </template>
            <template #fsk>
                <p>FSK: {{ movie.fsk }}</p>
            </template>
            <template #duration>
                <p>{{ movie.duration }} Minutes</p>
            </template>
            <template #description>
                <p>{{ movie.description }}</p>
            </template>
            <template #showtimes class="test">
                <p>Vorstellungen:</p>
                <ShowingsList>
                    <template #showings>
                        <div  v-for="(shows,idx) in showings[movie.id-1]" :key="shows.id" class="showing-item" v-on:click="onBuy(movie, shows)">
                            <p class="showing-date">{{ formatDate(shows.date) }}</p>
                            <p>{{ getTime(shows.date) }}</p>
                            <span class="three-d-badge" v-if="shows.is3D">3D</span>
                            <!-- <div v-if="(idx-2) % 3 === 0" style="flex-basis: 200%; width: 200%; height: 0;">test</div> -->
                        </div>

                    </template>
                </ShowingsList>
            </template>
        </ListedMovie>
    </div>
</template>

<style scoped>
.movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}
h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}
img {
width: 100%;
height: auto;
border-radius: 5px;
}

.buy-ticket:hover {
background-color: #ffaa00;
}


.btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.btn-primary {
    background: #ff6b6b;
    color: white;
}

.btn-secondary {
    background: #e0e0e0;
    color: #333;
}


.showings-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.showing-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.showing-item {
  background: #f8f8f8;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
}

.showing-item:hover {
  background: #e9e9e9;
}

.showing-date {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.three-d-badge {
  background: #ff6b6b;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
  
  </style>

<script>
export default {
  name: 'MovieList',
  components: {
    ListedMovie,
    FeaturedMovie,
    ShowingsList
  },
    data() {
        return {
        movies: [],
        showings: [],
        movie: null,
        show: null
        }
    },
  methods: {
    onBuy(movie, showing) {
        // const data = movie.movie;c14
        this.$store.commit('setFilmdata', movie)
        this.$store.commit('setShowingdata', showing)
        this.$router.push({name: "buy"});
    },
    formatDate(dateString) {
        return TimeConverterService.formatDate(dateString);
    },
    async getShowings(movieId) {
        var res = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingsByMovieId', {
            params: {
                movieId: movieId
            }
        });
        return res.data;
    },
    getDate(date) {
        return TimeConverterService.convertDate(date);
    },
    getTime(time) {
        return TimeConverterService.convertTime(time);
    }

}
}

</script>
