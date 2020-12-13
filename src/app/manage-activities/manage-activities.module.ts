import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageActivitiesPageRoutingModule } from './manage-activities-routing.module';

import { ManageActivitiesPage } from './manage-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageActivitiesPageRoutingModule
  ],
  declarations: [ManageActivitiesPage]
})
export class ManageActivitiesPageModule {}
