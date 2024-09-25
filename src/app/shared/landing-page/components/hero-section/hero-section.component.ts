import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgBgComponent } from './svg-bg/svg-bg.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, SvgBgComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {}
