import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { LinkComponent } from './components/link/link.component';
import { links, quickLinks } from './side-bar.constants';
import { type ILink } from './sidebar.model';
import { LinkTooltipComponent } from './components/link-tooltip/link-tooltip.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [IconsModule, LinkComponent, LinkTooltipComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  links: ILink[] = links;
  quickLinks: ILink[] = quickLinks;
}
