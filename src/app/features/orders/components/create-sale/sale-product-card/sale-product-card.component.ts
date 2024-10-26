import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IProduct,
  ProductWarehouse,
} from '../../../../products/products.model';
import { ISelectedProduct } from '../../create-purchase/purchase-product-card/purchase-product-card.component';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sale-product-card',
  standalone: true,
  imports: [IconsModule, CommonModule, RouterLink],
  templateUrl: './sale-product-card.component.html',
})
export class SaleProductCardComponent {
  @Input({ required: true }) product!: IProduct;
  @Output() selectedProduct = new EventEmitter<ISelectedProduct>();
  @Output() dismissProduct = new EventEmitter<number>();
  selectedQuantity = 0;
  confirmed = false;
  selectedProductWarehouse!: ProductWarehouse;

  increment() {
    if (this.selectedProductWarehouse.quantity > this.selectedQuantity) {
      this.selectedQuantity++;
    }
  }
  decrement() {
    if (this.selectedQuantity > 0) {
      this.selectedQuantity--;
    }
  }

  onWarehouseSectionSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const sectionId = target.value;
    const productWarehouse = this.product.product_warehouse.find(
      (warehouse) => warehouse.id === +sectionId,
    );
    if (productWarehouse) {
      this.selectedProductWarehouse = productWarehouse;
    }
  }

  changeQuantity(event: Event) {
    const target = event.target as HTMLInputElement;
    const quantity = target.value;
    const regex = /^\d+$/;

    if (regex.test(quantity)) {
      if (this.selectedProductWarehouse.quantity > this.selectedQuantity) {
        this.selectedQuantity = +quantity;
      } else {
        this.selectedQuantity = 0;
      }
    } else {
      target.value = '0';
    }
  }
  confirm() {
    this.confirmed = true;
    if (this.product.id && this.selectedProductWarehouse.warehouse_section_id) {
      this.selectedProduct.emit({
        product_id: this.product.id,
        price: this.product.price,
        quantity: this.selectedQuantity,
        warehouse_section_id:
          this.selectedProductWarehouse.warehouse_section_id,
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
