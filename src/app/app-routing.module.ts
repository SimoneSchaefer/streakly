import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'add-activity',
    loadChildren: () => import('./add-activity/add-activity.module').then( m => m.AddActivityPageModule)
  },
  {
    path: 'manage-activities',
    loadChildren: () => import('./manage-activities/manage-activities.module').then( m => m.ManageActivitiesPageModule)
  },
  {
    path: 'edit-goal',
    loadChildren: () => import('./edit-goal/edit-goal.module').then( m => m.EditGoalPageModule)
  },
  {
    path: 'track-activity',
    loadChildren: () => import('./track-activity/track-activity.module').then( m => m.TrackActivityPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
