import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { PurchasesService } from './../../purchases.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import {
  type IProductPurchaseOrder,
  type IPurchase,
} from '../../purchases.model';

@Component({
  selector: 'app-show-purchase-order',
  standalone: true,
  imports: [IconsModule, LoadingComponent, RouterLink, CommonModule],
  templateUrl: './show-purchase-order.component.html',
})
export class ShowPurchaseOrderComponent implements OnInit {
  isLoading = false;
  purchase!: IPurchase;
  constructor(
    private purchasesService: PurchasesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.purchasesService.get(+routeId).subscribe({
      next: (purchase: IPurchase) => {
        this.purchase = purchase;
        this.isLoading = false;
        console.log(purchase);
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
