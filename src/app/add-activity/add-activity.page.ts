import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Activity } from '../models/activity';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
//TODO: Rename: EditActivity
export class AddActivityPage implements OnInit, ViewWillEnter {
  form: FormGroup;
  private activities: Activity[] = [] ;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, alreadyExistsValidator(this.activities)]),
      'description': new FormControl('')
    })
  }

  ionViewWillEnter() {
    this.storeService.getActivities().then(activities => {
      this.activities = activities;
      this.form.controls['name'].setValidators([
        Validators.required,
        alreadyExistsValidator(this.activities)
      ]);
    });   
  }

  saveActivity() {
    const activity = new Activity();
    activity.name = this.form.controls['name'].value;
    activity.description = this.form.controls['description'].value;
-
    this.storeService.addActivity(activity).then(() => {
      this.router.navigate(['/manage-activities']);
    });
  }

  
}

export function alreadyExistsValidator(activities: Activity[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = activities.find(act => act.name === control.value.trim());
    console.log('AUTSCH!', activities, control.value, forbidden);
    return forbidden ? {conflict: { value: control.value} } : null;
  };
}