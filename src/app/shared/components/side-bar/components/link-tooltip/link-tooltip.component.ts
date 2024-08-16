import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IconsModule } from '../../../../icons/icons.module';
import { type ILink } from '../../sidebar.model';

@Component({
  selector: 'app-link-tooltip',
  standalone: true,
  imports: [IconsModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './link-tooltip.component.html',
})
export class LinkTooltipComponent {
  @Input({ required: true }) quickLink!: ILink;
  tooltipId!: string;
  ngOnInit() {
    this.tooltipId = this.quickLink.title + '-' + this.quickLink.iconName;
  }
}
