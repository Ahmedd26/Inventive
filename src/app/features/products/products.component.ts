import { Component, OnInit } from '@angular/core';
import { CreateProductModalComponent } from './components/create-product-modal/create-product-modal.component';
import { ProductsService } from './products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './products.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CreateProductModalComponent,
    LoadingComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  products: IProduct[] = [];
  error: HttpErrorResponse | null = null;
  constructor(private productSrv: ProductsService) {}
  ngOnInit() {
    this.isLoading = true;
    this.productSrv.getAll().subscribe({
      next: (products: IProduct[]) => {
        this.isLoading = false;
        this.products = products;
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
