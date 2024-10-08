import { UsersService } from './../users/users.service';
import { Component } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SuppliersService } from '../suppliers/suppliers.service';
import { ISupplier } from '../suppliers/suppliers.model';
import { IPurchase } from './purchases.model';
import { IUser } from '../users/users.model';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent {
  amountPattern = '^[1-9][0-9]*$';
  updateAmountPattern = '^[1-9][0-9]*$';
  APIerrors = null;
  updateAPIerrors = null;
  purchasesArray!: IPurchase[];
  suppliersArray!: ISupplier[];
  usersArray!: IUser[];

  constructor(
    private purchasesService: PurchasesService,
    private supplierService: SuppliersService,
    private usersService: UsersService,
  ) {}

  onCreatePurchase(formData: IPurchase) {
    this.purchasesService.create(formData).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('Added Successfully');
        this.APIerrors = null;
        this.purchasesArray.push(data);
      },
      error: (errorRes) => {
        this.APIerrors = errorRes.error.errors;
        // console.log(errorRes)
      },
    });
  }

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
    this.purchasesService.getAll().subscribe({
      next: (data) => {
        // console.log(data)
        this.purchasesArray = data;
      },
      error: (error) => {
        // console.log(error)
      },
    });

    this.supplierService.getAll().subscribe({
      next: (suppData) => {
        this.suppliersArray = suppData;
        // console.log(suppData)
      },
      error: (errRes) => {
        // console.log(errRes)
      },
    });

    this.usersService.getAll().subscribe({
      next: (usersData) => {
        this.usersArray = usersData;
        // console.log(usersData)
      },
      error: (errRes) => {
        // console.log(errRes)
      },
    });
  }
}
