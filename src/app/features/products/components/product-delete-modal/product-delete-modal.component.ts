import { initFlowbite } from 'flowbite';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { ProductsService } from './../../products.service';
import {
  AfterViewInit,
  Component,
  Input,
  ViewContainerRef,
} from '@angular/core';
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
export class ProductDeleteModalComponent implements AfterViewInit {
  @Input() productId!: number;
  isLoading: boolean = false;
  success: string = '';
  error: string = '';
  countDown: number = 5;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
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
        switch (error.status) {
          case 404:
            this.error =
              'Product was not found, probably was deleted by another user earlier.';
            break;
          case 401:
            this.error = 'You are not authorized to perform this action';
            break;
          case 500:
            this.error = 'Internal Server Error, please try again later';
            break;
          default:
            this.error = 'An error occurred while deleting the product';
            break;
        }
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

  closeModal() {
    this.viewContainerRef.clear();
  }

  ngAfterViewInit() {
    initFlowbite();
  }
}
