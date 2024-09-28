import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgBgComponent } from './svg-bg/svg-bg.component';
import { ScrollService } from '../../../../core/services/scroll-service/scroll.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, SvgBgComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToFragment(section);
  }
}
