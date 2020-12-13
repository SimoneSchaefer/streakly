import { Component, OnInit } from '@angular/core';
import { Goal } from '../models/goal';
import { Activity } from '../models/activity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoreService } from '../store.service';
import { DiaryEntry } from '../models/diary-entry';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-track-activity',
  templateUrl: './track-activity.page.html',
  styleUrls: ['./track-activity.page.scss'],
})
export class TrackActivityPage implements OnInit, ViewWillEnter {
  activities: Activity[];
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      activity: new FormControl(null, Validators.required),
    });
  }


  ionViewWillEnter() {
    this.loadData();
  }

  saveActivity() {
    const diaryEntry = new DiaryEntry();
    diaryEntry.activityId = this.activity.value.id;
    diaryEntry.date = Date.now();
    this.storeService.addDiaryEntry(diaryEntry).then(_ => {
      this.router.navigate(['/dashboard']);
    });
  }

  async loadData() {
    this.activities = await this.storeService.getActivities();
    this.activity.setValidators([
      Validators.required
    ]);   
  }

  private get activity() {
    return this.form.controls['activity'];
  }

}
