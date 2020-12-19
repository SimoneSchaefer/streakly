import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { ViewWillEnter, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { DiaryEntry } from '../models/diary-entry';
import { Goal } from '../models/goal';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { TranslateService } from '@ngx-translate/core'; // add this
import { Streak } from '../models/streak';
import { DateUtilsService } from '../services/date-utils.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  loading = true;
  entries: {};
  goals: Goal[];
  streak: Streak;
  record: number;
  expanded: Goal[] = [];

  constructor(
    private storeService: StoreService, 
    private alertController: AlertController,
    private translateService: TranslateService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.translateService.use("en");
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async addGoal() {
    this.editGoal();
  }

  async editGoal(goal? : Goal) {
    const modal = await this.modalController.create({
      component: EditGoalComponent,
      componentProps: {
        goal: goal
      }
    });
    await modal.present();

    await modal.onWillDismiss();
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

  async showOption(goal: Goal) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('dashboard.options.header'),
      buttons: [{
        text: this.translateService.instant('dashboard.options.edit'),
        role: 'destructive',
        icon: 'create-outline',
        handler: () => {
          this.editGoal(goal);
        }
      },{
        text: this.translateService.instant('dashboard.options.delete'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteGoal(goal);
        }
      }]
    });
    await actionSheet.present();
  }


  async deleteGoal(goal: Goal) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('dashboard.delete.header'),
      message: this.translateService.instant('dashboard.delete.message'),
      buttons: [
        {
          text: this.translateService.instant('dashboard.delete.no'),
          role: 'cancel',
        }, {
          text: this.translateService.instant('dashboard.delete.yes'),
          handler: async () => {
            await this.storeService.deleteGoal(goal);
            this.loadData();
          }
        }
      ]
    });
    await alert.present();
  }

  async addDiaryEntry(goal: Goal) {
    const alert = await this.alertController.create({
      header: 'Add Entry',
      message: `Have you done some ${goal.activityName} today?`,
      buttons: [
        {
          text: 'No 😔',
          role: 'cancel',
        }, {
          text: 'Yes 😊',
          handler: async () => {
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
    this.loading = true;
    this.goals = await this.storeService.getGoals();
    this.entries = await this.storeService.getGroupedEntries();  
    this.streak = await this.storeService.getStreak();   
    this.record = await this.storeService.getRecord();   
    this.loading = false;
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
