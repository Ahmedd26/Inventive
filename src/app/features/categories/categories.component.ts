import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { type ICategory } from './categories.model';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { CreateCategoryModalComponent } from './components/create-category-modal/create-category-modal.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    LoadingComponent,
    NotFoundComponent,
    CategoryProductComponent,
    CreateCategoryModalComponent,
    PaginationComponent,
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
    this.categories.push(category);
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
