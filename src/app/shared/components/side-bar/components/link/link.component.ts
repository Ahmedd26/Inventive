import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from '../../sidebar.model';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [IconsModule, RouterLink, RouterLinkActive],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input({ required: true }) link!: ILink;
}
