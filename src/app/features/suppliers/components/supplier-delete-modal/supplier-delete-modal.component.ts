import { IconsModule } from '../../../../shared/icons/icons.module';
import { SuppliersService } from './../../suppliers.service';
import { Component, HostListener, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-delete-modal',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './supplier-delete-modal.component.html',
})
export class SupplierDeleteModalComponent {
  @Input() supplierId!: number;
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
    private suppliersService: SuppliersService,
    private router: Router,
  ) {}

  onDelete(supplierId: number) {
    this.isLoading = true;
    this.suppliersService.delete(supplierId).subscribe({
      next: () => {
        this.isLoading = false;
        this.success =
          'Supplier deleted successfully, redirecting to suppliers page';
        console.log('Supplier deleted successfully');
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
    this.router.navigate(['/suppliers']).then(() => {
      this.closeModal();
    });
  }
}
