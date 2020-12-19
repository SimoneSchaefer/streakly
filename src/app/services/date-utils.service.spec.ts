import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

describe('DateUtilsService', () => {
  let service: DateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWeekNumber', () => {
    it('for first week', () => {
      const testDate = Date.parse('04 Jan 1995 00:12:00 GMT');
      expect(service.getWeekNumber(new Date(testDate))).toEqual(1);
    });

    it('for last week', () => {
      const testDate = Date.parse('31 Dec 1995 00:12:00 GMT');
      expect(service.getWeekNumber(new Date(testDate))).toEqual(52);
    });

    it('for middle week', () => {
      const testDate = Date.parse('13 Jul 1995 00:12:00 GMT');
      expect(service.getWeekNumber(new Date(testDate))).toEqual(28);
    });
  })
});
