import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Activity } from './models/activity';
import { Goal } from './models/goal';
import { Serializable } from './models/serializable';
import { DiaryEntry } from './models/diary-entry';
import { Streak } from './models/streak';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly ACTIVITIES_KEY = 'weekly-goals/activities';
  private readonly GOALS_KEY = 'weekly-goals/goals';
  private readonly ENTRIES_KEY = 'weekly-goals/entries';
  private readonly STREAK_KEY = 'weekly-goals/streak';

  constructor(private storage: Storage) { }

  getActivities() {
    return this.getItems(this.ACTIVITIES_KEY);;
  }

  getGoals() {
    return this.getItems(this.GOALS_KEY);
  }

  getEntries() {
    this.cleanEntries();
    this.resetStreakIfNeeded();
    return this.getItems(this.ENTRIES_KEY);
  }

  async resetStreakIfNeeded() {
    const streak = await this.getStreak();
    const streakWeekNumber = this.getWeekNumber(new Date(streak.lastComputation));
    const currentWeekNumber = this.getWeekNumber(new Date());

    if (currentWeekNumber - streakWeekNumber >= 2) {
      //last streak increase has been done over a week ago
      this.resetStreak(); 
    }
  }

  async getStreak() {
    const streak = await this.storage.get(this.STREAK_KEY);
    if (!streak) {
      this.storage.set(this.STREAK_KEY, new Streak())
    };
    return this.storage.get(this.STREAK_KEY);
  }

  resetStreak() {
    this.storage.set(this.STREAK_KEY, 0);
  }

  async increaseStreak() {
    const streak = await this.getStreak();
    streak.count = streak.count + 1;
    streak.lastComputation = Date.now();
    return this.storage.set(this.STREAK_KEY, streak);
  }

  async getGroupedEntries() {
    const entries = await this.getEntries();
    return entries.reduce((acc, entry: DiaryEntry) => {
      const key = `${entry.activityId}`;
      if (!acc[`${key}`]) {
        acc[`${key}`] = [];
      }
      acc[`${key}`].push(entry);  
      return acc;
    }, {});
  }

  setEntries(entries: DiaryEntry[]) {
    return this.storage.set(this.ENTRIES_KEY, entries);
  }
  setGoals(entries: Goal[][]) {
    return this.storage.set(this.GOALS_KEY, entries);
  }
  setActivities(entries: Activity[]) {
    return this.storage.set(this.ACTIVITIES_KEY, entries);
  }
  deleteActivity(activity: Activity) {
    return this.deleteItem(this.ACTIVITIES_KEY, activity.id);
  }
  deleteEntry(entry: DiaryEntry) {
    return this.deleteItem(this.ENTRIES_KEY, entry.id);
  }

  deleteGoal(goal: Goal) {
    return this.deleteItem(this.GOALS_KEY, goal.id);
  }

  addActivity(activity: Activity) {
    return this.addItem(activity, this.ACTIVITIES_KEY)
  }

  addGoal(goal: Goal) {
    return this.addItem(goal, this.GOALS_KEY)
  }

  async allGoalsReached() {
    const goals = await this.getGoals();
    const entries = await this.getGroupedEntries();
    console.log('entries', entries);
    for (let goal of goals) {
      const entriesForGoal = entries[goal.activityId] || [];
      console.log('goal', goal, entriesForGoal);
      if (entriesForGoal.length < goal.timesPerWeek) {
        return false;
      }
    }
    return true;
  }

  async addDiaryEntry(diaryEntry: DiaryEntry) {
    const allGoalsReachedBefore = await this.allGoalsReached();
    const entries = await this.addItem(diaryEntry, this.ENTRIES_KEY);
    const allGoalsReachedAfter = await this.allGoalsReached();
    if (!allGoalsReachedBefore && allGoalsReachedAfter) {
      this.increaseStreak();
    }
    return Promise.resolve();
  }

  private async getItems(storeKey: string) {
    return await this.storage.get(storeKey) || [];
  }

  private async cleanEntries() {
    const entries = await this.getItems(this.ENTRIES_KEY);
    const cleanEntries = [];
    const currentWeekNumber = this.getWeekNumber(new Date());
    for (let entry of entries) {
      const isCurrentWeek = currentWeekNumber === this.getWeekNumber(new Date(entry.date));
      if (isCurrentWeek) {
        cleanEntries.push(entry);
      }
    }
    return this.setEntries(cleanEntries);
  }

  private async deleteItem(storeKey: string, id: string) {
    const items = await this.getItems(storeKey);
    const index = items.findIndex(act => act.id === id);
    if (index >= 0) {
      items.splice(index, 1);
      await this.storage.set(storeKey, items);
    }
    return items;
  }

  private async addItem(item: Serializable, storeKey: string) {
    if (!item.id) {
      item.id = `id_${Math.random()}`;
    }
    const items = await this.getItems(storeKey);
    items.push(item);
    await this.storage.set(storeKey, items);
    return items;
  }

  private getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

}