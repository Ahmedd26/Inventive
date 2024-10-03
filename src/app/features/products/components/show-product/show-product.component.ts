import { ProductsService } from './../../products.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../../products.model';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { initFlowbite } from 'flowbite';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    IconsModule,
    ProductDeleteModalComponent,
    UpdateProductModalComponent,
  ],
  templateUrl: './show-product.component.html',
})
export class ShowProductComponent implements OnInit, AfterViewInit {
  isLoading = false;
  product!: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.productsService.get(+routeId).subscribe({
      next: (product: IProduct) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  setUpdatedProductInView(newProduct: IProduct) {
    // This function is responsible to update the product in the view
    this.product = newProduct;
  }
}
