<script setup>
    
</script>

<template>
	<div class="cont">
		<div class="titleDiv">
			<h2>Buchung</h2>
		</div>
		<div class="movie-info">
			<div class="movie-poster">
				<img :src="this.posterUrl" :alt="this.title + ' Poster'">
			</div>
			<div class="movie-details">
				<h2 class="movie-title">{{ this.title }}</h2>
				<div class="movie-meta">
					<span>{{this.genre}}</span>
					<span>{{ this.duration }} Minutes</span>
					<span>FSK: {{ this.fsk }}</span>
					<span>Director: {{ this.director }}</span>
				</div>
				<p class="movie-description">
					{{ this.description }}
				</p>
				<div class="movie-showtime">
					<strong>Vorführung:</strong> {{ formatDate(this.date) }} um {{ this.time }} Uhr
				</div>
				<span class="three-d-badge" v-if="this.is3D">3D</span>
			</div>
		</div>
		<div id="app">
			<div class="seat-map-container">
				<div class="seat-map">
					<ul class="seat-map-info">
						
						<li class="seat-map-info-item">
							<div class="seat"></div>
							Frei
						</li>
						<li class="seat-map-info-item">
							<div class="seat seat-disabled"></div>
							Reserviert
						</li>
						<li class="seat-map-info-item">
							<div class="seat seat-active"></div>
							Ausgewählt
						</li>
					</ul>
					<div class="seat-map-screen">Leinwand</div>
					<form id="seat-form" class="seats" @submit.prevent="onBuy">
						<div class="seats-side">
							<label v-for="(seat, idx) in totalSideSeats" :key="idx" class="seat">
								<input
									name="seat"
									type="checkbox"
									:value="seats[idx]?.id"
									:disabled="!seats[idx]?.isAvailable"
									class="visually-hidden"
									v-on:click="calculatePrice"/>
							</label>
						</div>
						<div class="seats-center">
							<label v-for="(seat, idx) in totalCenterSeats" :key="idx" class="seat">
								<input
									name="seat"
									type="checkbox"
									:value="seats[totalSideSeats + idx]?.id"
									:disabled="!seats[totalSideSeats + idx]?.isAvailable"
									class="visually-hidden"
									v-on:click="calculatePrice"/>
							</label>
						</div>
						<div class="seats-side">
							<label v-for="(seat, idx) in totalSideSeats" :key="idx" class="seat">
								<input
									name="seat"
									type="checkbox"
									:value="seats[totalSideSeats + totalCenterSeats + idx]?.id"
									:disabled="!seats[totalSideSeats + totalCenterSeats + idx]?.isAvailable"
									class="visually-hidden"
									v-on:click="calculatePrice"/>
							</label>
						</div>
					</form>
				</div>
			</div>
			<div class="booking-summary" id="bookingSummary">
				<h3>Buchungsübersicht</h3>
				<p>Ausgewählte Sitze: 
					<span id="selectedSeats" v-if="selectedSeats">{{ selectedSeats }}</span>
					<span v-else>Keine</span>
				</p>
				<p>Tickets insgesamt: 
					<span id="ticketCount" v-if="selectedCount">{{ selectedCount }}</span>
					<span v-else>Keine</span>
				</p>
				<!-- <p>Preis pro Ticket: <span id="ticketPrice">{{ this.basePrice.toFixed(2) }} €</span></p> -->
				<p>Gesamtpreis: <span id="totalPrice">{{ calculatedPrice }}€</span></p>
				<label class="reserve-label">
					<input
						class="reserve-checkbox"
						name="reserve"
						type="checkbox"
						:value="Reservieren"
						v-on:click="setReserve"/>
					Reservieren (Zahlung später)
				</label>
				<button id="bookBtn" v-on:click="onBuy">Zur Kasse</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import APIURLService from '../services/API.service';
import TimeConverterService from '../services/TimeConverter.service';


