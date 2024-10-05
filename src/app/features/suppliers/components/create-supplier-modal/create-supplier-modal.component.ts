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
import { ISupplier, ISupplierError } from '../../suppliers.model';
import { SuppliersService } from '../../suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';

@Component({
  selector: 'app-create-supplier-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CustomModalComponent],
  templateUrl: './create-supplier-modal.component.html',
})
export class CreateSupplierModalComponent implements OnInit {
  @ViewChild('modal') customModalComponent!: CustomModalComponent;
  @Output() supplier = new EventEmitter<ISupplier>();
  supplierForm: FormGroup;
  apiErrors: ISupplierError | null = null;
  frontEndErrors: ISupplierError = {};
  isLoading = false;

  constructor(private suppliersService: SuppliersService) {
    this.supplierForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\+?\d{10,15}$/),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      image: new FormControl(null, Validators.required),
    });
  }

  getControl(controlName: string) {
    return this.supplierForm.get(controlName);
  }

  file: File | null = null;

  getFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.supplierForm.patchValue({
        image: this.file,
      });
      this.supplierForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.supplierForm.controls).forEach((key) => {
      formData.append(key, this.supplierForm.get(key)?.value);
    });

    this.suppliersService.create(formData).subscribe({
      next: (data) => {
        this.supplier.emit(data);
        this.customModalComponent.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.apiErrors = error.error.errors;
      },
    });
  }

  validateNumberOnInput(event: Event, field: keyof ISupplierError): void {
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
    // Initialization logic if needed
  }
}
