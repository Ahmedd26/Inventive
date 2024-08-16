import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  // Computed signal to determine the current mode
  isDarkMode = computed(() => this.darkMode());

  constructor() {
    // Update localStorage whenever darkMode changes
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }

  getCurrentMode(): boolean {
    return this.darkMode();
  }
}
