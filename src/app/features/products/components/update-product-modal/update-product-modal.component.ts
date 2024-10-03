import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import { IconsModule } from '../../../../shared/icons/icons.module';

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, IconsModule],
  templateUrl: './update-product-modal.component.html',
})
export class UpdateProductModalComponent implements OnInit, OnChanges {
  @Output() product = new EventEmitter<IProduct>();
  @Input({ required: true }) inputProduct!: IProduct;
  productForm: FormGroup;
  apiErrors: IProductError | null = null;
  frontEndErrors: IProductError = {};
  isLoading = false;
  productsArray!: IProduct[];
  suppliersArray!: ISupplier[];
  categoriesArray!: ICategory[];

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
  // END MODAL
  constructor(
    private productService: ProductsService,
    private supplierService: SuppliersService,
    private categoryService: CategoriesService,
  ) {
    this.productForm = new FormGroup({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputProduct'] && this.inputProduct) {
      this.productForm = new FormGroup({
        name: new FormControl(this.inputProduct.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl(this.inputProduct.description, [
          Validators.required,
          Validators.minLength(15),
        ]),
        sku: new FormControl(this.inputProduct.sku, Validators.required),
        price: new FormControl(this.inputProduct.price, Validators.required),
        quantity: new FormControl(
          this.inputProduct.quantity,
          Validators.required,
        ),
        category_id: new FormControl(
          this.inputProduct.category_id,
          Validators.required,
        ),
        supplier_id: new FormControl(
          this.inputProduct.supplier_id,
          Validators.required,
        ),
        image: new FormControl(null),
      });
    }
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
    console.log(this.productForm);
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach((key) => {
        formData.append(key, this.productForm.get(key)?.value);
      });

      if (this.inputProduct.id) {
        const id = this.inputProduct.id;
        this.productService.update(formData, id).subscribe({
          next: (data) => {
            this.product.emit(data);
            this.closeModal();
          },
          error: (error: HttpErrorResponse) => {
            this.apiErrors = error.error.errors;
          },
        });
      }
    }
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

/*

this.productForm = new FormGroup({
      name: new FormControl(this.inputProduct.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.inputProduct.description, [
        Validators.required,
        Validators.minLength(15),
      ]),
      sku: new FormControl(this.inputProduct.sku, Validators.required),
      price: new FormControl(this.inputProduct.price, Validators.required),
      quantity: new FormControl(
        this.inputProduct.quantity,
        Validators.required,
      ),
      category_id: new FormControl(
        this.inputProduct.category_id,
        Validators.required,
      ),
      supplier_id: new FormControl(
        this.inputProduct.supplier_id,
        Validators.required,
      ),
      image: new FormControl(null, Validators.required),
    });

*/
