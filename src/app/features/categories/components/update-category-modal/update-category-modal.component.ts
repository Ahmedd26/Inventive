import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ICategory } from '../../categories.model';
import { CategoriesService } from '../../categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule],
  templateUrl: './update-category-modal.component.html',
  styleUrl: './update-category-modal.component.css',
})
export class UpdateCategoryModalComponent implements OnInit {
  @Input({ required: true }) id!: number;
  @ViewChild('updateCategoryModal') updateCategoryModal!: CustomModalComponent;
  @Output() updatedCategory = new EventEmitter<ICategory>();
  category!: ICategory;
  backendErrorMessages = '';
  frontEndErrorMessages = '';

  constructor(private categoryService: CategoriesService) {}

  update(form: NgForm) {
    if (form.valid) {
      this.categoryService.update(this.id, form.value).subscribe({
        next: (res) => {
          this.updatedCategory.emit(res);
          this.updateCategoryModal.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.backendErrorMessages = error.error.message;
        },
      });
    } else {
      this.frontEndErrorMessages = 'Category name is required';
    }
  }

  ngOnInit(): void {
    this.categoryService.get(this.id).subscribe({
      next: (category) => {
        this.category = category;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
