import { Component, Input } from '@angular/core';
import { IFaq } from '../faqs-section.component';

@Component({
  selector: 'app-accordion-tab',
  standalone: true,
  imports: [],
  templateUrl: './accordion-tab.component.html',
})
export class AccordionTabComponent {
  @Input({ required: true }) FAQtab!: IFaq;
}
