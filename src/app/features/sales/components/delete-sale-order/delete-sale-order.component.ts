import { SalesService } from './../../sales.service';
import { Component, HostListener, Input } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-delete-sale-order',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './delete-sale-order.component.html',
})
export class DeleteSaleOrderComponent {
  @Input({ required: true }) saleId!: number;
  isLoading: boolean = false;
  success: string = '';
  error: string = '';
  countDown: number = 5;
  isOpened: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }

  constructor(
    private salesService: SalesService,
    private router: Router,
  ) {}

  onDelete(saleId: number) {
    this.isLoading = true;
    this.salesService.delete(saleId).subscribe({
      next: () => {
        this.isLoading = false;
        this.success = 'Sale deleted successfully, redirecting to Sales page';
        this.startCountdown();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        const errorMessages = new Map<number, string>([
          [
            404,
            'Supplier was not found, probably was deleted by another user earlier.',
          ],
          [401, 'You are not authorized to perform this action'],
          [500, 'Internal Server Error, please try again later'],
        ]);

        this.error =
          errorMessages.get(error.status) ||
          'An error occurred while deleting the supplier';
      },
    });
  }

  startCountdown() {
    const countdown$ = interval(1000).pipe(take(this.countDown));
    countdown$.subscribe({
      next: () => this.countDown--,
      complete: () => {
        this.redirectToSuppliers();
      },
    });
  }

  redirectToSuppliers() {
    this.router.navigate(['/sales']).then(() => {
      this.closeModal();
    });
  }
}
