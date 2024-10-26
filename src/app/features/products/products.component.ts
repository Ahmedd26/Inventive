import { Component, OnInit } from '@angular/core';
import { CreateProductModalComponent } from './components/create-product-modal/create-product-modal.component';
import { ProductsService } from './products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './products.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CreateProductModalComponent,
    LoadingComponent,
    CommonModule,
    RouterLink,
    PaginationComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  products: IProduct[] = [];
  error: HttpErrorResponse | null = null;

  constructor(private productSrv: ProductsService) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedProducts: IProduct[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  updatePaginatedProducts(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedProducts(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  ngOnInit() {
    this.isLoading = true;
    this.productSrv.getAll().subscribe({
      next: (products: IProduct[]) => {
        this.isLoading = false;
        this.products = products.reverse();
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = products.length;
        this.updatePaginatedProducts(1);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }
  addNewProduct(product: IProduct) {
    this.products.push(product);
  }
}
