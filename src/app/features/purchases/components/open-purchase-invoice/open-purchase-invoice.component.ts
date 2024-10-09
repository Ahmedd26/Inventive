import { PurchasesService } from './../../purchases.service';
import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';

@Component({
  selector: 'app-open-purchase-invoice',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './open-purchase-invoice.component.html',
})
export class OpenPurchaseInvoiceComponent {
  @Input({ required: true }) id!: number;

  constructor(private purchasesService: PurchasesService) {}

  openInvoice() {
    if (this.id) {
      this.purchasesService.getInvoice(this.id).subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
