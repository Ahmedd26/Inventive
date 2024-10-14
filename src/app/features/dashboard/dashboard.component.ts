import { chartsService } from './charts.service';
import { Component, OnInit } from '@angular/core';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';
import { ProfitAmountWidgetComponent } from './components/widgets/profit-amount-widget/profit-amount-widget.component';
import { SalesOrdersCountWidgetComponent } from './components/widgets/sales-orders-count-widget/sales-orders-count-widget.component';
import { ProductCountWidgetComponent } from './components/widgets/product-count-widget/product-count-widget.component';
import { CategoriesCountWidgetComponent } from "./components/widgets/categories-count-widget/categories-count-widget.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TopSellingProductsComponent,
    SalesChartComponent,
    ProfitAmountWidgetComponent,
    SalesOrdersCountWidgetComponent,
    ProductCountWidgetComponent,
    CategoriesCountWidgetComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  widgetsData!: IWidgets;
  constructor(private chartsService: chartsService) {}

  ngOnInit(): void {
    this.chartsService.widgets().subscribe({
      next: (res) => {
        this.widgetsData = res as IWidgets;
      },
    });
  }
}

export interface IWidgets {
  products: IProducts;
  sales: ISales;
  profit: IProfit;
  categories: ICategories;
}

export interface IProducts {
  name: string;
  value: number;
}

export interface ISales {
  name: string;
  value: number;
}

export interface IProfit {
  name: string;
  value: number;
}

export interface ICategories {
  name: string;
  value: number;
}
