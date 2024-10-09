import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { PurchasesService } from './../../purchases.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { type IPurchase } from '../../purchases.model';
import { PurchaseOrderActionsComponent } from './purchase-order-actions/purchase-order-actions.component';

@Component({
  selector: 'app-show-purchase-order',
  standalone: true,
  imports: [
    IconsModule,
    LoadingComponent,
    RouterLink,
    CommonModule,
    PurchaseOrderActionsComponent,
  ],
  templateUrl: './show-purchase-order.component.html',
})
export class ShowPurchaseOrderComponent implements OnInit {
  isLoading = false;
  purchase!: IPurchase;
  constructor(
    private purchasesService: PurchasesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  updateStatus(status: string) {
    this.purchase.status = status;
  }

  openInvoice() {
    if (this.purchase.id) {
      this.purchasesService.getInvoice(this.purchase.id).subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: (err) => console.error(err),
      });
    }
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
