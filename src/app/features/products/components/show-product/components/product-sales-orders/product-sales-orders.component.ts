import { UsersService } from './../../../../../users/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProductSalesOrder } from '../../../../products.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../../../../users/users.model';

@Component({
  selector: 'app-product-sales-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-sales-orders.component.html',
})
export class ProductSalesOrdersComponent implements OnInit {
  @Input({ required: true }) salesOrders!: IProductSalesOrder[];
  users!: IUser[];
  constructor(private usersService: UsersService) {}

  getUserName(userId: number): string {
    if (this.users) {
      const user = this.users.find((u) => u.id === userId);
      return user ? user.name : 'Unknown';
    }
    return 'Unknown user';
  }

  ngOnInit(): void {
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (errors: HttpErrorResponse) => {
        console.log(errors.error.errors);
      },
    });
  }
}
