import { InvoicesService } from './../../../../core/services/invoices-service/invoices.service';
import { SalesService } from './../../sales.service';
import { Component, OnInit } from '@angular/core';
import { ISalesOrder } from '../../sales.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { DeleteSaleOrderComponent } from '../delete-sale-order/delete-sale-order.component';

@Component({
  selector: 'app-show-sale-order',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    RouterLink,
    IconsModule,
    DeleteSaleOrderComponent,
  ],
  templateUrl: './show-sale-order.component.html',
})
export class ShowSaleOrderComponent implements OnInit {
  isLoading = false;
  sale!: ISalesOrder;
  constructor(
    private salesService: SalesService,
    private invoicesService: InvoicesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  openInvoice() {
    if (this.sale.id) {
      this.invoicesService.getSale(this.sale.id);
    }
  }

  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.salesService.get(+routeId).subscribe({
      next: (sale: ISalesOrder) => {
        this.sale = sale;
        console.log(JSON.stringify(sale));
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
