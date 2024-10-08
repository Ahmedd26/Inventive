import { IconsModule } from '../../../../shared/icons/icons.module';
import { ProductsService } from './../../products.service';
import { Component, HostListener, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-delete-modal',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './product-delete-modal.component.html',
})
export class ProductDeleteModalComponent {
  @Input() productId!: number;
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
    private productsService: ProductsService,
    private router: Router,
  ) {}

  onDelete(productId: number) {
    this.isLoading = true;
    this.productsService.delete(productId).subscribe({
      next: () => {
        this.isLoading = false;
        this.success =
          'Product deleted successfully, redirecting to products page';
        console.log('Product deleted successfully');
        this.startCountdown();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        const errorMessages = new Map<number, string>([
          [
            404,
            'Product was not found, probably was deleted by another user earlier.',
          ],
          [401, 'You are not authorized to perform this action'],
          [500, 'Internal Server Error, please try again later'],
        ]);

        this.error =
          errorMessages.get(error.status) ||
          'An error occurred while deleting the product';
      },
    });
  }

  startCountdown() {
    const countdown$ = interval(1000).pipe(take(this.countDown));
    countdown$.subscribe({
      next: () => this.countDown--,
      complete: () => {
        this.redirectToProducts();
      },
    });
  }

  redirectToProducts() {
    this.router.navigate(['/products']).then(() => {
      this.closeModal();
    });
  }
}
