<template>
    <div class="payment-container">
        <h1>Zahlungsseite</h1>
        <div class="order-summary">
            <h2>Buchungsübersicht</h2>
            <div class="movie-container" v-if="movie">
                <div class="poster">
                    <img :src="movie.posterUrl" :alt="movie.name + ' Poster'">
                </div>
                <div class="meta-container">
                    <p><strong>Film:</strong> <span id="movie-title">{{ movie.name }}</span></p>
                    <p><strong>Genre:</strong> <span id="movie-genre">{{ movie.genre }}</span></p>
                    <p><strong>Regisseur:</strong> <span id="movie-director">{{ movie.director }}</span></p>
                    <p><strong>Dauer:</strong> <span id="movie-duration">{{ movie.duration }} Minuten</span></p>
                    <p><strong>FSK:</strong> <span id="movie-fsk">{{ movie.fsk }}</span></p>
                </div>
            </div>
            <p><strong>Datum:</strong> <span id="movie-date">{{ getDate(date) }}</span></p>
            <p><strong>Uhrzeit:</strong> <span id="movie-time">{{ time }}</span></p>
            <p><strong>Ausgewählte Plätze:</strong> <span id="selected-seats">{{ seats }}</span></p>
            <p><strong>Anzahl der Plätze:</strong> <span id="seat-count">{{ seatCount }}</span></p>
            <p><strong>3D:</strong> <span id="is-3d">{{ is3D ? "Ja" : "Nein" }}</span></p>
            <p><strong>Gesamtpreis:</strong> <span id="total-price">{{ price }}</span></p>
        </div>

        <div class="payment-methods">
            <h2>Zahlungsmethoden</h2>
            <form id="payment-form" @submit.prevent="onBuy">
                <label>
                    <input type="radio" name="payment-method" value="credit-card" checked>
                    Kreditkarte
                </label>
                <label>
                    <input type="radio" name="payment-method" value="paypal">
                    PayPal
                </label>
                <label>
                    <input type="radio" name="payment-method" value="sofort">
                    Sofortüberweisung
                </label>

                <div id="payment-details" class="hidden">
                    <h3>Zahlungsdetails</h3>
                    <label for="card-number">Kartennummer:</label>
                    <input type="text" id="card-number" name="card-number" required>
                    <label for="expiry-date">Ablaufdatum:</label>
                    <input type="text" id="expiry-date" name="expiry-date" required>
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" required>
                </div>

                <h2>Rechnungsinformationen</h2>
                <label for="billing-name">Name:</label>
                <input type="text" id="billing-name" name="billing-name" required>
                <label for="billing-address">Adresse:</label>
                <input type="text" id="billing-address" name="billing-address" required>
                <label for="billing-email">E-Mail:</label>
                <input type="email" id="billing-email" name="billing-email" required>

                <div class="actions">
                    <button type="button" id="cancel-button">Abbrechen</button>
                    <button type="submit" id="confirm-button">Bestätigen</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import APIURLService from '@/services/API.service';
import TimeConverterService from '@/services/TimeConverter.service';

export default {
    name: 'PaymentView',
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
            booking: null
        };
    },
    methods:{
        getDate(dateString) {
            return TimeConverterService.convertDate(dateString);
        },
        async onBuy() {
            try {
                if(this.$store.getters.getKundenId){
                    // Extract numeric value from calculatedPrice by removing currency symbol and converting to float
                    
                    var res = await axios.post(
                        APIURLService.getAPIUrl() + '/api/Booking/MakeBooking?userId=' + kundenId + '&showingId=' + this.showingId + '&price=' + numericPrice + test.map(id => '&seatIds=' + id).join('')
                    );

                }
                else{
                    var res = await axios.post(
                        APIURLService.getAPIUrl() + '/api/Booking/MakeGuestBooking?GuestFirstName=' + firstname + '&GuestLastName=' + surname + '&GuestEmail=' + email + '&showingId=' + this.showingId + '&price=' + numericPrice + test.map(id => '&seatIds=' + id).join('')
                    );
                }

                if (res.data != -1) {
                    this.$router.push({
                        // name: kundenId != null ? 'bookings' : 'home'
                        name: 'overview'
                    });
                    // alert("Buchung erfolgreich! Sie werden zur Buchungsübersicht weitergeleitet.");
                } else {
                    alert("Oh oh, es kracht!");
                }
            } catch (error) {
                console.error('API call failed:', error);
                alert("Es gab ein Problem mit der Buchung. Bitte versuchen Sie es später erneut.");
            }
        },
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

// Methods
const handlePaymentSubmit = () => {
    // Handle payment submission
};
</script>

<style scoped>
.movie-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
}
.meta-container {
    display: flex;
    flex-direction: column;
}
.poster {
    width: 20%;
    background-color: #ddd;
    border-radius: 4px;
    overflow: hidden;
}
.poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.payment-container {
    min-width: 800px;
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
    color: #444;
}
h2, h3 {
    margin-top: 20px;
}

.order-summary, .payment-methods {
    margin-bottom: 20px;
}

.movie-poster {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    margin-bottom: 10px;
}

label {
    display: block;
    margin: 10px 0;
}

input[type="text"], input[type="email"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#cancel-button {
    background-color: #ccc;
    color: #333;
}

#confirm-button {
    background-color: #28a745;
    color: #fff;
}

</style>