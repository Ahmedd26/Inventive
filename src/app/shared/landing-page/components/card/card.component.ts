import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';

export interface ICard {
  heading: string;
  body: string;
  iconName: string;
}
@Component({
  selector: 'landing-page-card',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input({ required: true }) card!: ICard;
}
