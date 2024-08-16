import { Component, computed } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { DarkModeService } from '../../../../../core/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-toggle-dark-light',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './toggle-dark-light.component.html',
})
export class ToggleDarkLightComponent {
  currentIcon = computed(() =>
    this.darkModeService.getCurrentMode() ? 'sun' : 'moon'
  );

  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
