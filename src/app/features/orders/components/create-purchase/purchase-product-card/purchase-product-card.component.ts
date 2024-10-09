import { RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../../products/products.model';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { CommonModule } from '@angular/common';

export interface ISelectedProduct {
  product_id: number;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-purchase-product-card',
  standalone: true,
  imports: [IconsModule, CommonModule, RouterLink],
  templateUrl: './purchase-product-card.component.html',
})
export class PurchaseProductCardComponent {
  @Input({ required: true }) product!: IProduct;
  @Output() selectedProduct = new EventEmitter<ISelectedProduct>();
  @Output() dismissProduct = new EventEmitter<number>();
  selectedQuantity = 0;
  confirmed = false;

  increment() {
    this.selectedQuantity++;
  }
  decrement() {
    if (this.selectedQuantity > 0) {
      this.selectedQuantity--;
    }
  }
  changeQuantity(event: Event) {
    const target = event.target as HTMLInputElement;
    const quantity = target.value;
    const regex = /^\d+$/;

    if (regex.test(quantity)) {
      this.selectedQuantity = +quantity;
    } else {
      target.value = '';
    }
  }
  confirm() {
    this.confirmed = true;
    if (this.product.id) {
      this.selectedProduct.emit({
        product_id: this.product.id,
        price: this.product.price,
        quantity: this.selectedQuantity,
      });
    }
  }

  dismiss() {
    this.confirmed = false;
    this.selectedQuantity = 0;
    if (this.product.id) {
      this.dismissProduct.emit(this.product.id);
    }
  }
}
