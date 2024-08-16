import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent,
  },

  {
    path: '**',
    title: 'Not found',
    component: DashboardComponent,
  },
];
