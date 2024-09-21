import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { LoginRegisterGuard } from './core/auth/guard/login-register.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginRegisterGuard],
  },

  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [LoginRegisterGuard],
  },

  {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    title: 'Not found',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];
