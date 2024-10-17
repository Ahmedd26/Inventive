import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../products/products.model';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './category-product.component.html',
})
export class CategoryProductComponent implements OnInit {
  @Input() products!: IProduct[];
  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedProducts: IProduct[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  updatePaginatedProducts(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedProducts(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//
  ngOnInit(): void {
    // ** ---------- PAGINATION ---------- **//
    this.totalItems = this.products.length;
    this.updatePaginatedProducts(1);
  }
}
