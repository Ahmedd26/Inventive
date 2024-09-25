import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { LoginRegisterGuard } from './core/auth/guard/login-register.guard';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { ShowSupplierComponent } from './features/suppliers/show-supplier/show-supplier.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';

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
    title: 'Inventive',
    component: LandingPageComponent,
    pathMatch: 'full',
    canActivate: [LoginRegisterGuard],
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers',
    title: 'Suppliers',
    component: SuppliersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers/:id',
    title: 'Supplier',
    component: ShowSupplierComponent,
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
