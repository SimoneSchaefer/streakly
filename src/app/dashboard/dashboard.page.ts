import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ViewWillEnter } from '@ionic/angular';
import { DiaryEntry } from '../models/diary-entry';
import { Activity } from '../models/activity';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  entries: {};
  goals: Goal[];
  activities: Activity[];
  streak: number;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  activityNameForEntry(entry: DiaryEntry) {
    return this.activities.find(act => act.id === entry.activityId).name;
  }

  getCurrentCount(activityId: string) {
    return this.getEntries(activityId).length;
  }

  getEntries(activityId: string) {
    return this.entries[activityId] || [];
  }

  getColor(activityId: string) {
    const percent = this.getCurrentCount(activityId) / this.getGoal(activityId).timesPerWeek * 100;
    if (percent < 50) {
      return 'danger';
    } else if (percent < 100) {
      return 'warning';
    }
    return 'success';
  }

  getGoal(activityId: string) {
    return this.goals.find((goal => goal.activityId === activityId));
  }

  async loadData() {
    this.activities = await this.storeService.getActivities();
    this.goals = await this.storeService.getGoals();
    this.entries = await this.storeService.getGroupedEntries();  
    this.streak = await this.storeService.getStreak();   
  }

  getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  deleteEntry(entry: DiaryEntry) {
    this.storeService.deleteEntry(entry);
    this.loadData();    
  }

  async resetEntries() {
    await this.storeService.setEntries([]);
    await this.storeService.setActivities([]);
    await this.storeService.setGoals([]);
    await this.storeService.resetStreak();
    this.loadData();
  }

  activityName(activityId: number) {
    return this.activities.find(act => `${act.id}` === `${activityId}`).name;
  }
}
