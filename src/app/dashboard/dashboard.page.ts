import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ViewWillEnter, AlertController, ModalController } from '@ionic/angular';
import { DiaryEntry } from '../models/diary-entry';
import { Goal } from '../models/goal';
import { EditGoalComponent } from './edit-goal/edit-goal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  entries: {};
  goals: Goal[];
  streak: number;
  expanded: Goal[] = [];

  constructor(
    private storeService: StoreService, 
    private alertController: AlertController,
    private modalController: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadData();
  }

  async addGoal() {
    this.editGoal();
  }


  async editGoal(goal? : Goal) {
    const modal = await this.modalController.create({
      component: EditGoalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        goal: goal
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.loadData();
  }

  toggleGoal(goal: Goal) {
    const expandedIndex = this.getExpandedIndex(goal);
    if (expandedIndex >= 0) {
      this.expanded.splice(expandedIndex, 1)
    } else {
      this.expanded.push(goal);
    }
  }

  isExpanded(goal: Goal) {
    return this.getExpandedIndex(goal) >= 0;
  }

  getExpandedIndex(goal: Goal) {
    return this.expanded.findIndex(eg => eg.id === goal.id);
  }

  activityNameForEntry(entry: DiaryEntry) {
    return this.goals.find(goal => goal.id === entry.goalId).activityName;
  }

  getCurrentCount(goal: Goal) {
    return this.getEntries(goal.activityName).length;
  }

  getEntries(activityName: string) {
    return this.entries[activityName] || [];
  }

  getColor(goal: Goal) {
    const percent = this.getCurrentCount(goal) / goal.timesPerWeek * 100;
    if (percent < 50) {
      return 'danger';
    } else if (percent < 100) {
      return 'warning';
    }
    return 'success';
  }

  async addDiaryEntry(goal: Goal) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Entry',
      message: `Have you done some ${goal.activityName} today?`,
      buttons: [
        {
          text: 'No 😔',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes 😊',
          cssClass: 'primary',
          handler: async () => {
            console.log('Confirm Okay');
            const diaryEntry = new DiaryEntry();
            diaryEntry.goalId = goal.id;
            diaryEntry.date = Date.now();
            await this.storeService.addDiaryEntry(diaryEntry);
            this.loadData();
          }
        }
      ]
    });

    await alert.present();
  }

  async loadData() {
    this.goals = await this.storeService.getGoals();
    this.entries = await this.storeService.getGroupedEntries();  
    this.streak = await this.storeService.getStreak();   

    console.log("goals", this.goals);
    console.log("entries", this.entries);
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
    await this.storeService.setGoals([]);
    await this.storeService.resetStreak();
    this.loadData();
  }
}
