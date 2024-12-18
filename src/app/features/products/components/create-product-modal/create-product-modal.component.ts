import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct, IProductError } from '../../products.model';
import { ISupplier } from '../../../suppliers/suppliers.model';
import { ICategory } from '../../../categories/categories.model';
import { ProductsService } from '../../products.service';
import { SuppliersService } from '../../../suppliers/suppliers.service';
import { CategoriesService } from '../../../categories/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CustomModalComponent],
  templateUrl: './create-product-modal.component.html',
})
export class CreateProductModalComponent implements OnInit {
  @ViewChild('modal') customModalComponent!: CustomModalComponent;
  @Output() product = new EventEmitter<IProduct>();
  productForm: FormGroup;
  apiErrors: IProductError | null = null;
  frontEndErrors: IProductError = {};
  isLoading = false;
  productsArray!: IProduct[];
  suppliersArray!: ISupplier[];
  categoriesArray!: ICategory[];

  constructor(
    private productService: ProductsService,
    private supplierService: SuppliersService,
    private categoryService: CategoriesService,
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      sku: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      category_id: new FormControl(null, Validators.required),
      supplier_id: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }
  getControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  file: any = '';
  getFile(event: any) {
    this.file = event.target.files[0];
    this.productForm.patchValue({
      image: this.file,
    });
    this.productForm.get('image')?.updateValueAndValidity();
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      formData.append(key, this.productForm.get(key)?.value);
    });

    this.productService.create(formData).subscribe({
      next: (data) => {
        this.product.emit(data);
        this.customModalComponent.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.apiErrors = error.error.errors;
      },
    });
    // }
  }

  validateNumberOnInput(event: Event, field: keyof IProductError): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const regex = /^\d*$/;

    if (!regex.test(value)) {
      inputElement.value = value.slice(0, -1);
      this.frontEndErrors[field] = ['This input accepts numbers only'];
    } else {
      this.frontEndErrors[field] = [];
    }
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
    this.categoryService.getAll().subscribe({
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
