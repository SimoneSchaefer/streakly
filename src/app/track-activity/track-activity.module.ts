import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackActivityPageRoutingModule } from './track-activity-routing.module';

import { TrackActivityPage } from './track-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TrackActivityPageRoutingModule
  ],
  declarations: [TrackActivityPage]
})
export class TrackActivityPageModule {}
