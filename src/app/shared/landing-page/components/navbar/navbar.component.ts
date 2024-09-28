import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleDarkLightComponent } from '../../../components/top-bar/components/toggle-dark-light/toggle-dark-light.component';
import { ScrollService } from '../../../../core/services/scroll-service/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ToggleDarkLightComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToFragment(section);
  }
}
