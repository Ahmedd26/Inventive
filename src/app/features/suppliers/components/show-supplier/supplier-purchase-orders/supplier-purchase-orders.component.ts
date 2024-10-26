import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISupplierPurchaseOrders } from '../../../suppliers.model';
import { UsersService } from '../../../../users/users.service';
import { SuppliersService } from '../../../../suppliers/suppliers.service';
import { IUser } from '../../../../users/users.model';
import { ISupplier } from '../../../../suppliers/suppliers.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../../../../shared/icons/icons.module';

@Component({
  selector: 'app-supplier-purchase-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, IconsModule],
  templateUrl: './supplier-purchase-orders.component.html',
})
export class SupplierPurchaseOrdersComponent implements OnInit {
  @Input({ required: true }) purchaseOrders!: ISupplierPurchaseOrders[];
  private userMap: Map<number, string> = new Map();
  private supplierMap: Map<number, string> = new Map();
  usersError: string | null = null;
  suppliersError: string | null = null;

  constructor(
    private usersService: UsersService,
    private suppliersService: SuppliersService,
  ) {}

  getSupplierName(supplierId: number): string {
    return this.supplierMap.get(supplierId) || 'Unknown supplier';
  }

  ngOnInit(): void {
    if (this.purchaseOrders) {
      this.purchaseOrders = this.purchaseOrders.reverse();
    }
    this.usersService.getAll().subscribe({
      next: (users: IUser[]) => {
        users.forEach((user) => this.userMap.set(user.id!, user.name));
      },
      error: (error: HttpErrorResponse) => {
        this.usersError = error.message;
      },
    });

    this.suppliersService.getAll().subscribe({
      next: (suppliers: ISupplier[]) => {
        suppliers.forEach((supplier) =>
          this.supplierMap.set(supplier.id!, supplier.name),
        );
      },
      error: (error: HttpErrorResponse) => {
        this.suppliersError = error.message;
      },
    });
  }
}
