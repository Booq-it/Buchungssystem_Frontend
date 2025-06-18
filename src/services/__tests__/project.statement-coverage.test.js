// Statement coverage test: Jede Funktion im Projekt wird mindestens einmal aufgerufen
import TimeConverterService from '../TimeConverter.service';
import APIService from '../API.service';
import store from '../../store';
import BuchungsForm from '../../components/BuchungsForm.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

// JavaScript
global.scrollTo = () => {};
window.scrollTo = () => {};

describe('Statement Coverage: Jede Funktion wird aufgerufen', () => {
  it('ruft alle TimeConverterService Funktionen auf', () => {
    TimeConverterService.convertDate('2025-06-18T20:00:00');
    TimeConverterService.convertTime('2025-06-18T09:05:00');
    TimeConverterService.formatDate('2025-06-18');
  });

  it('ruft APIService Funktion auf', () => {
    APIService.getAPIUrl();
  });

  it('ruft Vuex Mutations und Getter auf', () => {
    const filmdata = {id: 1, name: 'Test', posterUrl: 'url', genre: 'g', director: 'd', duration: 120, fsk: 12, description: 'desc'};
    store.commit('setFilmdata', filmdata);
    store.commit('clearFilmdata');
    store.getters.getNameVorname;
  });

  it('ruft BuchungsForm Methoden auf', async () => {
    const wrapper = shallowMount(BuchungsForm, {data() { return {
      seats: [{id: 1, additionalPrice: 2, seatRow: 'A', seatNumber: 1}],
      basePrice: 10
    }; }});
    await wrapper.vm.calculatePrice();
    wrapper.vm.formatDate('2025-06-18');
  });
});
