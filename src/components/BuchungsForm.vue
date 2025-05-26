<script setup>
    // const seats = new Map([
    //     [55, {isAvailable: true}],
    //     [56, {isAvailable: true}],
    //     [65, {isAvailable: true}],
    //     [66, {isAvailable: true}],
    //     [67, {isAvailable: true}],
    //     [68, {isAvailable: true}],
    //     [69, {isAvailable: true}],
    //     [70, {isAvailable: true}],
    //     [71, {isAvailable: true}],
    //     [72, {isAvailable: true}],
    //     [73, {isAvailable: true}],
    //     [74, {isAvailable: true}],
    //     [75, {isAvailable: true}],
    //     [1, {isAvailable: true}],
    // ]);
	// const seatCount = 0;
</script>

<template>
	<div class="movie-info-modern" v-if="id">
		<h2 class="movie-title">{{ name }}</h2>
		<ul class="movie-details">
			<li>
				<span class="detail-label">Dauer: </span>
				<span class="detail-value">{{ duration }} min</span>
			</li>
			<li>
				<span class="detail-label">FSK: </span>
				<span class="detail-value">{{ fsk }}</span>
			</li>
			<li>
				<span class="detail-label">Datum: </span>
				<span class="detail-value">{{ date }}</span>
			</li>
			<li>
				<span class="detail-label">Uhrzeit: </span>
				<span class="detail-value">{{ time }}</span>
			</li>
		</ul>
		<div class="booking-summary" v-if="basePrice !== null">
			<p>
				<strong>Ausgewählte Plätze: </strong>
				<span v-if="selectedCount">{{ selectedCount }}</span><!-- {{ selected.join(', ') }}</span> -->
				<span v-else>Keine</span>
			</p>
			<p>
				<strong>Gesamtpreis: </strong>
				<span id="total-price">
					{{ calculatedPrice }}
				</span>
			</p>
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
				<form id="seat-form" class="seats" @submit.prevent="onBuchen">
					<div class="seats-side">
						<label v-for="(seat, idx) in totalSideSeats" :key="idx" class="seat">
							<input
								name="seat"
								type="checkbox"
								:value="idx"
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
								:value="totalSideSeats + idx"
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
								:value="totalSideSeats + totalCenterSeats + idx"
								:disabled="!seats[totalSideSeats + totalCenterSeats + idx]?.isAvailable"
								class="visually-hidden"
								v-on:click="calculatePrice"/>
						</label>
					</div>
				</form>
			</div>
		</div>
		<button class="get-seat-button" form="seat-form">Buchen</button>
	</div>
</template>

<script>
import axios from 'axios'
import APIURLService from '../services/API.service';


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
    visible: false,
    showingId: null,
    date: null,
    time: null,
	seats: [],
	totalSideSeats: 30,
	totalCenterSeats: 100,
	basePrice: null,
	calculatedPrice: '0.00 €',
};
},
methods:{
async onBuchen(){

    const kundenId = this.$store.getters.getKundenId;

    const checkboxes = document.querySelectorAll('#seat-form input[type="checkbox"]:checked');
    this.selected = Array.from(checkboxes).map(cb => Number(cb.value));
    let test = Array();
    for (let i = 0; i < this.selected.length; i++) {
        test.push(this.seats[this.selected[i]].id);
    }

    
    if (this.selected.length == 0){
		alert("Bitte wählen Sie einen Platz aus");
        return;
    }


	// console.log(test);
	// console.log(this.id);
	// console.log(this.selected);
	// console.log(kundenId);
	// console.log(this.showingId);

    try {
		const axiosConfig = {
			params: {
				userId: kundenId,
				showingId: this.showingId,
				seatIds: [...test]
			}
		};
		console.log(axiosConfig);


		// var res = await axios.post(
		// 	APIURLService.getAPIUrl()+'/api/Booking/MakeBooking',axiosConfig
		// );
		var res = await axios.post(
			APIURLService.getAPIUrl() + '/api/Booking/MakeBooking?userId=' + kundenId + '&showingId=' + this.showingId + test.map(id => '&seatIds=' + id).join('')
		);


        console.log(res.data);

        if (res.data != -1) {
            //buchung Erfolg
            // this.$router.push('/buchungen')
            // this.$router.go()
			this.$router.push({
				name: 'bookings',
				params: { bookingId: res.data }
			});
			console.log(this.id)
			alert("Buchung erfolgreich! Sie werden zur Buchungsübersicht weitergeleitet.");
        } else {
            //buchung klappte nichtz
            alert("Oh oh, es kracht!");
        }
    } catch (error) {
        console.error('API call failed:', error);
        alert("Es gab ein Problem mit der Buchung. Bitte versuchen Sie es später erneut.");
    }

},
async calculatePrice() {
	let price = 0;
	const checkboxes = document.querySelectorAll('#seat-form input[type="checkbox"]:checked');
    let keep = Array.from(checkboxes).map(cb => Number(cb.value));
	// console.log(keep);
	// console.log(this.basePrice);
	for (let i = 0; i < keep.length; i++) {
        price += (this.basePrice + this.seats[keep[i]].additionalPrice);
    }
	this.calculatedPrice = price.toFixed(2) + ' €'; // Format to 2 decimal places
	this.selectedCount = keep.length;
	console.log(this.calculatedPrice);
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

	var res = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingById', {
		params: {
			showingId: this.showingId
		}
	});
	// console.log(res.data);
	if (res.data != -1) {
		this.$store.commit('setShowingdata', res.data);
	} else {
		alert("Die Vorstellung existiert nicht oder ist abgelaufen.");
		return;
	}




	for (let seat of showing.seats) {
		this.seats.push(seat);
	}

	// console.log(this.seats);
    // console.log(this.seats[0].id);

},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.seat-map-container {
    --color-primary: #dddddd;
    --color-disabled: #6d6d6d;
    --border-disabled: #6d6d6d;
    background-color: rgb(0, 0, 0);
	padding: 1.5rem 2rem;
    margin: 0 auto;
    width: 60%;
    min-width: 800px;
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
	--seat-background: var(--color-primary);
	--seat-border: var(--color-primary);
	cursor: auto;
}

.seat-disabled, .seat:has(input[type="checkbox"]:disabled) {
	--seat-background: var(--color-disabled);
	--seat-border: var(--border-disabled);
	cursor: auto;
}

.get-seat-button {
	display: inline-block;
	width: 60%;
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
</style>

