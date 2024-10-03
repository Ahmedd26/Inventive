import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'custom-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-modal.component.html',
})
export class CustomModalComponent {
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) buttonClasses!: string;
  @Input({ required: true }) modalHeader!: string;
  @Input({ required: true }) acceptButtonText!: string;
  @Input() declineButtonText!: string;

  @Output() accept = new EventEmitter();

  isOpened: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }

  acceptClicked() {
    this.accept.emit();
  }
  declineClicked() {
    this.closeModal();
  }
}
