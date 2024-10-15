import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTypeSvgComponent } from '../../section-type-svg/section-type-svg.component';
import { ISection } from '../../../warehouse.model';

@Component({
  selector: 'app-warehouse-section-card',
  standalone: true,
  imports: [RouterLink, SectionTypeSvgComponent],
  templateUrl: './warehouse-section-card.component.html',
})
export class WarehouseSectionCardComponent {
  @Input({ required: true }) section!: ISection;
}
