import { Component } from '@angular/core';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopSellingProductsComponent, SalesChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
