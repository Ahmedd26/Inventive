import { Component } from '@angular/core';
import { SalesService } from './sales.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ISalesOrder } from './sales.model';
import { IUser } from '../users/users.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './sales.component.html',
})
export class SalesComponent {
  amountPattern = '^[1-9][0-9]*$';
  updateAmountPattern = '^[1-9][0-9]*$';
  salesArray!: ISalesOrder[];
  usersArray!: IUser[];
  APIerrors = null;
  updateAPIerrors = null;

  constructor(private salesServ: SalesService) {}

  onCreateSales(formData: ISalesOrder) {
    this.salesServ.create(formData).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('Added Successfully');
        this.APIerrors = null;
        this.salesArray.push(data);
      },
      error: (errorRes) => {
        this.APIerrors = errorRes.error.errors;
        console.log(errorRes);
      },
    });
  }

  onDeleteSales(salesId: number) {
    this.salesServ.delete(salesId).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('DELETED Successfully');
        this.salesArray = this.salesArray.filter(
          (element) => element.id !== salesId,
        );
      },
      error: (errorRes) => {
        // console.log(errorRes)
      },
    });
  }

  onUpdateSales(form: ISalesOrder, salesId: number) {
    this.salesServ.update(form, salesId).subscribe({
      next: (data) => {
        // console.log(data)
        console.log('updated successfully');
        this.updateAPIerrors = null;
        this.salesArray = this.salesArray.map((element) => {
          if (element.id === salesId) {
            return {
              ...element,
              total_amount: form.total_amount,
              user_id: form.user_id,
            };
          }
          return element;
        });
      },
      error: (errorRes) => {
        console.log(errorRes);
        this.updateAPIerrors = errorRes.error.errors;
      },
    });
  }

  ngOnInit() {
    this.salesServ.getAll().subscribe({
      next: (data) => {
        // console.log(data)
        this.salesArray = data;
      },
      error: (errorRes) => {
        console.log(errorRes);
      },
    });
    // this.salesServ.getAllUsers().subscribe({
    //   next: usersData => {
    //     // console.log(usersData)
    //     this.usersArray = usersData
    //   },
    //   error: errorRes => {
    //     console.log(errorRes)
    //   }
    // })
  }
}
