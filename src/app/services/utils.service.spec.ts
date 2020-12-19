import { TestBed } from '@angular/core/testing';
import { Streak } from '../models/streak';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
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
  });

  describe('groupEntries', () => {
    it('should group entries by activity name', () => {
      const goals = [{
        id: 'goal1',
        activityName: 'Running',
        timesPerWeek:3
      },{
        id: 'goal2',
        activityName: 'Yoga',
        timesPerWeek:1
      },{
        id: 'goal3',
        activityName: 'Cycling',
        timesPerWeek:5
      }];

      const now = Date.now();
      const entries = [{
        id: "entry1",
        goalId: "goal3",
        date: now
      },{
        id: "entry2",
        goalId: "goal3",
        date: now
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }];

      const groupedEntries = service.groupEntries(entries, goals);
      expect(groupedEntries).toEqual({
        'Cycling': [{
            id: "entry1",
            goalId: "goal3",
            date: now
          },{
            id: "entry2",
            goalId: "goal3",
            date: now
          }
        ],
        'Running': [{
            id: "entry3",
            goalId: "goal1",
            date: now
          }
        ]
      });
    });
  });

  describe('removeOutdatedEntries', () => {
    it('should remove entries from previous week', () => {
      const now = Date.now();

      let pastDate;
      if (new Date().getMonth() - 1 < 0) {
        pastDate = new Date(now).setFullYear(new Date().getFullYear() - 1);
      } else {
        pastDate = new Date(now).setMonth(new Date().getMonth() - 1);
      }

      const entries = [{
        id: "entry1",
        goalId: "goal3",
        date: now
      },{
        id: "entry2",
        goalId: "goal3",
        date: pastDate
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }];

      expect(service.removeOutdatedEntries(entries)).toEqual([{
        id: "entry1",
        goalId: "goal3",
        date: now
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }]);
    });
  });

  describe('streakResetNeeded', () => {

    it('should return true if last streak has been more than a week ago', () => {
      const streak = new Streak();
      streak.lastComputation = new Date().setDate(new Date(streak.lastComputation).getDate() - 15)
      expect(service.streakResetNeeded(streak)).toBe(true);     
    });

    it('should return false if last streak has been updated in this week', () => {
      const streak = new Streak();
      streak.lastComputation = new Date().setTime(streak.lastComputation - (5 * 24 * 60 * 60));
      expect(service.streakResetNeeded(streak)).toBe(false);     
    });
  });

  describe('allGoalsReached', () => {
    it('should return true if all goals have been reached', () => {
      const goals = [{
        id: 'goal1',
        activityName: 'Running',
        timesPerWeek:3
      },{
        id: 'goal2',
        activityName: 'Yoga',
        timesPerWeek:1
      },];

      const now = Date.now();
      const entries = [{
        id: "entry1",
        goalId: "goal1",
        date: now
      },{
        id: "entry2",
        goalId: "goal2",
        date: now
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }];

      expect(service.allGoalsReached(entries, goals)).toBe(true);
    });    
    
    it('should return false if goals have NOT been reached', () => {
      const goals = [{
        id: 'goal1',
        activityName: 'Running',
        timesPerWeek:3
      },{
        id: 'goal2',
        activityName: 'Yoga',
        timesPerWeek:1
      },];

      const now = Date.now();
      const entries = [{
        id: "entry1",
        goalId: "goal1",
        date: now
      },{
        id: "entry2",
        goalId: "goal2",
        date: now
      }, {
        id: "entry3",
        goalId: "goal1",
        date: now
      }];
      expect(service.allGoalsReached(entries, goals)).toBe(false);
    });
  });
});
