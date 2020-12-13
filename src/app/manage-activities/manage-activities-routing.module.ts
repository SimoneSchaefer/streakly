import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageActivitiesPage } from './manage-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ManageActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageActivitiesPageRoutingModule {}
