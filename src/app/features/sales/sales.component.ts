import { Component, OnInit } from '@angular/core';
import { SalesService } from './sales.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ISalesOrder } from './sales.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../shared/icons/icons.module';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { InvoicesService } from '../../core/services/invoices-service/invoices.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    IconsModule,
    PaginationComponent,
  ],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  isLoading = false;
  sales!: ISalesOrder[];
  errors: any = {};
  constructor(
    private salesService: SalesService,
    private invoicesService: InvoicesService,
  ) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedSales: ISalesOrder[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  updatePaginatedSales(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSales = this.sales.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedSales(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  calculateTotalQuantity(salesOrder: ISalesOrder): number {
    return salesOrder.product_sales_orders.reduce(
      (total, productOrder) => total + productOrder.quantity,
      0,
    );
  }

  getSaleInvoice(id: number) {
    this.invoicesService.getSale(id);
  }

  ngOnInit() {
    this.isLoading = true;
    this.salesService.getAll().subscribe({
      next: (sales) => {
        this.isLoading = false;
        this.sales = sales;
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = this.sales.length;
        this.updatePaginatedSales(1);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error.message);
        this.errors = {
          status: error.status,
          message: error.message,
        };
      },
    });
  }
}
