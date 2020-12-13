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

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  activityNameForEntry(entry: DiaryEntry) {
    return this.activities.find(act => act.id === entry.activityId).name;
  }

  getCurrentCount(activityId: number) {
    return this.getEntries(activityId).length;
  }

  getEntries(activityId: number) {
    return this.entries[activityId] || [];
  }

  getColor(activityId: number) {
    const percent = this.getCurrentCount(activityId) / this.getGoal(activityId).timesPerWeek * 100;
    if (percent < 50) {
      return 'danger';
    } else if (percent < 100) {
      return 'warning';
    }
    return 'success';
  }

  getGoal(activityId: number) {
    return this.goals.find((goal => goal.activityId === activityId));
  }

  async loadData() {
    this.activities = await this.storeService.getActivities();
    this.goals = await this.storeService.getGoals();
    const entries = await this.storeService.getEntries();  

    const groupedEntries = entries.reduce((acc, entry: DiaryEntry) => {
      const act = new Date(entry.date).getDay();
      if (!acc[entry.activityId]) {
        acc[entry.activityId] = [];
      }
      acc[entry.activityId].push(entry);
      return acc;
    }, {});
    this.entries = groupedEntries;

  }

  deleteEntry(entry: DiaryEntry) {
    this.storeService.deleteEntry(entry);
    this.loadData();    
  }

  activityName(activityId: number) {
    return this.activities.find(act => `${act.id}` === `${activityId}`).name;
  }
}
