import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity';
import { StoreService } from '../store.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Goal } from '../models/goal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.page.html',
  styleUrls: ['./edit-goal.page.scss'],
})
export class EditGoalPage implements OnInit {
  activities: Activity[];
  goals: Goal[];
  form: FormGroup;


  constructor(
    private storeService: StoreService, 
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      activity: new FormControl(null, Validators.required),
      number: new FormControl('', Validators.required)
    });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    this.activities = await this.storeService.getActivities();
    this.goals = await this.storeService.getGoals();
    this.activity.setValidators([
      Validators.required,
      alreadyTakenValidator(this.goals)
    ]);   
  }

  saveGoal() {
    const goal = new Goal();
    goal.activityId = this.activity.value.id;
    goal.timesPerWeek = this.times.value;
    this.storeService.addGoal(goal).then(_goals => {
      this.router.navigate(['/goals']);
    });
  }

  private get activity() {
    return this.form.controls['activity'];
  }
  private get times() {
    return this.form.controls['number'];
  }
}

export function alreadyTakenValidator(goals: Goal[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = goals.find(goal => goal.activityId === control.value.id);
    return forbidden ? {conflict: { value: control.value} } : null;
  };
}
