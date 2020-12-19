import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Goal } from '../../models/goal';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
})
export class EditGoalComponent implements OnInit {
  @Input() goal: Goal;
  goals: Goal[];
  form: FormGroup;

  constructor(
    private storeService: StoreService, 
    private formBuilder: FormBuilder, 
    private modalController: ModalController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      activity: new FormControl(!!this.goal ? this.goal.activityName : '', Validators.required),
      number: new FormControl(!!this.goal ? this.goal.timesPerWeek : '', Validators.required)
    });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async loadData() {
    this.goals = await this.storeService.getGoals();
    this.activity.setValidators([
      Validators.required,
      alreadyTakenValidator(this.goals, this.goal)
    ]);  
  }

  saveGoal() {
    const goal = this.goal || new Goal();
    goal.activityName = this.activity.value;
    goal.timesPerWeek = this.times.value;
    this.storeService.saveGoal(goal).then(_goals => {
      this.dismiss();
    });
  }

  get translationPrefix (){
    return `dashboard.${!!this.goal ? 'edit' : 'add'}.`;
  }

  private get activity() {
    return this.form.controls['activity'];
  }
  private get times() {
    return this.form.controls['number'];
  }
}

export function alreadyTakenValidator(goals: Goal[], currentGoal: Goal): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = goals.find(goal => goal.activityName === control.value);
    if (currentGoal && currentGoal.activityName === control.value) {
      return null;
    }
    return forbidden ? {conflict: { value: control.value} } : null;
  };
}
