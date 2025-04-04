<script setup>
import ListedMovie from '../components/ListedMovie.vue';
import NavBar from '../components/NavBar.vue';
import TheWelcome from '../components/NavBar.vue';
</script>


<template>
  <main>
<ListedMovie>
  <template #poster>
    <img src="https://placehold.co/600x400" alt="Movie Poster">
  </template>
  <template #Title>
    <h3>Movie Title</h3>
  </template>
  <template #genre>
    <p>Action</p>
  </template>
  <template #duration>
    <p>120</p>
  </template>
</ListedMovie>
    <p> Hello World </p>

  </main>
</template>
<style scoped>
    .movie-overview {
      text-align: center;
      padding: 20px;
    }

    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }

    .movie-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      width: 200px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .movie-poster {
      width: 100%;
      border-radius: 8px;
    }

    .movie-title {
      font-size: 18px;
      margin: 10px 0;
    }

    .movie-description {
      font-size: 14px;
      color: #666;
    }

    .movie-details-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    .movie-details-button:hover {
      background-color: #0056b3;
    }
    </style>
<script>
import axios from 'axios';
import APIURLService from '@/services/API.service';
  export default {
    name: 'HomeView',
    components: {
      
    },
    methods:{
      created(){
        const name = this.$store.getters.getNameVorname;
        console.log(name)
        console.log("Test");
      },
      async refresh(){
        axios.get(APIURLService.getAPIUrl()+'/api/Showing').then(
          (response)=>{
            console.log(response.data);
          }
        )
      }
      ,
      async onBuchen(){

        const kunden_id = this.$store.getters.getKundenId;
        const datum = this.$store.getters.getDatum;

        var res = await axios.post(APIURLService.getAPIUrl()+'/api/Buchung/CreateBuchung',{ kundenid: kunden_id,
                                                                                        liegeplatzid: liegeplatzid,
                                                                                        registrierungsid: this.selected,
                                                                                        start: startdatum,
                                                                                        end: enddatum,
                                                                                        wasser: this.WasserGebucht,
                                                                                        strom: this.StromGebucht});
        console.log(res.data);
        if(res.data != -1){
          //buchung Erfolg
          this.$router.push('/buchungen')
        }else{
          //buchung klappte nichtz
        }

        },

    }, mounted:function(){
      this.refresh();
    }
  }

  const movies = [
      {
        id: 1,
        title: 'Film 1',
        description: 'Beschreibung von Film 1',
        poster: 'placeholder',
      },
      {
        id: 2,
        title: 'Film 2',
        description: 'Beschreibung von Film 2',
        poster: 'placeholder',
      },
      {
        id: 3,
        title: 'Film 3',
        description: 'Beschreibung von Film 3',
        poster: 'placeholder',
      },
    ];
  </script>