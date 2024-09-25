import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './delete-pop-up.component.html',
})
export class DeletePopUpComponent {
  @Input({ required: true }) id!: number;
  @Output() deleteItem = new EventEmitter<number>();

  onConfirmDeletion() {
    this.deleteItem.emit(this.id);
  }
}
