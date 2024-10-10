import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { InvoicesService } from '../../../../core/services/invoices-service/invoices.service';

@Component({
  selector: 'app-open-purchase-invoice',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './open-purchase-invoice.component.html',
})
export class OpenPurchaseInvoiceComponent {
  @Input({ required: true }) id!: number;

  constructor(private invoicesService: InvoicesService) {}

  openInvoice() {
    if (this.id) {
      this.invoicesService.getPurchase(this.id);
    }
  }
}
