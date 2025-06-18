import DateConverterService from '../TimeConverter.service.js';
import { describe, it, expect } from 'vitest';

describe('DateConverterService', () => {
    describe('convertDate', () => {
        it('should convert ISO date string to DD.MM.YYYY format', () => {
            const input = '2024-06-10T15:30:00';
            const result = DateConverterService.convertDate(input);
            expect(result).toBe('10.06.2024');
        });

        it('should pad single digit day and month with zero', () => {
            const input = '2024-1-5T08:00:00';
            const result = DateConverterService.convertDate(input);
            expect(result).toBe('05.01.2024');
        });

        it('should handle already padded day and month', () => {
            const input = '2024-12-31T23:59:59';
            const result = DateConverterService.convertDate(input);
            expect(result).toBe('31.12.2024');
        });

        it('should handle invalid input gracefully', () => {
            const input = 'invalid-date';
            expect(() => DateConverterService.convertDate(input)).toThrow();
        });
    });
});
describe('convertTime', () => {
    it('should convert ISO date string to HH:MM format', () => {
        const input = '2024-06-10T05:07:00';
        const result = DateConverterService.convertTime(input);
        expect(result).toBe('05:07');
    });

    it('should pad single digit hours and minutes with zero', () => {
        const input = '2024-06-10T8:9:00';
        const result = DateConverterService.convertTime(input);
        expect(result).toBe('08:09');
    });

    it('should handle already padded hours and minutes', () => {
        const input = '2024-06-10T23:59:00';
        const result = DateConverterService.convertTime(input);
        expect(result).toBe('23:59');
    });

    it('should handle invalid input gracefully', () => {
        const input = 'invalid-time';
        expect(() => DateConverterService.convertTime(input)).toThrow();
    });

    it('should handle missing time part gracefully', () => {
        const input = '2024-06-10';
        expect(() => DateConverterService.convertTime(input)).toThrow();
    });
});

describe('convertDate edge cases', () => {
    it('should throw if input is empty', () => {
        expect(() => DateConverterService.convertDate('')).toThrow();
    });

    it('should throw if input is null', () => {
        expect(() => DateConverterService.convertDate(null)).toThrow();
    });

    it('should throw if input is undefined', () => {
        expect(() => DateConverterService.convertDate(undefined)).toThrow();
    });
});

describe('convertTime edge cases', () => {
    it('should throw if input is empty', () => {
        expect(() => DateConverterService.convertTime('')).toThrow();
    });

    it('should throw if input is null', () => {
        expect(() => DateConverterService.convertTime(null)).toThrow();
    });

    it('should throw if input is undefined', () => {
        expect(() => DateConverterService.convertTime(undefined)).toThrow();
    });
});
