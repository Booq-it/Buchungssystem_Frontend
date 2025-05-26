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
            // console.log(showingsResponse.data);
            showings.value.push(showingsResponse.data);
        }
        // console.log(showings);
        // for (const showing of showings.value) {
        //     console.log(showing[0].date); // Replace 'time' with the desired attribute
        // }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
    // for (let showing of showings.value) {
    //     console.log(showing[0]); 
    // }
    // console.log(showings.value);
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
                        <div  v-for="shows in showings[movie.id-1]" :key="shows.id" class="showing-item" v-on:click="openBookingModal(movie, shows)">
                            <p class="showing-date">{{ formatDate(shows.date) }}</p>
                            <p>{{ getTime(shows.date) }}</p>
                            <!-- {{ console.log(showingGroup[3*(n-1)+m-1].date) }} -->
                            <!-- <p class="centered">{{ getTime(showingGroup[3*(n-1)+m-1].date) }}</p> -->
                            <span class="three-d-badge" v-if="shows.is3D">3D</span>
                        </div>

                    </template>
                </ShowingsList>
            </template>
            <!-- <template #action>
                <input type="button" class="buy-ticket" value="Tickets kaufen" aria-describedby="basic-addon1" v-on:click="onBuy({movie})" role="link">
            </template> -->
        </ListedMovie>
    </div>
    <div class="modal" id="bookingModal">
        <div class="modal-content">
            <h2 class="modal-title" id="modalTitle">Book Tickets</h2>
            <p id="modalDetails"></p>
            <div class="modal-buttons">
                <button class="btn btn-secondary" v-on:click="closeModal()">Cancel</button>
                <button class="btn btn-primary" v-on:click="confirmBooking()">Book Now</button>
            </div>
        </div>
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
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-title {
    margin-bottom: 1rem;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
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
    test(showingGroup) {
        console.log(showingGroup);  
    },
    formatDate(dateString) {
        const options = { weekday: 'short', day: 'numeric', month: 'short'};
        return new Date(dateString).toLocaleDateString('de-DE', options);
    },
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
    },
    openBookingModal(movie, showing) {
        document.getElementById('modalTitle').innerText = `Tickets Buchen - ${movie.name}`;
        document.getElementById('modalDetails').innerText = `Vorführung: ${this.formatDate(showing.date)} um ${this.getTime(showing.date)} ${showing.is3D ? '(3D)' : ''}`;
        document.getElementById('bookingModal').style.display = 'flex';
        this.movie = movie;
        this.showing = showing;
    },

    closeModal() {
        document.getElementById('bookingModal').style.display = 'none';
    },

    confirmBooking() {
        this.closeModal();
        console.log('Buying ticket for:', this.movie);
        console.log('Showing:', this.showing);
        // const data = movie.movie;c14
        this.$store.commit('setFilmdata', this.movie)
        this.$store.commit('setShowingdata', this.showing)
        console.log(this.$store.getters.getFilmdata);
        console.log(this.$store.getters.getShowingdata);
        this.$router.push({name: "buy"});
    },

    // Close modal when clicking outside
}
}
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
}
</script>
