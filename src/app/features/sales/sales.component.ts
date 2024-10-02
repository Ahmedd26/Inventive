import { Component } from '@angular/core';
import { SalesService } from './sales.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ISalesOrder, IUser } from './sales.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './sales.component.html',
})
export class SalesComponent {
  amountPattern = "^[1-9][0-9]*$"
  updateAmountPattern = "^[1-9][0-9]*$"
  salesArray!: ISalesOrder[]
  usersArray!: IUser[]
  errorBack = null;
  updateErrorBack = null

  constructor(private salesServ: SalesService) { }

  onCreateSales(formData: ISalesOrder) {
    this.salesServ.createSales(formData).subscribe({
      next: data => {
        // console.log(data)
        console.log('Added Successfully')
        this.errorBack = null
        this.salesArray.push(data)
      },
      error: errorRes => {
        this.errorBack = errorRes.error.errors;
        console.log(errorRes)
      }
    })
  }

  onDeleteSales(salesId: number) {
    this.salesServ.deleteSales(salesId).subscribe({
      next: data => {
        // console.log(data)
        console.log('DELETED Successfully')
        this.salesArray = this.salesArray.filter(
          (element) => element.id !== salesId
        );
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })
  }

  onUpdateSales(form: ISalesOrder, salesId: number) {
    this.salesServ.updateSales(form, salesId).subscribe({
      next: data => {
        // console.log(data)
        console.log("updated successfully")
        this.updateErrorBack = null
        this.salesArray = this.salesArray.map((element) => {
          if (element.id === salesId) {
            return {
              ...element, total_amount: form.total_amount,
              user_id: form.user_id,
              status: form.status
            };
          }
          return element;
        })
      },
      error: errorRes => {
        console.log(errorRes)
        this.updateErrorBack = errorRes.error.errors
      }
    })
  }

  ngOnInit() {
    this.salesServ.getAllSales().subscribe({
      next: data => {
        // console.log(data)
        this.salesArray = data
      },
      error: errorRes => {
        console.log(errorRes)
      }
    })
    this.salesServ.getAllUsers().subscribe({
      next: usersData => {
        // console.log(usersData)
        this.usersArray = usersData
      },
      error: errorRes => {
        console.log(errorRes)
      }
    })
  }

}
