import { Component } from '@angular/core';
import { AccordionTabComponent } from './accordion-tab/accordion-tab.component';

export interface IFaq {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faqs-section',
  standalone: true,
  imports: [AccordionTabComponent],
  templateUrl: './faqs-section.component.html',
})
export class FAQsSectionComponent {
  faqs: IFaq[] = [
    {
      id: 1,
      question: 'What is Inventive?',
      answer:
        'Inventive is a comprehensive inventory management software designed to streamline your operations and improve efficiency.',
    },
    {
      id: 2,
      question: 'How does Inventive work?',
      answer:
        'Inventive provides real-time tracking, automated reordering, and powerful analytics to help you manage your inventory effectively.',
    },
    {
      id: 3,
      question: 'What are the benefits of using Inventive?',
      answer:
        'Inventive helps you reduce costs, improve accuracy, enhance decision-making, and increase customer satisfaction.',
    },
    {
      id: 4,
      question: 'How much does Inventive cost?',
      answer:
        'We offer flexible pricing plans to suit your business needs. Please visit our pricing page for more information.',
    },
    {
      id: 5,
      question: 'How can I get started with Inventive?',
      answer:
        'Simply sign up for a free trial or contact our sales team to learn more.',
    },
  ];
}
