import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-count-widget',
  standalone: true,
  imports: [],
  templateUrl: './product-count-widget.component.html',
})
export class ProductCountWidgetComponent {
  @Input({ required: true }) value!: number | string;
}