export default {
name: 'BuchungsForm',
components: {},
data() {
return{
    id: null,
    title: null,
    posterUrl: null,
    genre: null,
    director: null,
    duration: null,
    fsk: null,
    description: null,
    showings: null,
    selected: [],
	selectedCount: 0,
	selectedSeats: null,
	selectedSeatObjs: [],
    visible: false,
    showingId: null,
    date: null,
    time: null,
	seats: [],
	is3D: false,
	totalSideSeats: 30,
	totalCenterSeats: 100,
	basePrice: null,
	calculatedPrice: '0,00',
	cinemaId: null,
	payment: true,
};
},
methods:{
async onBuy(){
	const kundenId = this.$store.getters.getKundenId;
	let payment = this.payment;

    const checkboxes = document.querySelectorAll('#seat-form input[type="checkbox"]:checked');
    this.selected = Array.from(checkboxes).map(cb => Number(cb.value));
    let test = Array();
    for (let seat of this.selectedSeatObjs) {
        test.push(seat.id);
    }

    
    if (this.selected.length == 0){
		alert("Bitte wählen Sie einen Platz aus");
        return;
    }

	const numericPrice = parseFloat(this.calculatedPrice.replace(/[^0-9.,]/g, '').replace(',', '.'));
	
	this.$store.commit('setBookingdata', {
		showingId: this.showingId,
		seats: this.selectedSeats,
		seatCount: this.selectedCount,
		seatObjs: this.selectedSeatObjs,
		price: this.calculatedPrice,
		is3D: this.is3D,
		date: this.date,
		time: this.time,
		cinemaId: this.cinemaId
	});

	if(payment){
		this.$router.push('payment');
	}
	else{
		try {
			if(this.$store.getters.getKundenId){
				// Extract numeric value from calculatedPrice by removing currency symbol and converting to float
				
				var res = await axios.post(
					APIURLService.getAPIUrl() + '/api/Booking/MakeBooking?userId=' + kundenId + '&showingId=' + this.showingId + '&price=' + numericPrice + test.map(id => '&seatIds=' + id).join('')
				);

			}
			else{
				var res = await axios.post(
					APIURLService.getAPIUrl() + '/api/Booking/MakeGuestBooking?GuestFirstName=' + firstname + '&GuestLastName=' + surname + '&GuestEmail=' + email + '&showingId=' + this.showingId + '&price=' + this + test.map(id => '&seatIds=' + id).join('')
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
	}

},
setReserve() {
	this.payment = !this.payment;
	// Update button text to reflect payment mode
	if (this.payment) {
		document.getElementById('bookBtn').textContent = 'Zur Kasse';
	} else {
		document.getElementById('bookBtn').textContent = 'Tickets reservieren';
	}
},
formatDate(date) {
	return TimeConverterService.formatDate(new Date(date), true);
},
async calculatePrice() {
	let price = 0;
	const checkboxes = document.querySelectorAll('#seat-form input[type="checkbox"]:checked');
    let keep = Array.from(checkboxes).map(cb => Number(cb.value));
	this.selectedSeatObjs = [];
	this.selectedSeats = '';
	for(let seat of this.seats){
		if(keep.includes(seat.id)){
			this.selectedSeatObjs.push(seat);
		}
	}
	for (let i = 0; i < this.selectedSeatObjs.length; i++) {
		price += (this.basePrice + this.selectedSeatObjs[i].additionalPrice);
		if(i == this.selectedSeatObjs.length - 1){
			this.selectedSeats += (this.selectedSeatObjs[i].seatRow + this.selectedSeatObjs[i].seatNumber);
		}else{
			this.selectedSeats += (this.selectedSeatObjs[i].seatRow + this.selectedSeatObjs[i].seatNumber + ', ');
		}
    }
	this.calculatedPrice = price.toFixed(2).replace(".",","); // Format to 2 decimal places
	this.selectedCount = keep.length;
},
},
setup(){

},
async created(){
    window.scrollTo(0, 0);

	const movie = this.$store.getters.getFilmdata;
	this.id = movie.id;
	this.name = movie.name;
	this.posterUrl = movie.posterUrl;
	this.genre = movie.genre;
	this.director = movie.director;
	this.duration = movie.duration;
	this.fsk = movie.fsk;
	this.description = movie.description;



	const showing = this.$store.getters.getShowingdata;
	this.showingId = showing.id;
	this.date = showing.date;
	this.time = showing.time;
	this.basePrice = showing.basePrice;
	this.is3D = showing.is3D;
	this.cinemaId = showing.cinemaId;



	for (let seat of showing.seats) {
		this.seats.push(seat);
	}


},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.reserve-label {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.reserve-checkbox {
	width: 1.2rem;
}

.cont{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.seat-map-container {
    --color-primary: #000000;
    --color-disabled: #6d6d6d;
    --border-disabled: #6d6d6d;
    background-color: rgb(255, 255, 255);
	padding: 1.5rem 2rem;
    margin: 0 auto;
    width: 70%;
    min-width: 800px;
	border-radius: 8px 8px 0 0;
}

.seat-map-info {
	display: flex;
	justify-content: center;
	gap: 2rem;
}

.seat-map-info-item {
	display: inline-flex;
	gap: 0.5rem;
}

.seat-map {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.seat-map-screen {
	--screen-width: 100%;
	width: var(--screen-width);
	text-align: center;
	padding: 0.5rem;
	border: 2px solid var(--color-primary);
}

.seats {
	--seats-gap: 0.5rem;
	display: flex;
	justify-content: space-between;
}

.seats-center {
	height: 100%;
	display: grid;
	gap: var(--seats-gap);
	grid-template-columns: repeat(10, minmax(0, 1fr));
}

.seats-side {
	height: 100%;
	display: grid;
	gap: var(--seats-gap);
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.seat {
	--seat-background: transparent;
	--seat-border: var(--color-primary);
	--seat-border-width: 2px;
	width: 2rem;
	height: 2rem;
	background-color: var(--seat-background);
	border-width: var(--seat-border-width);
	border-style: solid;
	border-color: var(--seat-border);
	border-radius: calc(infinity * 1px);
}

.seat:has(input[type="checkbox"]) {
	cursor: pointer;
}
	
.seat-active, .seat:has(input[type="checkbox"]:checked) {
	--seat-background: #ff6b6b;
	--seat-border: #ff6b6b;
	/* --seat-background: var(--color-primary);
	--seat-border: var(--color-primary); */
	cursor: auto;
}

.seat-disabled, .seat:has(input[type="checkbox"]:disabled) {
	--seat-background: var(--color-disabled);
	--seat-border: var(--border-disabled);
	cursor: auto;
}

.get-seat-button {
	display: inline-block;
	width: 70%;
	padding: 2rem;
	margin-top: 1rem;

}
	
/* Utility Style */
.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}


.titleDiv {
	text-align: center;
	margin-bottom: 20px;
}

.movie-info {
    width: 70%;
    min-width: 800px;
	display: flex;
	margin-bottom: 30px;
	background-color: #ffffff;
	border-radius: 8px;
	overflow: hidden;
}

.movie-poster {
	flex: 0 0 200px;
	height: 300px;
	background-color: #c0bcbc;
}

.movie-poster img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.movie-details {
	flex: 1;
	padding: 20px;
}

.movie-title {
	font-size: 24px;
	margin-top: 0;
}

.movie-meta {
	display: flex;
	gap: 15px;
	margin-bottom: 15px;
	font-size: 14px;
	color: #737171;
}
.booking-summary {
	background-color: #ffffff;
	padding: 1.5rem 2rem;
	border-radius: 0 0 8px 8px;
    margin: 0 auto;
    width: 70%;
    min-width: 800px;
	margin-bottom: 20px;
}

.booking-form {
	background-color: #ffffff;
	width: 90%;
	padding: 20px;
	border-radius: 8px;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 5px;
}

input, button {
	padding: 10px;
	width: 100%;
	border-radius: 8px;
}

button {
	background-color: #e50914;
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
	border: none;
}

button:hover {
	background-color: #f40612;
}

button:disabled {
	background-color: #777;
	cursor: not-allowed;
}

.hidden {
	display: none;
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

