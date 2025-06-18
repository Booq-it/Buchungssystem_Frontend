import TimeConverterService from '../TimeConverter.service';

describe('TimeConverterService', () => {
  // Anweisungsüberdeckung
  it('convertDate: valid input', () => {
    expect(TimeConverterService.convertDate('2025-06-18T20:00:00')).toBe('18.06.2025');
  });
  // Entscheidungsüberdeckung
  it('convertDate: invalid input throws', () => {
    expect(() => TimeConverterService.convertDate('invalid')).toThrow();
  });

  it('convertTime: valid input', () => {
    expect(TimeConverterService.convertTime('2025-06-18T09:05:00')).toBe('09:05');
  });
  it('convertTime: invalid input throws', () => {
    expect(() => TimeConverterService.convertTime('invalid')).toThrow();
  });

  it('formatDate: valid input', () => {
    expect(TimeConverterService.formatDate('2025-06-18')).toContain('18');
  });
  it('formatDate: invalid input throws', () => {
    expect(() => TimeConverterService.formatDate('invalid-date')).toThrow();
  });
});
