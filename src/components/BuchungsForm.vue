<template>
<div class="border rounded bg-custom container p-5 text-start">
    <form>
    <p class="h2 mb-5">Sitzplatz buchen</p>
    <div class="mb-3">
        <label for="bezeichnung" class="form-label">Filmtitel</label>
        <input type="text" class="form-control" id="bezeichnung" disabled  v-model="name">
    </div>
    <div class="row mt-4 mb-4">
        <div class="col">
        <label for="bezeichnung" class="form-label">Startdatum</label>
        <input type="date" class="form-control" id="startdatum" disabled placeholder="Startdatum" v-model="date">
        </div>
        <div class="col">
        <label for="bezeichnung" class="form-label">Uhrzeit</label>
        <input type="text" class="form-control" id="enddatum" disabled placeholder="Uhrzeit" v-model="time">
        </div>
    </div>
    <div class="mb-3">
        <label for="bezeichnung" class="form-label">Boot</label>
        <div class="input-group">
        <select class="form-select" v-model="selected">
        <option :value="-1" disabled>Bitte Boot wählen oder Anlegen</option>        
        <option v-for="Boot in BooteDesUsers" v-bind:key="Boot.m_RegistrierungsId" v-bind:value="Boot.m_RegistrierungsId">
            {{Boot.m_Name}}
        </option>
        </select>
        <span class="input-group-text" id="basic-addon2" href="#" v-on:click.prevent="toggleComponent()">+</span>
    </div>
    </div>

    <div class="row mt-4 mb-4">
        <label for="nebenkosten" class="form-label">Nebenkosten</label>
        <div class="form-check col">
        <input class="form-check-input nkt" type="checkbox" value="" v-model="StromGebucht" v-on:change="getFullPrice" id="strom">
        <label class="form-check-label" for="strom">
            Strom (Preis: {{ StromPreis }}€)
        </label>
        </div>
        <div class="form-check col">
        <input class="form-check-input nkt" type="checkbox" value="" v-model="WasserGebucht" v-on:change="getFullPrice" id="wasser">
        <label class="form-check-label" for="wasser">
            Wasser (Preis: {{ WasserPreis }}€)
        </label>
        </div>
    </div>
    
    <div class="mb-3">
        <label for="tagespreis" class="form-label">Tagespreis</label>
        <input type="text" class="form-control" id="tagespreis" disabled v-model="price">
    </div>
    <div class="mb-3">
        <label for="tagespreis" class="form-label">Gesamtpreis</label>
        <input type="text" class="form-control" id="gesamtpreis" disabled v-model="Gesamtpreis">
    </div>
    <button type="submit" class="input-group-text" v-on:click.prevent="onBuchen">Platz buchen</button>
    </form>
</div>
<div class="border rounded container p-5 text-start mt-5" v-show="visible">
    <form>
    <p class="h2 mb-5">Boot anlegen</p>
    <div class="mb-3">
        <label for="bezeichnung" class="form-label">Registrierungsnummer</label>
        <input type="text" class="form-control" id="Registrierung" v-model="registrierungsid">
    </div>
    <div class="mb-3">
        <label for="bezeichnung" class="form-label">Bootsname</label>
        <input type="text" class="form-control" id="boot_name" v-model="Boot_name">
    </div>
    <div class="mb-3">
        <label for="bezeichnung" class="form-label">Länge</label>
        <input type="number" class="form-control" id="laenge" v-model="Laenge">
    </div>      
    <div class="mb-3">
        <label for="tagespreis" class="form-label">Breite</label>
        <input type="number" class="form-control" id="breite" v-model="Breite">
    </div>
    <div class="mb-3">
        <label for="tagespreis" class="form-label">Tiefe</label>
        <input type="number" class="form-control" id="tiefe" v-model="Tiefe">
    </div>
    <button type="submit" class="input-group-text" v-on:click.prevent="onBootAnlegen">Boot speichern</button>
    </form>
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
    selected: -1,
    visible: false,
};
},
methods:{
toggleComponent() {
    this.visible = !this.visible;
},
getFullPrice() {
    console.log("test");
    
},
async onBuchen(){

    const kunden_id = this.$store.getters.getKundenId;
    // const startdatum = this.$store.getters.;
    // const liegeplatzid = this.$store.getters.getLiegeplatzId;

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
async onBootAnlegen(){
    await axios.post(APIURLService.getAPIUrl()+'/api/Kunden/CreateBoot',{ name: this.Boot_name,
                                                                                registrierungsid: this.registrierungsid,
                                                                                laenge: this.Laenge,
                                                                                breite: this.Breite,
                                                                                tiefe: this.Tiefe,
                                                                                benutzerId: this.$store.getters.getKundenId
                                                                                });
    this.toggleComponent();
}
},
setup(){

},
async created(){

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
    this.id = showing.id;
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
.container{
background-color: #fff;
}
button{
    position: relative;
    left: 100%;
    transform: translate(-100%, 0);
    margin: 0;
}
span:hover{
    cursor: pointer;
}
.nkt{
margin: 5px;
}
</style>

