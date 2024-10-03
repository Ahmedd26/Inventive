import { Component, Input } from '@angular/core';
import { type IAdjustment } from '../../../../products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-adjustment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-adjustment.component.html',
})
export class ProductAdjustmentComponent {
  @Input({ required: true }) adjustments!: IAdjustment[];
}
