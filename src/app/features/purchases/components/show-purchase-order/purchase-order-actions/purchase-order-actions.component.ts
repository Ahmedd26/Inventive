import { PurchasesService } from './../../../purchases.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { CustomModalComponent } from '../../../../../shared/components/custom-modal/custom-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-actions',
  standalone: true,
  imports: [IconsModule, CustomModalComponent],
  templateUrl: './purchase-order-actions.component.html',
})
export class PurchaseOrderActionsComponent {
  @ViewChild('modal') modal!: CustomModalComponent;
  @Input({ required: true }) currentStatus!: string;
  @Input({ required: true }) orderId!: number;
  @Output() newStatus = new EventEmitter();
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  availableStatus = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'completed',
  ];
  getFilteredStatus() {
    return this.availableStatus.filter(
      (status) => status !== this.currentStatus,
    );
  }

  constructor(
    private purchasesService: PurchasesService,
    private router: Router,
  ) {}

  updateStatus(event: Event) {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;
    const target = event.target as HTMLSelectElement;
    const status = {
      status: target.value,
    };
    this.purchasesService.update(status, this.orderId).subscribe({
      next: () => {
        this.isLoading = false;
        this.newStatus.emit(target.value);
        this.successMessage = 'Status updated';
      },
      error: (err) => {
        this.errorMessage = 'Error occurred.';
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  deleteOrder() {
    if (this.orderId) {
      this.purchasesService.delete(this.orderId).subscribe({
        next: () => {
          console.log('Deleted Successfully');
          this.modal.closeModal();
          this.router.navigate(['/purchases']);
        },
      });
    }
  }
}
