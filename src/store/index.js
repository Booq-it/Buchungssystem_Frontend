import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});



export default createStore({
    state: {
        m_FilmID: null,
        m_Filmname: null,
        m_Datum: null,
        Kundendaten:{
            kundenId: null,
            Name: "Name",
            Vorname: "Test",
            Email: null,
            Rolle: null,
        }
    },
    mutations: {
            setFilmName: (state, m_Filmname) =>{          
                state.m_Filmname = m_Filmname
            },
            setFilmID: (state, m_FilmID) =>{          
                state.m_FilmID = m_FilmID
            },
            setDatum: (state, m_Datum) =>{
                state.m_Datum = m_Datum
            },
            setKundenDaten: (state, kundendaten)=>{
                state.Kundendaten.kundenId = kundendaten.m_KundenId;
                state.Kundendaten.Email = kundendaten.m_Email;
                state.Kundendaten.Vorname = kundendaten.m_Vorname;
                state.Kundendaten.Name = kundendaten.m_Name;
                state.Kundendaten.Rolle = kundendaten.m_Rolle;
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
                getFilmID(state){
                    return state.m_FilmID;
                },
                getFilmName(state){
                    return state.m_Filmname;
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

    