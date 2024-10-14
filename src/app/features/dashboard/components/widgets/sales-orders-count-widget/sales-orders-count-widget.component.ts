import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sales-orders-count-widget',
  standalone: true,
  imports: [],
  templateUrl: './sales-orders-count-widget.component.html',
})
export class SalesOrdersCountWidgetComponent {
  @Input({ required: true }) value!: number | string;
}
