import { describe, it, expect } from 'vitest';
import { getFormattedDate, getRelativeTimeString } from '../../utils/date';

// This is a simple test to demonstrate the Vitest setup
describe('Date utilities', () => {
  // Fixed "now" date for testing
  const fixedNowDate = new Date('2024-01-10T12:00:00Z');
  
  describe('getFormattedDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toBe('January 1, 2024');
    });
  });
  
  describe('getRelativeTimeString', () => {
    it('returns "Today" for the current day', () => {
      const today = new Date('2024-01-10T09:00:00Z');
      expect(getRelativeTimeString(today, fixedNowDate)).toBe('Today');
    });
    
    it('returns "Yesterday" for the previous day', () => {
      const yesterday = new Date('2024-01-09T12:00:00Z');
      expect(getRelativeTimeString(yesterday, fixedNowDate)).toBe('Yesterday');
    });
    
    it('returns "X days ago" for recent dates', () => {
      const fiveDaysAgo = new Date('2024-01-05T12:00:00Z');
      expect(getRelativeTimeString(fiveDaysAgo, fixedNowDate)).toBe('5 days ago');
    });
    
    it('returns "X months ago" for older dates', () => {
      const twoMonthsAgo = new Date('2023-11-10T12:00:00Z');
      expect(getRelativeTimeString(twoMonthsAgo, fixedNowDate)).toBe('2 months ago');
    });
    
    it('returns "X years ago" for dates over a year old', () => {
      const twoYearsAgo = new Date('2022-01-10T12:00:00Z');
      expect(getRelativeTimeString(twoYearsAgo, fixedNowDate)).toBe('2 years ago');
    });
  });
}); 