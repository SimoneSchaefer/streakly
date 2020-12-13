import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Activity } from './models/activity';
import { Goal } from './models/goal';
import { Serializable } from './models/serializable';
import { DiaryEntry } from './models/diary-entry';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly ACTIVITIES_KEY = 'weekly-goals/activities';
  private readonly GOALS_KEY = 'weekly-goals/goals';
  private readonly ENTRIES_KEY = 'weekly-goals/entries';

  constructor(private storage: Storage) { }

  getActivities() {
    return this.getItems(this.ACTIVITIES_KEY);;
  }

  getGoals() {
    return this.getItems(this.GOALS_KEY);
  }

  getEntries() {
    return this.getItems(this.ENTRIES_KEY);
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

  addDiaryEntry(diaryEntry: DiaryEntry) {
    return this.addItem(diaryEntry, this.ENTRIES_KEY);
  }

  private async getItems(storeKey: string) {
    return await this.storage.get(storeKey) || [];
  }

  private async deleteItem(storeKey: string, id: number) {
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
      item.id = Math.random() * 10;
    }
    const items = await this.getItems(storeKey);
    items.push(item);
    await this.storage.set(storeKey, items);
    return items;
  }
}
