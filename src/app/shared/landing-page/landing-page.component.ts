import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, HeroSectionComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
