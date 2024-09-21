import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [],
  templateUrl: './error-toast.component.html',
})
export class ErrorToastComponent {
  @Input() errorMessage!: string;
  @Output() resetString = new EventEmitter<void>();
  reset() {
    this.resetString.emit();
  }
}
