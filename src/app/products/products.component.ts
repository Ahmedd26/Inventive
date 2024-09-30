import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type IProduct } from './products.model';
import { ProductsService } from './products.service';
import { NgFor, NgIf } from '@angular/common';
import { ISupplier } from '../features/suppliers/suppliers.model';
import { SuppliersService } from '../features/suppliers/suppliers.service';
import { CategoriesService } from '../features/categories/categories.service';
import { ICategory } from '../features/categories/categories.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productsArray!: IProduct[];
  suppliersArray!: ISupplier[];
  categoriesArray!: ICategory[];
  errorTypes = null;
  errorUpdates = null
  isLoading = false;

  constructor(
    private productServ: ProductsService,
    private supplierServ: SuppliersService,
    private categoryServ: CategoriesService
  ) { }

  onCreateProduct(productData: IProduct) {
    console.log(productData);
    this.isLoading = true;
    this.productServ.createNewProduct(productData).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.productsArray.push(data);
        console.log(data);
      },
      error: (error) => {
        console.log('alert1');
        console.log(error);
        this.errorTypes = error.error.errors;
        console.log('alert2');
        console.log(this.errorTypes);
      },
    });
  }

  onDeleteProduct(proId: any) {
    console.log(proId);
    this.productServ.delete(proId).subscribe({
      next: () => {
        console.log(proId, 'deleted');
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(this.productsArray.length);
    this.productsArray = this.productsArray.filter(
      (element) => element.id !== proId
    );
    console.log(this.productsArray.length);
  }

  onUpdateProduct(productData: IProduct, prodId: any) {
    this.productServ.updateProduct(productData, prodId).subscribe({
      next: data => {
        console.log(data)
      },
      error: errorRes => {
        console.log(errorRes)
        this.errorUpdates = errorRes.error.errors
      }
    })
  }
  ngOnInit() {
    this.productServ.getAllProducts().subscribe((data) => {
      this.productsArray = data;
      console.log('Products array length is', this.productsArray.length);
    });
    this.supplierServ.getAll().subscribe((supData) => {
      this.suppliersArray = supData;
      // console.log(this.suppliersArray)
    });
    this.categoryServ.getAllCategories().subscribe((catData) => {
      this.categoriesArray = catData;
      // console.log(catData)
      // console.log( this.categoriesArray)
    });
  }
}
