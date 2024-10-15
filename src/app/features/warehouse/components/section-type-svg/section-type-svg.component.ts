import { Component, Input } from '@angular/core';
import { TSectionType } from '../../warehouse.model';

@Component({
  selector: 'app-section-type-svg',
  standalone: true,
  imports: [],
  templateUrl: './section-type-svg.component.html',
})
export class SectionTypeSvgComponent {
  @Input({ required: true }) type!: TSectionType;
}
