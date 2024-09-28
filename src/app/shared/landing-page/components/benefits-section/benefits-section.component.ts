import { Component } from '@angular/core';
import { CardComponent, ICard } from '../card/card.component';
import { ScrollService } from '../../../../core/services/scroll-service/scroll.service';

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './benefits-section.component.html',
})
export class BenefitsSectionComponent {
  benefitCards: ICard[] = [
    {
      heading: 'Increased Efficiency',
      body: "Streamline your operations, reduce errors, and save time with Inventive's automated processes and intuitive interface.",
      iconName: 'battery-charging',
    },
    {
      heading: 'Cost Savings',
      body: "Optimize your inventory levels, reduce waste, and minimize costs with Inventive's data-driven insights.",
      iconName: 'dollar-sign',
    },
    {
      heading: 'Improved Decision-Making',
      body: 'Make informed decisions based on real-time data and analytics provided by Inventive.',
      iconName: 'pie-chart',
    },
    {
      heading: 'Enhanced Customer Satisfaction',
      body: 'Meet customer demand consistently by avoiding stockouts and ensuring timely deliveries with Inventive.',
      iconName: 'smile',
    },
    {
      heading: 'Scalability',
      body: 'Inventive grows with your business. Our scalable solution can handle your inventory needs, regardless of your company size.',
      iconName: 'maximize-2',
    },
    {
      heading: 'Strong Support',
      body: 'Benefit from our dedicated support team, available to assist you with any questions or issues.',
      iconName: 'phone',
    },
  ];
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToFragment(section);
  }
}
