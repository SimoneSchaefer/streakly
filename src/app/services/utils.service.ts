import { Injectable } from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';
import { Goal } from '../models/goal';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Get the week number (week 1 - 52) for the given date
   * 
   * @param date 
   */
  getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  
  groupEntries(entries: DiaryEntry[], goals: Goal[]) {
    return entries.reduce((acc, entry: DiaryEntry) => {
      const activityName = goals.find(goal => goal.id === entry.goalId)?.activityName || "?";
      if (!acc[activityName]) {
        acc[activityName] = [];
      }
      acc[activityName].push(entry);  
      return acc;
    }, {});
  }

  removeOutdatedEntries(entries: DiaryEntry[]) {
    const cleanEntries = [];
    const currentWeekNumber = this.getWeekNumber(new Date());
    for (let entry of entries) {
      const isCurrentWeek = currentWeekNumber === this.getWeekNumber(new Date(entry.date));
      if (isCurrentWeek) {
        cleanEntries.push(entry);
      }
    }
    return cleanEntries;
  }
}
