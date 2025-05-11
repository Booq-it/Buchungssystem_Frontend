<script setup>
    const seats = new Map([
        [55, {isUnavailable: true}],
        [56, {isUnavailable: true}],
        [65, {isUnavailable: true}],
        [66, {isUnavailable: true}],
        [67, {isUnavailable: true}],
        [68, {isUnavailable: true}],
        [69, {isUnavailable: true}],
        [70, {isUnavailable: true}],
        [71, {isUnavailable: true}],
        [72, {isUnavailable: true}],
        [73, {isUnavailable: true}],
        [74, {isUnavailable: true}],
        [75, {isUnavailable: true}],
        [1, {isUnavailable: true}],
    ]);
    const seatId = 0
    const totalSideSeats = 30
    const totalCenterSeats = 100
</script>

<template>
	<div id="app">
		<div class="seat-map-container">
			<div class="seat-map">
				<ul class="seat-map-info">
					
					<li class="seat-map-info-item">
						<div class="seat"></div>
						Empty
					</li>
					<li class="seat-map-info-item">
						<div class="seat seat-disabled"></div>
						Sold
					</li>
					<li class="seat-map-info-item">
						<div class="seat seat-active"></div>
						Selected
					</li>
				</ul>
				<div class="seat-map-screen">Screen</div>
				<form id="seat-form" class="seats" @submit.prevent="onBuchen">
					<div class="seats-side">
						<label v-for="seat in totalSideSeats" :key="seat" class="seat">
							<input
								name="seat"
								type="checkbox"
								:value="`${seatId}`"
								:disabled="(seats.get(seatId++))?.isUnavailable"
								class="visually-hidden" 
							/>
						</label>
					</div>
                    <div class="seats-center">
						<label v-for="seat in totalCenterSeats" :key="seat" class="seat">
							<input
								name="seat"
								type="checkbox"
								:value="seatId"
								:disabled="(seats.get(seatId++))?.isUnavailable"
								class="visually-hidden"
							/>
						</label>
					</div>
					<div class="seats-side">
						<label v-for="seat in totalSideSeats" :key="seat" class="seat">
							<input
								name="seat"
								type="checkbox"
								:value="seatId"
								:disabled="(seats.get(seatId++))?.isUnavailable"
								class="visually-hidden"
							/>
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
    visible: false,
    showingId: null,
    date: null,
    time: null,
};
},
methods:{
async onBuchen(){

    const kunden_id = this.$store.getters.getKundenId;

    const checkboxes = document.querySelectorAll('#seat-form input[type="checkbox"]:checked');
    this.selected = Array.from(checkboxes).map(cb => Number(cb.value));
    let test = [];
    for (let i = 0; i < this.selected.length; i++) {
        test.push(this.selected[i]);
    }

    console.log(test);
    
    if (this.selected.length == 0){
        alert("Bitte wählen Sie einen Platz aus");
        return;
    }

    try {
        var res = await axios.post(APIURLService.getAPIUrl()+'/api/Booking/MakeBooking', {
            userId: kunden_id,
            showingId: this.showingId,
            seatId: this.selected
        });
        console.log(res.data);

        if (res.data != -1) {
            //buchung Erfolg
            this.$router.push('/buchungen')
        } else {
            //buchung klappte nichtz
            alert("Oh oh, es kracht!");
        }
    } catch (error) {
        console.error('API call failed:', error);
        alert("Es gab ein Problem mit der Buchung. Bitte versuchen Sie es später erneut.");
    }

}
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

    var res = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetAllShowings');
    this.showings = res.data;
    console.log(this.showings);


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

