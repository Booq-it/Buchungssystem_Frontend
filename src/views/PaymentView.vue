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
    <div class="payment-container">
        <h1>Zahlung</h1>

        <div class="payment-methods">
            <h2>Zahlungsmethoden</h2>
            <form id="payment-form" @submit.prevent="onBuy">
                <label>
                    <input type="radio" name="payment-method" value="credit-card" checked @change="cred = true; paypal = false; sofort = false">
                    Kreditkarte
                </label>
                <label>
                    <input type="radio" name="payment-method" value="paypal" @change="cred = false; paypal = true; sofort = false">
                    PayPal
                </label>
                <label>
                    <input type="radio" name="payment-method" value="sofort" @change="cred = false; paypal = false; sofort = true">
                    Sofortüberweisung
                </label>

                <div id="payment-details" class="row g-3" v-if="cred">
                    <h3>Zahlungsdetails</h3>
                    <div class="col-md-12">
                        <label for="card-number">Kartennummer:</label>
                        <input class="form-control" type="text" id="card-number" name="card-number" required max="20" maxlength="20"
                            oninput="
                                let v = this.value.replace(/[^0-9]/g, ''); 
                                if (v.length > 16) v = v.substring(0, 16);
                                let parts = [];
                                for (let i = 0; i < v.length; i += 4) {
                                    parts.push(v.substring(i, i + 4));
                                }
                                this.value = parts.join(' ');
                            ">
                    </div>
                    <div class="col-md-6">
                        <label for="expiry-date">Ablaufdatum:</label>
                        <input class="form-control" type="text" id="expiry-date" name="datum" placeholder="MM/JJ" required maxlength="5" pattern="[0-9]{2}/[0-9]{2}"
                        oninput="let v = this.value.replace(/\D/g, ''); if (v.length > 2) { this.value = v.slice(0, 2) + '/' + v.slice(2, 4); } else { this.value = v; }">
                    </div>
                    <div class="col-md-6">
                        <label for="cvv">CVV:</label>
                        <input class="form-control" type="text" id="cvv" name="cvv" required maxlength="3" pattern="[0-9]{3}"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                    </div>
                </div>

                <h2>Rechnungsinformationen</h2>
                <div class="row g-3 needs-validation" novalidate>
                    <div class="col-md-3">
                        <label for="vorname" class="form-label">Vorname</label>
                        <input type="text" class="form-control" id="vorname" :value="this.$store.getters.getVorname" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" :value="this.$store.getters.getName" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="col-md">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" :value="this.$store.getters.getEmail" required>
                        <div class="invalid-feedback">
                            Please enter a valid email.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="stadt" class="form-label">Stadt</label>
                        <input type="text" class="form-control" id="stadt" required>
                        <div class="invalid-feedback">
                        Please provide a valid city.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="bundesland" class="form-label">Bundesland</label>
                        <select class="form-select" id="bundesland" required>
                        <option selected disabled value="">Choose...</option>
                        <option>Baden-Württemberg</option>
                        <option>Anderes Bundesland (Abschaum)</option>
                        </select>
                        <div class="invalid-feedback">
                        Please select a valid state.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="strasse" class="form-label">Straße</label>
                        <input type="text" class="form-control" id="strasse" required>
                        <div class="invalid-feedback">
                        Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="hausnummer" class="form-label">Hausnummer</label>
                        <input type="text" class="form-control" id="hausnummer" required maxlength="10">
                        <div class="invalid-feedback">
                        Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="plz" class="form-label">PLZ</label>
                        <input type="text" class="form-control" id="plz" required pattern="[0-9]{5}" maxlength="5"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                        <div class="invalid-feedback">
                        Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                        <label class="form-check-label" for="invalidCheck">
                            Ich habe die AGB gelesen und akzeptiere sie.
                        </label>
                        <div class="invalid-feedback">
                            You must agree before submitting.
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">{{ paypal ? "Zu PayPal" : "Bezahlen" }}</button>
                    </div>
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
            seatObjs: null,
            price: null,
            is3D: null,
            date: null,
            time: null,
            cinemaId: null,
            movie: null,
            booking: null,
            cred: true,
            paypal: false,
            sofort: false,
            seatIds: [],
        };
    },
    methods:{
        getDate(dateString) {
            return TimeConverterService.convertDate(dateString);
        },
        async onBuy() {
            const kundenId = this.$store.getters.getKundenId;
            try {
                if(this.$store.getters.getKundenId){
                    // Extract numeric value from calculatedPrice by removing currency symbol and converting to float
                    
                    var res = await axios.post(
                        APIURLService.getAPIUrl() + '/api/Booking/MakeBooking?userId=' + kundenId + '&showingId=' + this.showingId + '&price=' + this.price + this.seatIds.map(id => '&seatIds=' + id).join('')
                    );

                }
                else{
                    var res = await axios.post(
                        APIURLService.getAPIUrl() + '/api/Booking/MakeGuestBooking?GuestFirstName=' + document.getElementById('vorname').value.trim() + '&GuestLastName=' + document.getElementById('name').value.trim() + '&GuestEmail=' + document.getElementById('email').value.trim() + '&showingId=' + this.showingId + '&price=' + this.price + this.seatIds.map(id => '&seatIds=' + id).join('')
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
            this.seatObjs = bookingData.seatObjs;


            console.log(this.seats)
            

            for(let seat of this.seatObjs){
                this.seatIds.push(seat.id);
            }
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
    width: 60%;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
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

/* input[type="text"], input[type="email"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
} */



.container {
    width: 60%;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px 8px 0 0;
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

input[type="date"] {
    display: flex;

}

</style>