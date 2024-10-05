import { SuppliersService } from './../../suppliers.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISupplier } from '../../suppliers.model';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { initFlowbite } from 'flowbite';
import { SupplierDeleteModalComponent } from '../supplier-delete-modal/supplier-delete-modal.component';
// import { UpdateSupplierModalComponent } from '../update-supplier-modal/update-supplier-modal.component';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';
import {SupplierPurchaseOrdersComponent} from './supplier-purchase-orders/supplier-purchase-orders.component';

@Component({
  selector: 'app-show-supplier',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    IconsModule,
    SupplierDeleteModalComponent,
    SupplierPurchaseOrdersComponent,
    SupplierProductsComponent,
    CustomModalComponent,
  ],
  templateUrl: './show-supplier.component.html',
})
export class ShowSupplierComponent implements OnInit, AfterViewInit {
  isLoading = false;
  supplier!: ISupplier;
  constructor(
    private activatedRoute: ActivatedRoute,
    private suppliersService: SuppliersService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.suppliersService.get(+routeId).subscribe({
      next: (supplier: ISupplier) => {
        this.supplier = supplier;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  setUpdatedSupplierInView(newSupplier: ISupplier) {
    // This function is responsible to update the supplier in the view
    this.supplier = newSupplier;
  }
}
