import { describe, it, expect } from 'vitest';

const dummyBooking = {
  price: 10,
  seats: [
    { additionalPrice: 2, seatRow: 'A', seatNumber: 1 },
    { additionalPrice: 3, seatRow: 'B', seatNumber: 2 }
  ]
};

const dummyBookingSingle = {
  price: 10,
  seats: [
    { additionalPrice: 2, seatRow: 'A', seatNumber: 1 }
  ]
};

// getFullPrice
function getFullPrice(booking) {
  var fullPrice = 0;
  for (let i = 0; i < booking.seats.length; i++) {
    fullPrice += (booking.price + booking.seats[i].additionalPrice);
  }
  return fullPrice.toFixed(2);
}

// getSeats
function getSeats(booking) {
  var seats = "";
  for (let i = 0; i < booking.seats.length; i++) {
    if (i == booking.seats.length - 1) {
      seats += booking.seats[i].seatRow + booking.seats[i].seatNumber;
    } else {
      seats += booking.seats[i].seatRow + booking.seats[i].seatNumber + ", ";
    }
  }
  return seats;
}

describe('BuchungenView Methoden', () => {
  // Anweisungsüberdeckung: getFullPrice
  it('getFullPrice: gibt den Gesamtpreis für mehrere Sitze korrekt zurück', () => {
    expect(getFullPrice(dummyBooking)).toBe('35.00');
  });
  // Entscheidungsüberdeckung: getFullPrice mit nur einem Sitz
  it('getFullPrice: gibt den Gesamtpreis für einen Sitz korrekt zurück', () => {
    expect(getFullPrice(dummyBookingSingle)).toBe('12.00');
  });

  // Anweisungsüberdeckung: getSeats
  it('getSeats: gibt Sitzliste für mehrere Sitze korrekt zurück', () => {
    expect(getSeats(dummyBooking)).toBe('A1, B2');
  });
  // Entscheidungsüberdeckung: getSeats mit nur einem Sitz
  it('getSeats: gibt Sitzliste für einen Sitz korrekt zurück', () => {
    expect(getSeats(dummyBookingSingle)).toBe('A1');
  });
});
