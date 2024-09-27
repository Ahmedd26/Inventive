import { Component } from '@angular/core';
import {
  type IPerson,
  PersonCardComponent,
} from './person-card/person-card.component';

@Component({
  selector: 'app-about-us-section',
  standalone: true,
  imports: [PersonCardComponent],
  templateUrl: './about-us-section.component.html',
})
export class AboutUsSectionComponent {
  teamMembers: IPerson[] = [
    {
      name: 'John Doe',
      position: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
    },
    {
      name: 'Jane Smith',
      position: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/women/87.jpg',
    },
    {
      name: 'Michael Johnson',
      position: 'Head of Customer Success',
      image: 'https://randomuser.me/api/portraits/men/88.jpg',
    },
    {
      name: 'Emily Davis',
      position: 'Sales Manager',
      image: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
  ];
}
