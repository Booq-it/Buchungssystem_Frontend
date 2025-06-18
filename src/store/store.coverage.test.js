import store from '../../store';

describe('Vuex Store Mutations', () => {
  // setFilmdata
  it('setFilmdata sets all fields', () => {
    const filmdata = {id: 1, name: 'Test', posterUrl: 'url', genre: 'g', director: 'd', duration: 120, fsk: 12, description: 'desc'};
    store.commit('setFilmdata', filmdata);
    expect(store.state.Filmdata.name).toBe('Test');
  });
  // clearFilmdata
  it('clearFilmdata resets all fields', () => {
    store.commit('clearFilmdata');
    expect(store.state.Filmdata.name).toBeNull();
  });
  // getNameVorname Entscheidungsüberdeckung
  it('getNameVorname returns full name if Name is set', () => {
    store.state.Kundendaten.Name = 'Mustermann';
    store.state.Kundendaten.Vorname = 'Max';
    expect(store.getters.getNameVorname(store.state)).toBe('Max Mustermann');
  });
  it('getNameVorname returns undefined if Name is null', () => {
    store.state.Kundendaten.Name = null;
    expect(store.getters.getNameVorname(store.state)).toBeUndefined();
  });
});
