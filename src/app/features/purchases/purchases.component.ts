import { Component } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ISupplier } from '../suppliers/suppliers.model';
import { IPurchase } from './purchases.model';
import { IUser } from '../users/users.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../shared/icons/icons.module';
import { OpenPurchaseInvoiceComponent } from './components/open-purchase-invoice/open-purchase-invoice.component';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    LoadingComponent,
    CommonModule,
    PaginationComponent,
    RouterLink,
    IconsModule,
    OpenPurchaseInvoiceComponent,
  ],
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent {
  isLoading = false;
  purchasesArray!: IPurchase[];

  constructor(private purchasesService: PurchasesService) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedPurchases: IPurchase[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  updatePaginatedPurchases(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPurchases = this.purchasesArray.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedPurchases(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  ngOnInit() {
    this.isLoading = true;
    this.purchasesService.getAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.purchasesArray = data;
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = this.purchasesArray.length;
        this.updatePaginatedPurchases(1);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
