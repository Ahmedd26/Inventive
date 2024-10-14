import { Component } from '@angular/core';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopSellingProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
