// Import the necessary Angular decorators and functions
import { Injectable } from '@angular/core';
import { signal, computed, effect } from '@angular/core';

// Decorate the DarkModeService class with the Injectable decorator
// This allows Angular to inject instances of this service into components
@Injectable({ providedIn: 'root' })

// Define the DarkModeService class
export class DarkModeService {
  // Create a private signal property named 'darkMode'
  // This is used to hold the current state of the dark mode toggle
  private darkMode = signal<boolean>(
    // Parse the value of the 'darkMode' key in the localStorage object
    // If the key does not exist, default to false
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  // Create a computed property named 'isDarkMode'
  // This property returns the current state of the dark mode toggle
  // The value of this property is computed based on the 'darkMode' signal
  isDarkMode = computed(() => this.darkMode());

  // Define the constructor method
  constructor() {
    // Create an effect that runs whenever the 'darkMode' signal changes
    // This effect updates the value of the 'darkMode' key in the localStorage object
    effect(() => {
      // Convert the current state of the 'darkMode' signal to a string
      // This is necessary because the localStorage object can only store strings
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  // Define the toggleDarkMode method
  // This method toggles the state of the dark mode toggle
  toggleDarkMode() {
    // Update the value of the 'darkMode' signal to the opposite of its current value
    this.darkMode.set(!this.darkMode());
  }

  // Define the getCurrentMode method
  // This method returns the current state of the dark mode toggle
  // The value of this method is computed based on the 'darkMode' signal
  getCurrentMode(): boolean {
    return this.darkMode();
  }
}
