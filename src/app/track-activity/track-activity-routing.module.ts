import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackActivityPage } from './track-activity.page';

const routes: Routes = [
  {
    path: '',
    component: TrackActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackActivityPageRoutingModule {}
