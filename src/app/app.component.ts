import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { BodyContainerComponent } from './shared/components/body-container/body-container.component';
import { DarkModeService } from './core/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    TopBarComponent,
    BodyContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'inventory_management_system';

  constructor(private darkModeService: DarkModeService) {}

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.getCurrentMode();
  }
  ngOnInit(): void {
    initFlowbite();
  }
}
