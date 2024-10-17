import { CategoriesService } from './../../categories.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-category-modal',
  standalone: true,
  imports: [CustomModalComponent],
  templateUrl: './delete-category-modal.component.html',
})
export class DeleteCategoryModalComponent {
  @Input({ required: true }) id!: number | string;
  @ViewChild('deleteModal') deleteModal!: CustomModalComponent;
  error = '';
  @Output() deletedId = new EventEmitter<number | string>();

  constructor(private categoriesService: CategoriesService) {}

  delete() {
    this.categoriesService.delete(this.id).subscribe({
      next: () => {
        this.deletedId.emit(this.id);
        this.deleteModal.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.message;
      },
    });
  }
}
