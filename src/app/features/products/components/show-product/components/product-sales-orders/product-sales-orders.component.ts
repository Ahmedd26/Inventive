import { Component, Input, OnInit } from '@angular/core';
import { IProductSalesOrder } from '../../../../products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-sales-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-sales-orders.component.html',
})
export class ProductSalesOrdersComponent {
  @Input({ required: true }) salesOrders!: IProductSalesOrder[];
}
