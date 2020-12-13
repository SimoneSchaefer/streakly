import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddActivityPageRoutingModule } from './add-activity-routing.module';

import { AddActivityPage } from './add-activity.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddActivityPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [AddActivityPage]
})
export class AddActivityPageModule {}
