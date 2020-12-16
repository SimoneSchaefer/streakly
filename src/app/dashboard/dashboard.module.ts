import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { StreakCountComponent } from './streak-count/streak-count.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DashboardPageRoutingModule
  ],
  declarations: [
    DashboardPage,
    StreakCountComponent,
    EditGoalComponent
  ]
})
export class DashboardPageModule {}
