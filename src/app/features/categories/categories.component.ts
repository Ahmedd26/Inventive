import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { CreateCategoryModalComponent } from './components/create-category-modal/create-category-modal.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoriesService } from './categories.service';
import { type ICategory } from './categories.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    LoadingComponent,
    NotFoundComponent,
    CreateCategoryModalComponent,
    PaginationComponent,
    CategoryCardComponent,
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories!: ICategory[];

  constructor(private categoriesService: CategoriesService) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedCategories: ICategory[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  updatePaginatedCategories(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedCategories(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  addNewCategory(category: ICategory) {
    this.categories.unshift(category);
    this.updatePaginatedCategories(1);
  }
  removeCategory(id: number | string) {
    this.categories = this.categories.filter((category) => category.id !== id);
    this.updatePaginatedCategories(1);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesService.getAll().subscribe({
      next: (categories) => {
        this.isLoading = false;
        this.categories = categories;
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = this.categories.length;
        this.updatePaginatedCategories(1);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      },
    });
  }
}
