import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Activity } from '../models/activity';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.page.html',
  styleUrls: ['./manage-activities.page.scss'],
})
export class ManageActivitiesPage implements OnInit {
  activities: Activity[];

  constructor(private storeService: StoreService) { }

  ngOnInit() {}

  loadData() {
    this.storeService.getActivities().then(activities => {
      this.activities = activities;
    });
  }

  ionViewWillEnter() {
   this.loadData();
  }

  deleteActivity(activity: Activity) {
    this.storeService.deleteActivity(activity).then(activities => {
      this.activities = activities;
    });
  }

}
