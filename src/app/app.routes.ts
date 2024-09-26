import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { LoginRegisterGuard } from './core/auth/guard/login-register.guard';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';

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
    path: 'suppliers',
    title: 'Suppliers',
    component: SuppliersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    title: 'Categories',
    component: CategoriesComponent,
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
