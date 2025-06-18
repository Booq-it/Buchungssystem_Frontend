import { shallowMount } from '@vue/test-utils';
import BuchungsForm from '../BuchungsForm.vue';

describe('BuchungsForm', () => {
  // Anweisungsüberdeckung: keine Sitze ausgewählt
  it('calculatePrice: no seats selected', async () => {
    const wrapper = shallowMount(BuchungsForm, {data() { return {seats: [], basePrice: 10}; }});
    await wrapper.vm.calculatePrice();
    expect(wrapper.vm.calculatedPrice).toBe('0,00');
  });
  // Entscheidungsüberdeckung: Sitze ausgewählt
  it('calculatePrice: seats selected', async () => {
    const wrapper = shallowMount(BuchungsForm, {data() { return {
      seats: [{id: 1, additionalPrice: 2, seatRow: 'A', seatNumber: 1}],
      basePrice: 10
    }; }});
    wrapper.vm.selectedSeatObjs = [{id: 1, additionalPrice: 2, seatRow: 'A', seatNumber: 1}];
    wrapper.vm.selectedSeats = '';
    await wrapper.vm.calculatePrice();
    expect(wrapper.vm.calculatedPrice).toContain(',');
  });
});
