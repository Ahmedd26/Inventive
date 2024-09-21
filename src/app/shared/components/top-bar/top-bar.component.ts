import { Component } from '@angular/core';
import { ToggleDarkLightComponent } from './components/toggle-dark-light/toggle-dark-light.component';
import { LogoutComponent } from './components/logout/logout.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ToggleDarkLightComponent, LogoutComponent],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {}
