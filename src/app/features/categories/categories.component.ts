import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { type ICategory } from './categories.model';
import { CategoryProductComponent } from './components/category-product/category-product.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    LoadingComponent,
    NotFoundComponent,
    CategoryProductComponent,
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories!: ICategory[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesService.getAll().subscribe({
      next: (categories) => {
        this.isLoading = false;
        this.categories = categories;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      },
    });
  }
}
