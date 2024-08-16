import { Component } from '@angular/core';
import { ToggleDarkLightComponent } from './components/toggle-dark-light/toggle-dark-light.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ToggleDarkLightComponent],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {}
