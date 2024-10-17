import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ICategory } from '../../categories.model';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { CategoriesService } from '../../categories.service';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [FormsModule, CustomModalComponent],
  templateUrl: './create-category-modal.component.html',
})
export class CreateCategoryModalComponent {
  @Output() newCategory = new EventEmitter<ICategory>();
  @ViewChild('createCategoryModal') createCategoryModal!: CustomModalComponent;
  backendErrorMessages = '';
  frontEndErrorMessages = '';
  constructor(private categoryService: CategoriesService) {}

  create(form: NgForm) {
    if (form.valid) {
      this.categoryService.create(form.value).subscribe({
        next: (res) => {
          this.newCategory.emit(res);
          this.createCategoryModal.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.backendErrorMessages = error.error.message;
        },
      });
    } else {
      this.frontEndErrorMessages = 'Category name is required';
    }
  }
}
