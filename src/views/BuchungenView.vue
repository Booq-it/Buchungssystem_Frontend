<template>
  <div class="background">
  <div class="mb-3 flex">
    <div class="h2 leftBound" style="color: black;">Buchungen</div>
  </div>
  <div class="itemList collapse show" id="bookings">
    <div class="accordion mb-5" id="accordionPanelsStayOpenExample">
      <div class="accordion-item" v-for="index in bookings.length" :key="index" v-if="bookings">
        <h2 class="accordion-header" :id="'panelsStayOpen-heading'+bookings[index-1].id">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+bookings[index-1].id" aria-expanded="false" :aria-controls="'panelsStayOpen-collapse'+bookings[index-1].id" v-if="movies[index-1]">
            {{movies[index-1].name}} am {{ convertDate(showings[index-1].date) }} um {{ convertTime(showings[index-1].date) }} {{bookings[index-1].isCancelled ? '(Storniert)' : ''}}
          </button>
        </h2>
        <div :id="'panelsStayOpen-collapse'+bookings[index-1].id" class="accordion-collapse collapse" :aria-labelledby="'panelsStayOpen-heading'+bookings[index-1].id">
          <div class="accordion-body">

            
            <div class="mb-3 title">
              <p class="h3 mb-5">Übersicht</p>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="movie" class="form-label">Film</label>
                <input type="text" class="form-control" id="l_name" disabled :value="movies[index-1].name" v-if="movies[index-1]">
              </div>
              <div class="mb-3 col">
                <label for="seats" class="form-label">Sitzplätze</label>
                <input type="text" class="form-control" id="b_name" disabled :value="getSeats(bookings[index-1])">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="date" class="form-label">Datum</label>
                <input type="text" class="form-control" id="date" disabled :value="convertDate(showings[index-1].date)" v-if="showings[index-1]">
              </div>      
              <div class="mb-3 col">
                <label for="time" class="form-label">Uhrzeit</label>
                <input type="text" class="form-control" id="time" disabled :value="convertTime(showings[index-1].date)" v-if="showings[index-1]">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="tagespreis" class="form-label">Gesamtpreis</label>
                <input type="text" class="form-control" id="gesamtpreis" disabled :value="getFullPrice(bookings[index-1]) + ' €'">
              </div>
            </div>
            <button type="submit" class="input-group-text cancelButton" v-on:click.prevent="onCancelBooking(bookings[index-1].id)" v-if="!bookings[index-1].isCancelled">Stornieren</button>


          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
  
  <script>
  // @ is an alias to /src
  import axios from 'axios'
  import APIURLService from '../services/API.service';
  import TimeConverterService from '@/services/TimeConverter.service';

  export default {
    name: 'BuchungenView',
    components: {
      
    },
    async created(){
        const kunden_id = this.$store.getters.getKundenId;
        // console.log(kunden_id);
        if(kunden_id == null){
            this.$router.push({name: "login"});
        }
        try {
            this.bookings = await (await axios.get(APIURLService.getAPIUrl()+'/api/Booking/GetBookingsByUserId', {
                params: { 
                userId: kunden_id 
                }
            })).data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
        // console.log(this.bookings);
        let movieId = null;
        let showingId = null;
        for(let booking of this.bookings){
            showingId = booking.showingId;
            console.log("ShowingId: " + showingId);
            // console.log(booking.bookingDate);
            // console.log(booking.id);
            try {
                const response = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingById', {
                    params: { 
                        showingId: showingId 
                    }
                });
                this.showings.push(response.data);
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        for(let showing of this.showings){
            movieId = showing.movieId;
            console.log("MovieId: " + movieId);
            try {
                const movieResponse = await axios.get(APIURLService.getAPIUrl()+'/api/Movie/GetMovieById?id=' + movieId);
                this.movies.push(movieResponse.data);
                console.log("Movie: " + movieResponse.data.name);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
    },
    data() {
    return{
        bookings: null,
        showings: [],
        movies: []
    };
    },
    methods:{ 
        changeSign(el) {
            if (el.target.innerHTML == "+") {
            el.target.innerHTML = "-"
            } else {
            el.target.innerHTML = "+"
            }
        },
        async onCancelBooking(bookingId) {
            if (!confirm("Sind Sie sicher, dass Sie die Buchung stornieren möchten?")) {
                return;
            }

            try {
                // Cancel the booking by sending a request to the API
                await (await axios.patch(APIURLService.getAPIUrl()+'/api/Booking/CancelBooking?bookingId=' + bookingId));
                alert("Buchung erfolgreich storniert.");
            } catch (error) {
                console.error('Error canceling booking:', error);
                alert("Fehler beim Stornieren der Buchung. Bitte versuchen Sie es später erneut.");
            }
        
            try {
                // Refresh the bookings list after cancellation
                this.bookings = await (await axios.get(APIURLService.getAPIUrl()+'/api/Booking/GetBookingsByUserId?userId=' + this.$store.getters.getKundenId)).data;
            } catch (error) {
                console.error('Error refreshing bookings:', error);
            }
        },
        convertDate(date) {
            return TimeConverterService.convertDate(date);
        },
        convertTime(date) {
            return TimeConverterService.convertTime(date);
        },

        getFullPrice(booking) {
            var fullPrice = 0;
            for (let i = 0; i < booking.seats.length; i++) {
                fullPrice += (booking.price + booking.seats[i].additionalPrice);
            }

            return fullPrice.toFixed(2);
        },
        getSeats(booking) {
            var seats = "";
            for (let i = 0; i < booking.seats.length; i++) {
            if (i == booking.seats.length - 1) {
                seats += booking.seats[i].seatRow + booking.seats[i].seatNumber;
            } else {
                seats += booking.seats[i].seatRow + booking.seats[i].seatNumber + ", ";
            }
            }
            return seats;
        }
  }
}
  
  </script>
  
  <style scoped>
  button{
    margin: 0;
  }
  .background{
    width: 80%;
  }
  .flex-accordion{
    display: flex;
    flex-wrap: wrap;
  }
  .title{
    width: 100%;
  }
  .cancelButton{
    position: relative;
    left: 100%;
    transform: translate(-100%, 0%);
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .rightBound{
    position: relative;
    float: right;
  }
  .accordion-body{
    align-items: center;
  }
  .nkt{
    margin: 5px;
  }
  </style>