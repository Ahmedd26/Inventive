import { Component, Input } from '@angular/core';

export interface IPerson {
  name: string;
  position: string;
  image: string;
}

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [],
  templateUrl: './person-card.component.html',
})
export class PersonCardComponent {
  @Input({ required: true }) person!: IPerson;
}
