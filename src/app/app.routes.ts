import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { LoginRegisterGuard } from './core/auth/guard/login-register.guard';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { ShowSupplierComponent } from './features/suppliers/components/show-supplier/show-supplier.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { ShowProductComponent } from './features/products/components/show-product/show-product.component';
import { UsersComponent } from './features/users/users.component';
import { SalesComponent } from './features/sales/sales.component';
import { PurchasesComponent } from './features/purchases/purchases.component';
import { CreatePurchaseComponent } from './features/orders/components/create-purchase/create-purchase.component';
import { OrdersComponent } from './features/orders/orders.component';
import { SelectOrderTypeComponent } from './features/orders/components/select-order-type/select-order-type.component';
import { ShowPurchaseOrderComponent } from './features/purchases/components/show-purchase-order/show-purchase-order.component';
import { WarehouseComponent } from './features/warehouses/warehouse/warehouse.component';
import { CreateSaleComponent } from './features/orders/components/create-sale/create-sale.component';
import { ShowSaleOrderComponent } from './features/sales/components/show-sale-order/show-sale-order.component';

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
    path: 'orders',
    title: 'Orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        title: 'select order type',
        component: SelectOrderTypeComponent,

        canActivate: [AuthGuard],
      },
      {
        path: 'create-purchase',
        title: 'Create purchase Order',
        component: CreatePurchaseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-sale',
        title: 'Create Sale Order',
        component: CreateSaleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    title: 'Product',
    component: ShowProductComponent,
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
    path: 'sales',
    title: 'Sales',
    component: SalesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'sales/:id',
    title: 'Sales',
    component: ShowSaleOrderComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'purchases',
    title: 'Purchases',
    component: PurchasesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'purchases/:id',
    title: 'Purchase',
    component: ShowPurchaseOrderComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory',
    title: 'Inventory',
    component: WarehouseComponent,
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
    path: 'users',
    title: 'Users',
    component: UsersComponent,
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
