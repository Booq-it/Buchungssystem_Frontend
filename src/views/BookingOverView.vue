<template>
    <div class="container">
        <div class="header">
            <h1>Bestellübersicht</h1>
        </div>
        
        <div class="movie-info" v-if="movie">
            <div class="poster">
                <img :src="movie.posterUrl" :alt="movie.name + ' Poster'">
            </div>
            <div class="movie-details">
                <div class="movie-title" id="movieTitle"></div>
                <div class="meta-info">
                    <div class="meta-item">
                        <label>Genre:</label>
                        <span id="genre">{{ movie.genre }}</span>
                    </div>
                    <div class="meta-item">
                        <label>Director:</label>
                        <span id="director">{{ movie.director }}</span>
                    </div>
                    <div class="meta-item">
                        <label>Duration:</label>
                        <span id="duration">{{ movie.duration }}</span>
                    </div>
                    <div class="meta-item">
                        <label>FSK:</label>
                        <span id="fsk">{{ movie.fsk }}</span>
                    </div>
                </div>
                <div id="description">{{ movie.description }}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Vorführung</div>
            <div class="meta-info">
                <div class="meta-item">
                    <label>Datum:</label>
                    <span id="date">{{ getDate(this.date) }}</span>
                </div>
                <div class="meta-item">
                    <label>Uhrzeit:</label>
                    <span id="time">{{ this.time }}</span>
                </div>
                <div class="meta-item">
                    <label>Format:</label>
                    <span id="format">{{ this.is3D ? '3D' : '2D' }}</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Ausgewählte Sitze</div>
            <div class="meta-item">
                <label>Anzahl der Sitze:</label>
                <span id="seatCount">{{ this.seatCount }}</span>
            </div>
            <div class="seats-container" id="seatsList">
                <div class="seat" v-for="seat in this.seats.split(',')">{{ seat }}</div>
            </div>
        </div>
        
        <div class="pricing">
            <div>Gesamtpreis:</div>
            <div class="total" id="price">{{ this.price.replace(".",",") }} €</div>
        </div>
    </div>
</template>
  
<script>
// @ is an alias to /src
import TimeConverterService from '@/services/TimeConverter.service';
import BuchungsForm from '@/components/BuchungsForm.vue'

export default {
    name: 'BookingOverView',
components: {},
data() {
return{
    showingId: null,
    seats: null,
    seatCount: null,
    price: null,
    is3D: null,
    date: null,
    time: null,
    cinemaId: null,
    movie: null,
};
},
methods:{
    getDate(dateString) {
        return TimeConverterService.convertDate(dateString);
    }
},
    async created() {
        window.scrollTo(0, 0);
        const bookingData = this.$store.getters.getBookingdata;
        this.movie = this.$store.getters.getFilmdata;
        if (!bookingData) {
            this.$router.push({ name: 'Home' });
            return;
        }
        
        this.showingId = bookingData.showingId;
        this.seats = bookingData.seats;
        this.seatCount = bookingData.seatCount;
        this.price = bookingData.price;
        this.is3D = bookingData.is3D;
        this.date = bookingData.date;
        this.time = bookingData.time;
        this.cinemaId = bookingData.cinemaId;

        console.log(this.seats)
        
    }
}
</script>
  
<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}
.header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}
.movie-info {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
.poster {
    width: 150px;
    height: 225px;
    background-color: #ddd;
    border-radius: 4px;
    overflow: hidden;
}
.poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.movie-details {
    flex: 1;
}
.movie-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}
.meta-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;
    margin-bottom: 15px;
}
.meta-item label {
    font-weight: bold;
    color: #555;
    margin-right: 5px;
}
.section {
    margin-bottom: 20px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}
.section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
.seats-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}
.seat {
    background-color: #e1f5fe;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 14px;
}
.pricing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 15px 0;
    border-top: 2px solid #eee;
}
.pricing .total {
    font-weight: bold;
    color: #0d47a1;
}
.no-data {
    color: #999;
    font-style: italic;
}
  </style>