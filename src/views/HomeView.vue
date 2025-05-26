<script setup>
import ListedMovie from '../components/ListedMovie.vue';
import MovieList from '../components/MovieList.vue';
import FeaturedMovie from '@/components/FeaturedMovie.vue';
import NavBar from '../components/NavBar.vue';
</script>


<template>
  <main> 
    <div class="container">
      <MovieList/>
    </div>

  </main>
</template>

<style scoped>
.container {
    max-width: 1200px;
    padding: 0 1rem;
}
</style>

<script>
  
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
      async getMovies(){
        axios.get(APIURLService.getAPIUrl()+'/api/Showing').then(
          (response)=>{
            movies = response.data;
            console.log(movies);
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

    }
  }

  // const movies = [
  //     {
  //       id: 1,
  //       title: 'Film 1',
  //       description: 'Beschreibung von Film 1',
  //       poster: 'placeholder',
  //     },
  //     {
  //       id: 2,
  //       title: 'Film 2',
  //       description: 'Beschreibung von Film 2',
  //       poster: 'placeholder',
  //     },
  //     {
  //       id: 3,
  //       title: 'Film 3',
  //       description: 'Beschreibung von Film 3',
  //       poster: 'placeholder',
  //     },
  //   ];
  </script>