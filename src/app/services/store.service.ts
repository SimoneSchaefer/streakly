import { Injectable } from '@angular/core';

import { Goal } from '../models/goal';
import { DiaryEntry } from '../models/diary-entry';
import { Streak } from '../models/streak';
import { UtilsService } from './utils.service';
import { PersistService } from './persist.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly GOALS_KEY = 'weekly-goals/goals';
  private readonly ENTRIES_KEY = 'weekly-goals/entries';
  private readonly STREAK_KEY = 'weekly-goals/streak';
  private readonly RECORD_KEY = 'weekly-goals/record';

  constructor(
    private utils: UtilsService,
    private persistService : PersistService
  ) { }

  getGoals() {
    return this.persistService.getItems(this.GOALS_KEY);
  }

  getEntries() {
    this.cleanEntries();
    this.resetStreakIfNeeded();
    return this.persistService.getItems(this.ENTRIES_KEY);
  }

  async resetStreakIfNeeded() {
    const streak = await this.getStreak();
    const streakWeekNumber = this.utils.getWeekNumber(new Date(streak.lastComputation));
    const currentWeekNumber = this.utils.getWeekNumber(new Date());

    if (currentWeekNumber - streakWeekNumber >= 2) {
      //last streak increase has been done over a week ago
      this.resetStreak(); 
    }
  }

  getStreak() {
    return this.persistService.getItem(this.STREAK_KEY, new Streak())
  }

  resetStreak() {
    this.persistService.saveItem(this.STREAK_KEY, new Streak());
  }

  getRecord() {
    return this.persistService.getItem(this.RECORD_KEY, 0)
  }

  async increaseStreak() {
    const streak = await this.getStreak();
    streak.count = streak.count + 1;
    streak.lastComputation = Date.now();
    return this.persistService.saveItem(this.STREAK_KEY, streak);
  }

  async getGroupedEntries() {
    const entries = await this.getEntries();
    const goals = await this.getGoals();
    return this.utils.groupEntries(entries, goals);
  }

  setEntries(entries: DiaryEntry[]) {
    return this.persistService.saveItem(this.ENTRIES_KEY, entries);
  }

  setGoals(goals: Goal[]) {
    return this.persistService.saveItem(this.GOALS_KEY, goals);
  }
 
  deleteEntry(entry: DiaryEntry) {
    return this.persistService.deleteItemFromList(this.ENTRIES_KEY, entry.id);
  }

  deleteGoal(goal: Goal) {
    return this.persistService.deleteItemFromList(this.GOALS_KEY, goal.id);
  }

  saveGoal(goal: Goal) {
    return this.persistService.addOrUpdateItemInList(this.GOALS_KEY, goal)
  }

  async allGoalsReached() {
    const goals = await this.getGoals();
    const entries = await this.getGroupedEntries();

    for (let goal of goals) {
      const entriesForGoal = entries[goal.activityName] || [];
      if (entriesForGoal.length < goal.timesPerWeek) {
        return false;
      }
    }
    return true;
  }

  async addDiaryEntry(diaryEntry: DiaryEntry) {
    const allGoalsReachedBefore = await this.allGoalsReached();
    await this.persistService.addOrUpdateItemInList(this.ENTRIES_KEY, diaryEntry);
    const allGoalsReachedAfter = await this.allGoalsReached();

    if (!allGoalsReachedBefore && allGoalsReachedAfter) {
      await this.increaseStreak();
      const currentRecord = await this.getRecord();
      const currentStreak = await this.getStreak();
      if (currentStreak > currentRecord){
        await this.persistService.addOrUpdateItemInList(this.RECORD_KEY, currentStreak);
      }
    }
    return Promise.resolve();
  }


  private async cleanEntries() {
    const entries = await this.persistService.getItems(this.ENTRIES_KEY);
    const cleanedEntries = this.utils.removeOutdatedEntries(entries);
    return this.setEntries(cleanedEntries);
  }
}
