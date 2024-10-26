import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type IProductPurchaseOrders } from '../../../../products.model';

@Component({
  selector: 'app-product-purchase-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-purchase-orders.component.html',
})
export class ProductPurchaseOrdersComponent implements OnInit {
  @Input({ required: true }) purchaseOrders!: IProductPurchaseOrders[];

  ngOnInit() {
    if (this.purchaseOrders) {
      this.purchaseOrders = this.purchaseOrders.reverse();
    }
  }
}
