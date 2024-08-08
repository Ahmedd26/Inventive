import { Component, effect, HostBinding, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsModule } from './icons/icons.module';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'inventory_management_system';

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }
  ngOnInit(): void {
    initFlowbite();
  }
}
