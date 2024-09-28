import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { BenefitsSectionComponent } from './components/benefits-section/benefits-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { AboutUsSectionComponent } from './components/about-us-section/about-us-section.component';
import { PricingSectionComponent } from './components/pricing-section/pricing-section.component';
import { FAQsSectionComponent } from './components/faqs-section/faqs-section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    BenefitsSectionComponent,
    TestimonialsSectionComponent,
    AboutUsSectionComponent,
    PricingSectionComponent,
    FAQsSectionComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
