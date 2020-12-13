import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Activity } from '../models/activity';
import { ViewWillEnter } from '@ionic/angular';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit, ViewWillEnter {
  activities: Activity[];
  goals: Goal[];

  constructor(private storeService: StoreService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.storeService.getActivities().then(activities => {
      this.activities = activities;
    });
    this.storeService.getGoals().then(goals => {
      this.goals = goals;
    });
  }

  deleteGoal(goal: Goal) {
    this.storeService.deleteGoal(goal).then((goals) => {
      this.goals = goals;
    });
  }

  activityNameForGoal(goal: Goal) {
    return this.activities.find(act => act.id === goal.activityId).name;
  }
}
