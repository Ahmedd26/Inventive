import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  selector: 'app-update-supplier-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CustomModalComponent],
  templateUrl: './update-supplier-modal.component.html',
})
export class UpdateSupplierModalComponent implements OnInit, OnChanges {
  @ViewChild('modal') customModalComponent!: CustomModalComponent;
  @Output() supplier = new EventEmitter<ISupplier>();
  @Input({ required: true }) inputSupplier!: ISupplier;
  supplierForm: FormGroup;
  apiErrors: ISupplierError | null = null;
  frontEndErrors: ISupplierError = {};
  isLoading = false;

  constructor(private suppliersService: SuppliersService) {
    this.supplierForm = new FormGroup({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputSupplier'] && this.inputSupplier) {
      this.supplierForm = new FormGroup({
        name: new FormControl(this.inputSupplier.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl(this.inputSupplier.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(this.inputSupplier.phone, [
          Validators.required,
          Validators.pattern(/^\+?\d{10,15}$/),
        ]),
        address: new FormControl(this.inputSupplier.address, [
          Validators.required,
          Validators.minLength(10),
        ]),
        image: new FormControl(null),
      });
    }
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
      if (key !== 'image' || (key === 'image' && this.file)) {
        formData.append(key, this.supplierForm.get(key)?.value);
      }
    });

    if (this.inputSupplier.id) {
      const id = this.inputSupplier.id;
      this.suppliersService.update(formData, id).subscribe({
        next: (data) => {
          this.supplier.emit(data);
          this.apiErrors = null;
          this.frontEndErrors = {};
          this.customModalComponent.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.apiErrors = error.error.errors;
        },
      });
    }
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
