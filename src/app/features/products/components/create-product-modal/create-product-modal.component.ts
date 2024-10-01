import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../products.model';
import { ISupplier } from '../../../suppliers/suppliers.model';
import { ICategory } from '../../../categories/categories.model';
import { ProductsService } from '../../products.service';
import { SuppliersService } from '../../../suppliers/suppliers.service';
import { CategoriesService } from '../../../categories/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-product-modal.component.html',
})
export class CreateProductModalComponent implements OnInit {
  @Output() product = new EventEmitter<IProduct>();
  productForm: FormGroup;
  errorTypes = null;
  isLoading = false;
  productsArray!: IProduct[];
  suppliersArray!: ISupplier[];
  categoriesArray!: ICategory[];

  constructor(
    private productService: ProductsService,
    private supplierService: SuppliersService,
    private categoryService: CategoriesService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      sku: new FormControl(null),
      price: new FormControl(null),
      quantity: new FormControl(null),
      category_id: new FormControl(null),
      supplier_id: new FormControl(null),
      image: new FormControl(null),
    });
  }

  file: any = '';
  getFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.productForm.patchValue({
      image: this.file,
    });
    this.productForm.get('image')?.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      formData.append(key, this.productForm.get(key)?.value);
    });

    this.productService.create(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.product.emit(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    // Get supplier list for the dropdown list
    this.supplierService.getAll().subscribe({
      next: (suppliers) => {
        this.suppliersArray = suppliers;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.suppliersArray.push({
          id: 0,
          name: 'There was an error retrieving suppliers list',
          email: '',
          phone: '',
          address: '',
        });
      },
    });
    // Get Categories list for the dropdown list
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categoriesArray = categories;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.categoriesArray.push({
          id: 0,
          name: 'There was an error retrieving categories list',
        });
      },
    });
  }
}
