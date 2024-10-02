import { SuppliersService } from './../../suppliers.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule , NgForm } from '@angular/forms';
import { ISupplier } from '../../suppliers.model';

interface Errors {
  name?: string[];
  email?: string[];
  phone?: string[];
  address?: string[];
  image?: string[];
}
@Component({
  selector: 'app-update-supplier-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-supplier-modal.component.html',
})
export class UpdateSupplierModalComponent {
  @Input({ required: true }) supplier!: ISupplier;
  @Output() closeModal = new EventEmitter();
  @Output() updatedSupplier: EventEmitter<ISupplier> = new EventEmitter();

  errors: Errors = {};
  selectedFile: File | null = null;


  constructor(private suppliersService: SuppliersService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        console.log('File selected:', this.selectedFile); 
    } else {
        console.error('No file selected');
    }
}
 onSubmit(supplierForm: NgForm) {
      if (supplierForm.valid) {
          const updatedSupplier: ISupplier = { ...this.supplier, ...supplierForm.value };
          const formData = new FormData();
          formData.append('name', updatedSupplier.name);
          formData.append('email', updatedSupplier.email);
          formData.append('phone', updatedSupplier.phone);
          formData.append('address', updatedSupplier.address);
          if (this.selectedFile) {
              formData.append('image', this.selectedFile);
              console.log('File appended:', this.selectedFile); // Debugging log

          } else {
              console.error('No file selected');
          }
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
      });
          this.suppliersService.update(updatedSupplier.id, formData).subscribe({
              next: (supplier) => {
                  this.updatedSupplier.emit(supplier);
                  console.log('supplier updated:', supplier);
                  this.closeModal.emit();
              },
              error: (error) => {
                  console.error('Error updating supplier:', error.error.errors);
                  this.errors.name = error.error.errors.name;
                  this.errors.email = error.error.errors.email;
                  this.errors.phone = error.error.errors.phone;
                  this.errors.address = error.error.errors.address;
                  this.errors.image = error.error.errors.image;
              }
          }
             
          );
      }
  }
  
  onCloseModal() {
    this.closeModal.emit();
  }
}
