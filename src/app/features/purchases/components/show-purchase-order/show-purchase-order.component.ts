import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { PurchasesService } from './../../purchases.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { type IPurchase } from '../../purchases.model';
import { PurchaseOrderActionsComponent } from './purchase-order-actions/purchase-order-actions.component';
import { OpenPurchaseInvoiceComponent } from '../open-purchase-invoice/open-purchase-invoice.component';
import { InvoicesService } from '../../../../core/services/invoices-service/invoices.service';

@Component({
  selector: 'app-show-purchase-order',
  standalone: true,
  imports: [
    IconsModule,
    LoadingComponent,
    RouterLink,
    CommonModule,
    PurchaseOrderActionsComponent,
    OpenPurchaseInvoiceComponent,
  ],
  templateUrl: './show-purchase-order.component.html',
})
export class ShowPurchaseOrderComponent implements OnInit {
  isLoading = false;
  purchase!: IPurchase;
  constructor(
    private purchasesService: PurchasesService,
    private invoicesService: InvoicesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  getInvoice() {
    if (this.purchase.id) {
      this.invoicesService.getPurchase(this.purchase.id);
    }
  }

  updateStatus(status: string) {
    this.purchase.status = status;
  }

  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.purchasesService.get(+routeId).subscribe({
      next: (purchase: IPurchase) => {
        this.purchase = purchase;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
