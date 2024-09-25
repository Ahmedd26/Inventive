import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleDarkLightComponent } from '../../../components/top-bar/components/toggle-dark-light/toggle-dark-light.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ToggleDarkLightComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
