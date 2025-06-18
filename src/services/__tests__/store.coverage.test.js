// JavaScript
import store from '../../store/index.js';

import { describe, it, expect } from 'vitest';

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
    store.commit('setKundenDaten', {
                id: 1,
                email: '',
                firstName: 'Max',
                lastName: 'Mustermann',
                role: 'user'
    });
    // store.state.Kundendaten.Name = 'Mustermann';
    // store.state.Kundendaten.Vorname = 'Max';
    expect(store.getters.getNameVorname).toBe('Max Mustermann');
  });
  it('getNameVorname returns undefined if Name is null', () => {
    // store.state.Kundendaten.Name = null;
    store.commit('clearKundenDaten');
    expect(store.getters.getNameVorname).toBeUndefined();
  });
  // getFilmdata
  it('getFilmdata returns Filmdata object', () => {
    expect(store.getters.getFilmdata).toBe(store.state.Filmdata);
  });
  // getShowingdata
  it('getShowingdata returns Showingdata object', () => {
    expect(store.getters.getShowingdata).toBe(store.state.Showingdata);
  });
  // getRolle
  it('getRolle returns Rolle', () => {
    store.commit('setKundenDaten', {
      id: 1,
      email: '',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'user'
    });
    expect(store.getters.getRolle).toBe('user');
  });
  // getKundenDaten
  it('getKundenDaten returns Kundendaten object', () => {
    expect(store.getters.getKundenDaten).toBe(store.state.Kundendaten);
  });
  // getKundenId
  it('getKundenId returns kundenId', () => {
    store.commit('setKundenDaten', {
      id: 42,
      email: '',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'user'
    });
    expect(store.getters.getKundenId).toBe(42);
  });
  // getBookingdata
  it('getBookingdata returns Bookingdata object', () => {
    expect(store.getters.getBookingdata).toBe(store.state.Bookingdata);
  });
  // getName
  it('getName returns Name', () => {
    store.commit('setKundenDaten', {
      id: 1,
      email: '',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'user'
    });
    expect(store.getters.getName).toBe('Mustermann');
  });
  // getVorname
  it('getVorname returns Vorname', () => {
    store.commit('setKundenDaten', {
      id: 1,
      email: '',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'user'
    });
    expect(store.getters.getVorname).toBe('Max');
  });
  // getEmail
  it('getEmail returns Email', () => {
    store.commit('setKundenDaten', {
      id: 1,
      email: 'test@example.com',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'user'
    });
    expect(store.getters.getEmail).toBe('test@example.com');
  });
  // setShowingdata
  it('setShowingdata sets all fields', () => {
    const showingdata = {
      id: 1,
      basePrice: 15,
      is3D: true,
      date: '2025-06-18T20:00:00',
      cinemaRoomId: 2,
      movieId: 3,
      seats: [{id: 1}]
    };
    store.commit('setShowingdata', showingdata);
    expect(store.state.Showingdata.id).toBe(1);
    expect(store.state.Showingdata.basePrice).toBe(15);
    expect(store.state.Showingdata.is3D).toBe(true);
    expect(store.state.Showingdata.cinemaId).toBe(2);
    expect(store.state.Showingdata.movieId).toBe(3);
    expect(store.state.Showingdata.seats).toEqual([{id: 1}]);
  });
  // clearShowingdata
  it('clearShowingdata resets all fields', () => {
    store.commit('clearShowingdata');
    expect(store.state.Showingdata.id).toBeNull();
    expect(store.state.Showingdata.date).toBeNull();
    expect(store.state.Showingdata.time).toBeNull();
    expect(store.state.Showingdata.cinemaId).toBeNull();
  });
  // setKundenDaten
  it('setKundenDaten sets all fields', () => {
    const kunden = {
      id: 99,
      email: 'foo@bar.de',
      firstName: 'Anna',
      lastName: 'Muster',
      role: 'admin'
    };
    store.commit('setKundenDaten', kunden);
    expect(store.state.Kundendaten.kundenId).toBe(99);
    expect(store.state.Kundendaten.Email).toBe('foo@bar.de');
    expect(store.state.Kundendaten.Vorname).toBe('Anna');
    expect(store.state.Kundendaten.Name).toBe('Muster');
    expect(store.state.Kundendaten.Rolle).toBe('admin');
  });
  // clearKundenDaten
  it('clearKundenDaten resets all fields', () => {
    store.commit('clearKundenDaten');
    expect(store.state.Kundendaten.kundenId).toBeNull();
    expect(store.state.Kundendaten.Email).toBeNull();
    expect(store.state.Kundendaten.Vorname).toBeNull();
    expect(store.state.Kundendaten.Name).toBeNull();
    expect(store.state.Kundendaten.Rolle).toBeNull();
  });
  // setBookingdata
  it('setBookingdata sets all fields', () => {
    const booking = {
      showingId: 7,
      seats: [1,2],
      seatCount: 2,
      seatObjs: [{id:1},{id:2}],
      price: 20,
      is3D: false,
      date: '2025-06-18T20:00:00',
      cinemaId: 5
    };
    store.commit('setBookingdata', booking);
    expect(store.state.Bookingdata.showingId).toBe(7);
    expect(store.state.Bookingdata.seats).toEqual([1,2]);
    expect(store.state.Bookingdata.seatCount).toBe(2);
    expect(store.state.Bookingdata.seatObjs).toEqual([{id:1},{id:2}]);
    expect(store.state.Bookingdata.price).toBe(20);
    expect(store.state.Bookingdata.is3D).toBe(false);
    expect(store.state.Bookingdata.cinemaId).toBe(5);
  });
  // clearBookingdata
  it('clearBookingdata resets all fields', () => {
    store.commit('clearBookingdata');
    expect(store.state.Bookingdata.showingId).toBeNull();
    expect(store.state.Bookingdata.seats).toBeNull();
    expect(store.state.Bookingdata.seatCount).toBeNull();
    expect(store.state.Bookingdata.seatObjs).toBeNull();
    expect(store.state.Bookingdata.price).toBeNull();
    expect(store.state.Bookingdata.is3D).toBeNull();
    expect(store.state.Bookingdata.date).toBeNull();
    expect(store.state.Bookingdata.time).toBeNull();
    expect(store.state.Bookingdata.cinemaId).toBeNull();
    expect(store.state.Bookingdata.movieId).toBeNull();
  });
});
