import { Component } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SuppliersService } from '../suppliers/suppliers.service';
import { ISupplier } from '../suppliers/suppliers.model';
import { IPurchase, IUser } from './purchases.model';


@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './purchases.component.html'
})


export class PurchasesComponent {
  amountPattern = "^[1-9][0-9]*$"
  updateAmountPattern = "^[1-9][0-9]*$"
  APIerrors = null
  updateAPIerrors = null
  purchasesArray!: IPurchase[]
  suppliersArray!: ISupplier[];
  usersArray!: IUser[]

  constructor(private purchServ: PurchasesService, private suppServ: SuppliersService) { }

  onCreatePurchase(formData: IPurchase) {
    this.purchServ.createPurchase(formData).subscribe({
      next: data => {
        // console.log(data)
        console.log('Added Successfully')
        this.APIerrors = null
        this.purchasesArray.push(data)
      },
      error: errorRes => {
        this.APIerrors = errorRes.error.errors;
        // console.log(errorRes)
      }
    })
  }

  onUpdatePurchase(updatedForm: IPurchase, purchId: number) {
    this.purchServ.updatePurchase(updatedForm, purchId).subscribe({
      next: data => {
        // console.log(data)
        console.log('Updated Successfully')
        this.updateAPIerrors = null
        this.purchasesArray = this.purchasesArray.map((element) => {
          if (element.id === purchId) {
            return {
              ...element,
              total_amount: updatedForm.total_amount,
              status: updatedForm.status,
              user_id: updatedForm.user_id,
              supplier_id: updatedForm.supplier_id
            };
          }
          return element;
        })
      },
      error: errorRes => {
        this.updateAPIerrors = errorRes.error.errors;
        // console.log(errorRes)
      }
    })
  }

  onDeletePurchase(purchaseId: number) {
    this.purchServ.deletePurchase(purchaseId).subscribe({
      next: data => {
        // console.log(data)
        console.log('DELETED Successfully')
        this.purchasesArray = this.purchasesArray.filter((element) =>
          element.id !== purchaseId
        );
      },
      error: error => {
        // console.log(error)
      }
    })
  }

  ngOnInit() {
    this.purchServ.getAllPurchases().subscribe({
      next: (data) => {
        // console.log(data)
        this.purchasesArray = data
      },
      error: error => {
        // console.log(error)
      }
    })

    this.suppServ.getAll().subscribe({
      next: suppData => {
        this.suppliersArray = suppData
        // console.log(suppData)
      },
      error: errRes => {
        // console.log(errRes)
      }
    })

    this.purchServ.getAllUsers().subscribe({
      next: usersData => {
        this.usersArray = usersData
        // console.log(usersData)
      },
      error: errRes => {
        // console.log(errRes)
      }
    })

  }


}
