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
  ],
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent {
  isLoading = false;
  amountPattern = '^[1-9][0-9]*$';
  updateAmountPattern = '^[1-9][0-9]*$';
  APIerrors = null;
  updateAPIerrors = null;
  purchasesArray!: IPurchase[];
  suppliersArray!: ISupplier[];
  usersArray!: IUser[];

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

  onUpdatePurchase(updatedForm: IPurchase, purchaseId: number) {
    this.purchasesService.update(updatedForm, purchaseId).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('Updated Successfully');
        this.updateAPIerrors = null;
        this.purchasesArray = this.purchasesArray.map((element) => {
          if (element.id === purchaseId) {
            return {
              ...element,
              total_amount: updatedForm.total_amount,
              status: updatedForm.status,
              user_id: updatedForm.user_id,
              supplier_id: updatedForm.supplier_id,
            };
          }
          return element;
        });
      },
      error: (errorRes) => {
        this.updateAPIerrors = errorRes.error.errors;
        // console.log(errorRes)
      },
    });
  }

  onDeletePurchase(purchaseId: number) {
    this.purchasesService.delete(purchaseId).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('DELETED Successfully');
        this.purchasesArray = this.purchasesArray.filter(
          (element) => element.id !== purchaseId,
        );
      },
      error: (error) => {
        // console.log(error)
      },
    });
  }

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
