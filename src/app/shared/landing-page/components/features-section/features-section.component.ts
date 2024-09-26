import { Component } from '@angular/core';
import { CardComponent, ICard } from './card/card.component';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './features-section.component.html',
})
export class FeaturesSectionComponent {
  featureCards: ICard[] = [
    {
      heading: 'Real-Time Tracking',
      body: 'Stay informed about your inventory levels at all times. Inventive provides real-time tracking, enabling you to make data-driven decisions and avoid stockouts.',
      iconName: 'clock',
    },
    {
      heading: 'Automated Reordering',
      body: 'Let Inventive handle the replenishment process. Our automated reordering system ensures you always have the right products on hand to meet customer demand.',
      iconName: 'refresh-cw',
    },
    {
      heading: 'Supplier Management',
      body: 'Streamline your relationships with suppliers. Inventive provides tools for managing supplier information, purchase orders, and invoices, saving you time and effort.',
      iconName: 'users',
    },
    {
      heading: 'Purchase Order Management',
      body: 'Create, track, and manage purchase orders efficiently. Inventive simplifies the procurement process, reducing errors and improving accuracy.',
      iconName: 'file-text',
    },
    {
      heading: 'Inventory Valuation',
      body: 'Gain insights into the value of your inventory. Inventive provides accurate valuation methods, helping you assess your financial health and make informed decisions.',
      iconName: 'dollar-sign',
    },
    {
      heading: 'Reporting and Analytics',
      body: 'Get a comprehensive view of your inventory performance. Inventive offers customizable reports and analytics to help you identify trends, optimize operations, and make data-driven decisions.',
      iconName: 'pie-chart',
    },
    {
      heading: 'Product Tracking',
      body: 'Track products from receipt to shipment, ensuring accuracy and efficiency.',
      iconName: 'tag',
    },
    {
      heading: 'Lot Tracking',
      body: 'Trace products back to their specific lots for quality control and recall purposes.',
      iconName: 'layers',
    },
    {
      heading: 'Mobile Access',
      body: 'Access your inventory data from anywhere with our user-friendly mobile app.',
      iconName: 'smartphone',
    },
  ];
}
