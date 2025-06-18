import APIService from '../API.service';

describe('APIService', () => {
  // Anweisungsüberdeckung
  it('getAPIUrl returns correct url', () => {
    expect(APIService.getAPIUrl()).toBe('https://localhost:7082');
  });
  // Entscheidungsüberdeckung ist hier nicht nötig, da keine Verzweigung
});
