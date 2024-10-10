import { IProduct } from '../../../products/products.model';
import { ProductsService } from './../../../products/products.service';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { SaleProductCardComponent } from './sale-product-card/sale-product-card.component';
import { ISelectedProduct } from '../create-purchase/purchase-product-card/purchase-product-card.component';
import { API } from '../../../../core/utils/constants.utils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-sale',
  standalone: true,
  imports: [LoadingComponent, SaleProductCardComponent],
  templateUrl: './create-sale.component.html',
})
export class CreateSaleComponent implements OnInit {
  isLoading = false;
  products!: IProduct[];
  phoneErrorMessage = '';
  customerData = {
    name: '',
    phone: '',
  };
  selectedProducts: ISelectedProduct[] = [];
  validRequest = false;
  
  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
  ) {}

  // Customer info section
  setCustomerName(event: Event) {
    this.customerData.name = (event.target as HTMLInputElement).value;
  }
  setCustomerPhone(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const regex = /^\+?[0-9]*$/;

    if (regex.test(value)) {
      this.customerData.phone = value;
      this.phoneErrorMessage = '';
    } else {
      this.phoneErrorMessage = 'Numbers only';
      target.value = this.customerData.phone;
    }
  }

  onAddSelectedProduct(product: ISelectedProduct) {
    this.selectedProducts.push(product);
    this.validRequest = true;
  }

  dismissSelectedProduct(id: number) {
    this.selectedProducts = this.selectedProducts.filter(
      (product) => product.product_id !== id,
    );
    if (this.selectedProducts.length === 0) {
      this.validRequest = false;
    }
  }

  submitSale() {
    if (this.validRequest) {
      const requestBody = {
        products: this.selectedProducts,
        customer: this.customerData,
      };
      console.log(JSON.stringify(requestBody));
      this.http.post(`${API}sales`, requestBody).subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/sales', res.id]);
        },
        error: (error) => console.log(error),
      });
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.isLoading = false;
        this.products = products;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
