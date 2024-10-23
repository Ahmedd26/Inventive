import { WarehouseService } from './../../../warehouse/warehouse.service';
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
import { Router, RouterLink } from '@angular/router';
import { IPurchase } from '../../../purchases/purchases.model';
import { IWarehouse } from '../../../warehouse/warehouse.model';

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
  warehouses: IWarehouse[] = [];
  section_id: null | number = null;
  constructor(
    private suppliersService: SuppliersService,
    private warehouseService: WarehouseService,
    private http: HttpClient,
    private router: Router,
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
  onWarehouseSectionSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id = +target.value;
    this.section_id = id;
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
        warehouse_section_id: this.section_id,
        products: this.selectedProducts,
      };
      this.http.post<IPurchase>(`${API}purchase`, requestBody).subscribe({
        next: (res) => {
          this.router.navigate(['/purchases', res.id]);
        },
        error: (error) => console.log(error),
      });
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getSuppliers();
    this.getWarehouses();
  }
  getSuppliers() {
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
  getWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.warehouses = res;
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        console.error(error);
      },
    });
  }
}
