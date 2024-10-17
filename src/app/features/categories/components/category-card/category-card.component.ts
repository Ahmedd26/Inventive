import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../categories.model';
import { CategoryProductComponent } from '../category-product/category-product.component';
import { UpdateCategoryModalComponent } from '../update-category-modal/update-category-modal.component';
import { DeleteCategoryModalComponent } from '../delete-category-modal/delete-category-modal.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    CategoryProductComponent,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
  ],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: ICategory;
  @Output() deletedCategoryId = new EventEmitter();
  updateCategory(category: ICategory) {
    this.category = { ...this.category, ...category };
  }

  removeCategory(id: number | string) {
    this.deletedCategoryId.emit(id);
  }
}
