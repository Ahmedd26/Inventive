import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../products/products.model';

@Component({
  selector: 'app-supplier-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-products.component.html',
})
export class SupplierProductsComponent {
  @Input({ required: true }) products!: IProduct[];
}
