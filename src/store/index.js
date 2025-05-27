import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
import TimeConverterService from '@/services/TimeConverter.service';


export default createStore({
    state: {
        Filmdata: {
            id: null,
            name: null,
            posterUrl: null,
            genre: null,
            director: null,
            duration: null,
            fsk: null,
            description: null
        },
        Showingdata: {
            id: null,
            basePrice: null,
            is3D: null,
            date: null,
            time: null,
            cinemaId: null,
            movieId: null,
            seats: null
        },
        Kundendaten:{
            kundenId: null,
            Name: "Name",
            Vorname: "Test",
            Email: null,
            Rolle: null,
        }
    },
    mutations: {
            setFilmdata: (state, filmdata)=>{
                state.Filmdata.id = filmdata.id;
                state.Filmdata.name = filmdata.name;
                state.Filmdata.posterUrl = filmdata.posterUrl;
                state.Filmdata.genre = filmdata.genre;
                state.Filmdata.director = filmdata.director;
                state.Filmdata.duration = filmdata.duration;
                state.Filmdata.fsk = filmdata.fsk;
                state.Filmdata.description = filmdata.description;
            },
            clearFilmdata: (state)=>{
                state.Filmdata.id = null;
                state.Filmdata.name = null;
                state.Filmdata.posterUrl = null;
                state.Filmdata.genre = null;
                state.Filmdata.director = null;
                state.Filmdata.duration = null;
                state.Filmdata.fsk = null;
                state.Filmdata.description = null;
            },
            setShowingdata: (state, showingdata)=>{
                state.Showingdata.id = showingdata.id;
                state.Showingdata.basePrice = showingdata.basePrice;
                state.Showingdata.is3D = showingdata.is3D;
                state.Showingdata.date = showingdata.date;
                state.Showingdata.time = TimeConverterService.convertTime(showingdata.date);
                // state.Showingdata.date = showingdata.date.split('T')[0];
                // state.Showingdata.time = showingdata.date.split('T')[1];
                state.Showingdata.cinemaId = showingdata.cinemaRoomId;
                state.Showingdata.movieId = showingdata.movieId;
                state.Showingdata.seats = showingdata.seats;
            },
            clearShowingdata: (state)=>{
                state.Showingdata.id = null;
                state.Showingdata.date = null;
                state.Showingdata.time = null;
                state.Showingdata.cinemaId = null;
            },
            setKundenDaten: (state, kundendaten)=>{
                state.Kundendaten.kundenId = kundendaten.id;
                state.Kundendaten.Email = kundendaten.email;
                state.Kundendaten.Vorname = kundendaten.firstName;
                state.Kundendaten.Name = kundendaten.lastName;
                state.Kundendaten.Rolle = kundendaten.role;
            },
            clearKundenDaten: (state)=>{
                state.Kundendaten.kundenId = null;
                state.Kundendaten.Email = null;
                state.Kundendaten.Vorname = null;
                state.Kundendaten.Name = null;
                state.Kundendaten.Rolle = null;
            }
        },
        getters: {
                getFilmdata(state){
                    return state.Filmdata;
                },
                getShowingdata(state){
                    return state.Showingdata;
                },
                getRolle(state){
                    return state.Kundendaten.Rolle;
                },
                getKundenDaten(state){
                    return state.Kundendaten;
                },
                getKundenId(state){
                    return state.Kundendaten.kundenId;
                },
                getNameVorname(state){
                    if(state.Kundendaten.Name != null){
                        return state.Kundendaten.Vorname + ' ' +state.Kundendaten.Name;
                    }
                    
                }
            },
    plugins: [vuexLocal.plugin],
})

    