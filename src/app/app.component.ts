import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsModule } from './icons/icons.module';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'inventory_management_system';

  ngOnInit(): void {
    initFlowbite();
  }
}
