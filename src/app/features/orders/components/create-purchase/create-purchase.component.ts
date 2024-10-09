import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ISupplier } from '../../../suppliers/suppliers.model';
import { SuppliersService } from '../../../suppliers/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../shared/icons/icons.module';
import {
  ISelectedProduct,
  PurchaseProductCardComponent,
} from './purchase-product-card/purchase-product-card.component';
import { API } from '../../../../core/utils/constants.utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-purchase',
  standalone: true,
  imports: [
    LoadingComponent,
    FormsModule,
    CommonModule,
    IconsModule,
    PurchaseProductCardComponent,
    RouterLink,
  ],
  templateUrl: './create-purchase.component.html',
})
export class CreatePurchaseComponent implements OnInit {
  isLoading = false;
  suppliers!: ISupplier[];
  selectedSupplier!: ISupplier;
  selectedSupplierId!: number;
  selectedProducts: ISelectedProduct[] = [];
  validRequest = false;

  constructor(
    private suppliersService: SuppliersService,
    private http: HttpClient,
  ) {}

  onSupplierSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id = target.value;
    const supplier = this.suppliers.find((supplier) => supplier.id === +id);
    if (supplier) {
      this.selectedSupplierId = supplier.id;
      this.selectedSupplier = supplier;
      this.selectedProducts = [];
      this.validRequest = false;
    }
  }

  onAddSelectedProduct(selectedProduct: ISelectedProduct) {
    this.selectedProducts.push(selectedProduct);
    this.validRequest = true;
  }
  dismissSelectedProduct(id: number) {
    this.selectedProducts = this.selectedProducts.filter(
      (product) => product.product_id !== id,
    );
    if (this.selectedProducts.length === 0) {
      this.validRequest = false;
    }
  }

  submitPurchase() {
    if (this.validRequest) {
      const requestBody = {
        supplier_id: this.selectedSupplierId,
        products: this.selectedProducts,
      };
      this.http.post(`${API}purchase`, requestBody).subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
      console.log(JSON.stringify(requestBody));
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.suppliersService.getAll().subscribe({
      next: (suppliers) => {
        this.isLoading = false;
        this.suppliers = suppliers;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error(error.message);
      },
    });
  }
}
