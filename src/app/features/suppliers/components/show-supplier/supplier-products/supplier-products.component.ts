import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../products/products.model';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-products',
  standalone: true,
  imports: [CommonModule,IconsModule,RouterLink],
  templateUrl: './supplier-products.component.html',
})
export class SupplierProductsComponent {
  @Input({ required: true }) products!: IProduct[];
}
