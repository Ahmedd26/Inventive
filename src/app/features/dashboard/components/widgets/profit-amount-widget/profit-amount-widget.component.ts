import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profit-amount-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profit-amount-widget.component.html',
})
export class ProfitAmountWidgetComponent {
  @Input({ required: true }) value!: number | string;
}
