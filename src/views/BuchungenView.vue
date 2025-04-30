<template>
  <div class="background">
  <div class="mb-3 flex">
    <div class="h2 leftBound">Buchungen</div>
    <span class="h2 rightBound" id="buchungCollapseButton" type="button" data-bs-toggle="collapse" data-bs-target="#buchungen" aria-expanded="false" aria-controls="collapseExample" v-on:click.prevent="changeSign($event)">-</span>
  </div>
  <div class="itemList collapse show" id="buchungen">
    <div class="accordion mb-5" id="accordionPanelsStayOpenExample">
      <div class="accordion-item" v-for="Buchung in zukuenftigeBuchungen" :key="Buchung.m_BuchungsId">
        <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Buchung.m_BuchungsId">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+Buchung.m_BuchungsId" aria-expanded="false" :aria-controls="'panelsStayOpen-collapse'+Buchung.m_BuchungsId">
            <!-- Buchung vom {{converter(Buchung.m_Startdatum)}} bis zum {{ converter(Buchung.m_Enddatum) }} -->
            Buchung vom test zum test
          </button>
        </h2>
        <div :id="'panelsStayOpen-collapse'+Buchung.m_BuchungsId" class="accordion-collapse collapse" :aria-labelledby="'panelsStayOpen-heading'+Buchung.m_BuchungsId">
          <div class="accordion-body">

            
            <div class="mb-3 title">
              <p class="h3 mb-5">Übersicht</p>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="liegeplatz" class="form-label">Liegeplatz</label>
                <input type="text" class="form-control" id="l_name" disabled :value="Buchung.m_Liegeplatz.m_Bezeichnung">
              </div>
              <div class="mb-3 col">
                <label for="boot" class="form-label">Boot</label>
                <input type="text" class="form-control" id="b_name" disabled :value="Buchung.m_Boot.m_Name">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="ende" class="form-label">Startdatum</label>
                <input type="text" class="form-control" id="start" disabled :value="converter(Buchung.m_Startdatum)">
              </div>      
              <div class="mb-3 col">
                <label for="start" class="form-label">Enddatum</label>
                <input type="text" class="form-control" id="ende" disabled :value="converter(Buchung.m_Enddatum)">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <label for="nebenkosten" class="form-label">Nebenkosten</label>
              <div class="form-check col">
                <input class="form-check-input nkt" type="checkbox" :checked="Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Strom'" id="strom" disabled>
                <label class="form-check-label" for="strom">
                  Strom
                </label>
              </div>
              <div class="form-check col">
                <input class="form-check-input nkt" type="checkbox" :checked="Buchung.m_Nebenkosten[1] != null && Buchung.m_Nebenkosten[1].m_Name == 'Wasser' || Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Wasser'" id="wasser" disabled>
                <label class="form-check-label" for="wasser">
                  Wasser
                </label>
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="tagespreis" class="form-label">Tagespreis</label>
                <input type="text" class="form-control" id="tagespreis" disabled :value="Buchung.m_Tagespreis">
              </div>
              <div class="mb-3 col">
                <label for="tagespreis" class="form-label">Gesamtpreis</label>
                <input type="text" class="form-control" id="gesamtpreis" disabled :value="getFullPrice(Buchung)">
              </div>
            </div>
            <button type="submit" class="input-group-text cancelButton" v-on:click.prevent="onBuchungStornieren({Buchung})">Stornieren</button>


          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3 flex">
    <div class="h2 leftBound">Vergangene Buchungen</div>
    <span class="h2 rightBound" type="button" data-bs-toggle="collapse" data-bs-target="#alteBuchungen" aria-expanded="false" aria-controls="collapseExample" v-on:click.prevent="changeSign($event)">+</span>
  </div>
  <div class="itemList collapse" id="alteBuchungen">
    <div class="accordion mb-5" id="accordionPanelsStayOpenExample">
      <div class="accordion-item" v-for="Buchung in alteBuchungen" :key="Buchung.m_BuchungsId">
        <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Buchung.m_BuchungsId">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+Buchung.m_BuchungsId" aria-expanded="false" :aria-controls="'panelsStayOpen-collapse'+Buchung.m_BuchungsId">
            Buchung vom {{converter(Buchung.m_Startdatum)}} bis zum {{ converter(Buchung.m_Enddatum) }}
          </button>
        </h2>
        <div :id="'panelsStayOpen-collapse'+Buchung.m_BuchungsId" class="accordion-collapse collapse" :aria-labelledby="'panelsStayOpen-heading'+Buchung.m_BuchungsId">
          <div class="accordion-body">
            
            <div class="mb-3 title">
              <p class="h3 mb-5">Übersicht</p>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="liegeplatz" class="form-label">Liegeplatz</label>
                <input type="text" class="form-control" id="l_name" disabled :value="Buchung.m_Liegeplatz.m_Bezeichnung">
              </div>
              <div class="mb-3 col">
                <label for="boot" class="form-label">Boot</label>
                <input type="text" class="form-control" id="b_name" disabled :value="Buchung.m_Boot.m_Name">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="ende" class="form-label">Startdatum</label>
                <input type="text" class="form-control" id="start" disabled :value="converter(Buchung.m_Startdatum)">
              </div>      
              <div class="mb-3 col">
                <label for="start" class="form-label">Enddatum</label>
                <input type="text" class="form-control" id="ende" disabled :value="converter(Buchung.m_Enddatum)">
              </div>
            </div>
            
            <div class="row mt-4 mb-4">
              <label for="nebenkosten" class="form-label">Nebenkosten</label>
              <div class="form-check col">
                <input class="form-check-input nkt" type="checkbox" :checked="Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Strom'" id="strom" disabled>
                <label class="form-check-label" for="strom">
                  Strom
                </label>
              </div>
              <div class="form-check col">
                <input class="form-check-input nkt" type="checkbox" :checked="Buchung.m_Nebenkosten[1] != null && Buchung.m_Nebenkosten[1].m_Name == 'Wasser' || Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Wasser'" id="wasser" disabled>
                <label class="form-check-label" for="wasser">
                  Wasser
                </label>
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="tagespreis" class="form-label">Tagespreis</label>
                <input type="text" class="form-control" id="tagespreis" disabled :value="Buchung.m_Tagespreis">
              </div>
              <div class="mb-3 col">
                <label for="tagespreis" class="form-label">Gesamtpreis</label>
                <input type="text" class="form-control" id="gesamtpreis" disabled :value="getFullPrice(Buchung)">
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3 flex">
    <div class="h2 leftBound">Boote</div>
    <span class="h2 rightBound" type="button" data-bs-toggle="collapse" data-bs-target="#boote" aria-expanded="false" aria-controls="collapseExample" v-on:click.prevent="changeSign($event)">+</span>
  </div>
  <div class="itemList collapse" id="boote">
    <div class="accordion mb-5" id="accordionPanelsStayOpenExample">
      <div class="accordion-item" v-for="Boot in Boote" v-bind:key="Boot.m_RegistrierungsId" v-bind:value="Boot.m_RegistrierungsId">
        <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Boot.m_RegistrierungsId">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+Boot.m_RegistrierungsId" aria-expanded="false" :aria-controls="'panelsStayOpen-collapse'+Boot.m_RegistrierungsId">
            {{Boot.m_Name}}
          </button>
        </h2>
        <div :id="'panelsStayOpen-collapse'+Boot.m_RegistrierungsId" class="accordion-collapse collapse" :aria-labelledby="'panelsStayOpen-heading'+Boot.m_RegistrierungsId">
          <div class="accordion-body">


            
            <div class="mb-3 title">
              <p class="h3 mb-5">Boot {{ Boot.m_Name }}</p>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="b_name" class="form-label">Bootsname</label>
                <input type="text" class="form-control" id="b_name" disabled :value="Boot.m_Name">
              </div>
              <div class="mb-3 col">
                <label for="laenge" class="form-label">Länge</label>
                <input type="text" class="form-control" id="laenge" disabled :value="Boot.m_Laenge">
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="mb-3 col">
                <label for="breite" class="form-label">Breite</label>
                <input type="text" class="form-control" id="breite" disabled :value="Boot.m_Breite">
              </div>      
              <div class="mb-3 col">
                <label for="tiefgang" class="form-label">Tiefgang</label>
                <input type="text" class="form-control" id="tiefgang" disabled :value="Boot.m_Tiefgang">
              </div>
            </div>



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
      if(kunden_id == null){
        this.$router.push({name: "login"});
      }
      this.zukuenftigeBuchungen = await (await axios.get(APIURLService.getAPIUrl()+'/api/Kunden/GetZukuenftigeBuchungenFromKunde?kundenId=' + this.$store.getters.getKundenId)).data;

      
    },
    data() {
    return{
        zukuenftigeBuchungen: null,
        alteBuchungen: null,
        Boote: null,
        test: true
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
      async onBuchungStornieren(Buchung){

        this.zukuenftigeBuchungen = await (await axios.post(APIURLService.getAPIUrl()+'/api/Buchung/StorniereBuchung?BuchungsId=' + Buchung.Buchung.m_BuchungsId));

        this.zukuenftigeBuchungen = await (await axios.get(APIURLService.getAPIUrl()+'/api/Kunden/GetZukuenftigeBuchungenFromKunde?kundenId=' + this.$store.getters.getKundenId)).data;
      },
      converter(date) {
        return TimeConverterService.convertDate(new Date(date));
      },

      getFullPrice(Buchung) {
        var day1 = new Date(Buchung.m_Startdatum);
        var day2 = new Date(Buchung.m_Enddatum);
        var dif = Math.abs(day2 - day1);
        var days = dif/(1000*3600*24)

        if(days == 0)
          days = 1;
        
        var Gesamtpreis = Buchung.m_Tagespreis * days;

        if(Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Strom'){
          Gesamtpreis = Gesamtpreis + Buchung.m_Nebenkosten[0].m_Preis;
        }
      
        if(Buchung.m_Nebenkosten[0] != null && Buchung.m_Nebenkosten[0].m_Name == 'Wasser'){
          Gesamtpreis = Gesamtpreis + Buchung.m_Nebenkosten[0].m_Preis;
        }

        if(Buchung.m_Nebenkosten[1] != null && Buchung.m_Nebenkosten[1].m_Name == 'Wasser'){
          Gesamtpreis = Gesamtpreis + Buchung.m_Nebenkosten[1].m_Preis;
        }

        return Gesamtpreis;
      }   
  }
}
  
  </script>
  
  <style scoped>
  button{
    margin: 0;
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