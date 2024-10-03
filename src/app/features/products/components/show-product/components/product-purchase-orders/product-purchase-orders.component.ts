import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type IProductPurchaseOrders } from '../../../../products.model';

@Component({
  selector: 'app-product-purchase-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-purchase-orders.component.html',
})
export class ProductPurchaseOrdersComponent {
  @Input({ required: true }) purchaseOrders!: IProductPurchaseOrders[];
}
