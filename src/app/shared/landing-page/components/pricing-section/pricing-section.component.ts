import { Component } from '@angular/core';
import {
  IPricing,
  PricingCardComponent,
} from './pricing-card/pricing-card.component';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [PricingCardComponent],
  templateUrl: './pricing-section.component.html',
})
export class PricingSectionComponent {
  pricingCards: IPricing[] = [
    {
      title: 'Starter',
      description: 'Perfect for small businesses and individual users.',
      price: 97,
      currency: '$',
      features: [
        'Real-time inventory tracking',
        'Purchase order management',
        'Basic reporting and analytics',
        'Limited user access',
        'Standard support',
      ],
    },
    {
      title: 'Company',
      description:
        'Ideal for existing organizations that need to keep better tracking of their inventory.',
      price: 249,
      currency: '$',
      features: [
        'Everything in Starter',
        'Multiple user access',
        'Advanced reporting and analytics',
        'Priority support',
        'Integration with popular business tools',
      ],
    },
    {
      title: 'Enterprise',
      description: 'Designed for large organizations with complex workflows.',
      price: 499,
      currency: '$',
      features: [
        'Everything in Company',
        'Customizable workflows and integrations',
        'Dedicated account manager',
        'Advanced security features',
        'Priority support with guaranteed response times',
      ],
    },
  ];
}
