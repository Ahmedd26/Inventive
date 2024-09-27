import { Component } from '@angular/core';

interface ITestimonial {
  testimonial: string;
  image: string;
  name: string;
  position: string;
}
@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [],
  templateUrl: './testimonials-section.component.html',
})
export class TestimonialsSectionComponent {
  testimonials: ITestimonial[] = [
    {
      testimonial:
        'Inventive has revolutionized our inventory management. The real-time tracking and automated reordering features have saved us countless hours and improved our overall efficiency. I highly recommend Inventive to any business looking to streamline their operations.',
      image: 'https://randomuser.me/api/portraits/women/80.jpg',
      name: 'Sarah Johnson',
      position: 'Inventory Manager, Acme Corporation',
    },
    {
      testimonial:
        "Before Inventive, our inventory management was a nightmare. Now, we have complete visibility into our stock levels, can easily track purchases and sales, and have significantly reduced our costs. It's been a game-changer for our business.",
      image: 'https://randomuser.me/api/portraits/men/81.jpg',
      name: 'David Lee',
      position: 'E-commerce Manager, Retail Solutions',
    },
    {
      testimonial:
        "I was skeptical at first, but Inventive has exceeded my expectations. The user-friendly interface, powerful features, and excellent customer support have made it a valuable asset to our company. I'm so glad we made the switch.",
      image: 'https://randomuser.me/api/portraits/women/82.jpg',
      name: 'Emily Brown',
      position: 'Small Business Owner, The Craft Shop',
    },
    {
      testimonial:
        "Inventive has been a lifesaver for our small business. It's helped us streamline our inventory management, reduce costs, and improve our overall efficiency. We couldn't be happier with our decision to choose Inventive.",
      image: 'https://randomuser.me/api/portraits/men/83.jpg',
      name: 'Michael Davis',
      position: 'Operations Manager, Small Business Solutions',
    },
    {
      testimonial:
        "I've tried other inventory management systems, but none have come close to Inventive. The ease of use, powerful features, and excellent support have made it the best choice for our business.",
      image: 'https://randomuser.me/api/portraits/women/84.jpg',
      name: 'Ashley Carter',
      position: 'Warehouse Manager, Global Supply Chain',
    },
    {
      testimonial:
        "Inventive has transformed the way we manage our inventory. It's helped us improve accuracy, reduce costs, and enhance our overall operations. We couldn't be more satisfied.",
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      name: 'Thomas Wilson',
      position: 'Inventory Analyst, Manufacturing Company',
    },
  ];
}
