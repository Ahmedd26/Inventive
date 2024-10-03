import { UsersService } from './../../../../../users/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { type IAdjustment } from '../../../../products.model';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../../../users/users.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-adjustment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-adjustment.component.html',
})
export class ProductAdjustmentComponent implements OnInit {
  @Input({ required: true }) adjustments!: IAdjustment[];
  users!: IUser[];
  usersError: any;
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
      error: (error: HttpErrorResponse) => {
        this.usersError = error.error.errors;
      },
    });
  }
}
