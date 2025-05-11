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
        // console.log(movies);
        for (let movie of movies.value) {
            const showingsResponse = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingsByMovieId', {
                params: {
                    movieId: movie.id
                }
            });
            console.log(showingsResponse.data);
            showings.value.push(showingsResponse.data);
        }
        console.log(showings);
        // for (const showing of showings.value) {
        //     console.log(showing[0].date); // Replace 'time' with the desired attribute
        // }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
});


</script>


<template>
    <FeaturedMovie v-if="movies.length" :movie="movies[featInd]">
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
            <!-- <button type="button" class="buy-ticket" value="Buy Ticket" aria-describedby="basic-addon1" role="link"> -->
            <a :href="'#' + movies[featInd].name" class="buy-ticket" style="color: black;">
                Tickets kaufen
            </a>
            <!-- v-on:click="onBuy(movies[0])" role="link"> -->
        </template>

    </FeaturedMovie>

    <ListedMovie v-for="movie in movies" :key="movie.id" :movie="movie" :id="movie.name">
        <template #poster>
            <img :src="movie.posterUrl" :alt="movie.name + ' Poster'">
        </template>
        <template #title>
            <h3>
                <a :href="movie.link">{{ movie.name }}</a>
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
        <template #showtimes v-for="(showingGroup, index) in showings" :key="index" class="test">
            <p>Vorstellungen:</p>
            <ShowingsList>
                <template #showings>
                    <div v-for="n in 3" :key="n" class="showings-list__items">
                        <p class="showing-item__date centered">{{ getDate(showingGroup[3*(n-1)].date) }}</p>
                        <div v-for="m in 3" :key="m" :class="{ 'borderCustom': m < 3 }" class="showing-item" v-on:click="onBuy(movie, showingGroup[3*(n-1)+m-1])">
                            <!-- {{ console.log(showingGroup[3*(n-1)+m-1].date) }} -->
                            <p class="centered">{{ getTime(showingGroup[3*(n-1)+m-1].date) }}</p>
                            <p v-if="showingGroup[3*(n-1)+m-1].is3D" class="centered">3D</p>
                        </div>
                    </div>
                </template>
            </ShowingsList>
        </template>
        <!-- <template #action>
            <input type="button" class="buy-ticket" value="Tickets kaufen" aria-describedby="basic-addon1" v-on:click="onBuy({movie})" role="link">
        </template> -->
    </ListedMovie>
</template>

<style scoped>
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    }
.buy-ticket {
margin-top: 10px;
padding: 8px 12px;
background-color: #ce0000;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
}


.showings-list__header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .showings-list__items {
        display: flex;
        flex-direction: column;
        margin-right: 40px;
        width: 120px;
    }
    .showing-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        height: 100px;
    }
    .centered {
        text-align: center;
    }
    .borderCustom {
        border-bottom: 1px solid #ccc;
    }
    .showing-item__date {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
    }
    .showing-item__time {
        font-size: 18px;
        color: #495057;
    }
    .showing-item__price {
        font-size: 18px;
        color: #495057;
    }
    .showing-item:hover {
        background-color: #7f8081;
        cursor: pointer;
    }
    .showing-item__price:hover {
        color: #007bff;
    }
    .showing-item__time:hover {
        color: #007bff;
    }


  .buy-ticket {
    margin-top: 15px;
    padding: 12px 18px;
    background-color: #ffcc00;
    color: #000;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.3s ease;
    text-align: center;
  }
  
  .buy-ticket:hover {
    background-color: #ffaa00;
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
        showings: []
        }
    },
  methods: {
    onBuy(movie, showing) {
        console.log('Buying ticket for:', movie);
        // const data = movie.movie;c14
        this.$store.commit('setFilmdata', movie)
        this.$store.commit('setShowingdata', showing)
        console.log(this.$store.getters.getFilmdata);
        console.log(this.$store.getters.getShowingdata);
        this.$router.push({name: "buy"});
    },
    async getShowings(movieId) {
        var res = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingsByMovieId', {
            params: {
                movieId: movieId
            }
        });
        console.log(res.data);
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
