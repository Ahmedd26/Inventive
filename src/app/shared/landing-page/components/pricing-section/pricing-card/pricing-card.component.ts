import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface IPricing {
  title: string;
  description: string;
  price: number;
  currency?: string; // Optional property for currency symbol
  features: string[];
}
@Component({
  selector: 'landing-pricing-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './pricing-card.component.html',
})
export class PricingCardComponent {
  @Input({ required: true }) pricing!: IPricing;
}
