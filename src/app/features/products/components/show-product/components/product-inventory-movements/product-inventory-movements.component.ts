import { Component, Input } from '@angular/core';
import { IInventoryMovement } from '../../../../products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-inventory-movements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-inventory-movements.component.html',
})
export class ProductInventoryMovementsComponent {
  @Input({ required: true }) movements!: IInventoryMovement[];
}
