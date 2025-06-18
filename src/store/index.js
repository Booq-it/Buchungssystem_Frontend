import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
import TimeConverterService from '../services/TimeConverter.service';


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
        },
        Bookingdata: {
            showingId: null,
            seats: null,
            seatCount: null,
            seatObjs: null,
            price: null,
            is3D: null,
            date: null,
            time: null,
            cinemaId: null
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
            },
            setBookingdata: (state, bookingdata)=>{
                state.Bookingdata.showingId = bookingdata.showingId;
                state.Bookingdata.seats = bookingdata.seats;
                state.Bookingdata.seatCount = bookingdata.seatCount;
                state.Bookingdata.seatObjs = bookingdata.seatObjs;
                state.Bookingdata.price = bookingdata.price;
                state.Bookingdata.is3D = bookingdata.is3D;
                state.Bookingdata.date = bookingdata.date;
                state.Bookingdata.time = TimeConverterService.convertTime(bookingdata.date);
                state.Bookingdata.cinemaId = bookingdata.cinemaId;
            },
            clearBookingdata: (state)=>{
                state.Bookingdata.showingId = null;
                state.Bookingdata.seats = null;
                state.Bookingdata.seatCount = null;
                state.Bookingdata.seatObjs = null;
                state.Bookingdata.price = null;
                state.Bookingdata.is3D = null;
                state.Bookingdata.date = null;
                state.Bookingdata.time = null;
                state.Bookingdata.cinemaId = null;
                state.Bookingdata.movieId = null;
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
                getBookingdata(state){
                    return state.Bookingdata;
                },
                getName(state){
                    return state.Kundendaten.Name;
                },
                getVorname(state){
                    return state.Kundendaten.Vorname;
                },
                getEmail(state){
                    return state.Kundendaten.Email;
                },
                getNameVorname(state){
                    if(state.Kundendaten.Name != null){
                        return state.Kundendaten.Vorname + ' ' +state.Kundendaten.Name;
                    }
                    else{
                        return undefined;
                    }
                }
            },
    plugins: [vuexLocal.plugin],
})

    