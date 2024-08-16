import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    title: 'Not found',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];
