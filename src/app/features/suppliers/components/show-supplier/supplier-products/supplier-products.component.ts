import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../products/products.model';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-supplier-products',
  standalone: true,
  imports: [CommonModule, IconsModule, RouterLink, PaginationComponent],
  templateUrl: './supplier-products.component.html',
})
export class SupplierProductsComponent implements OnInit {
  @Input({ required: true }) products!: IProduct[];
  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedProduct: IProduct[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  updatePaginatedProducts(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProduct = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedProducts(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//
  ngOnInit() {
    // ** ---------- PAGINATION ---------- **//
    this.totalItems = this.products.length;
    this.updatePaginatedProducts(1);
  }
}
