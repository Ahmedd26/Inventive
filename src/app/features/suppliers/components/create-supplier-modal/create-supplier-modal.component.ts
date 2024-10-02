import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type ISupplier } from '../../suppliers.model';

@Component({
  selector: 'app-create-supplier-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-supplier-modal.component.html',
})
export class CreateSupplierModalComponent {
  @Output() supplierCreated = new EventEmitter<{ supplier: ISupplier, file: File | null }>();

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
      }
  }

  onSubmit(supplierForm: NgForm) {
      if (supplierForm.valid) {
          const supplier: ISupplier = supplierForm.value;
          this.supplierCreated.emit({ supplier, file: this.selectedFile });
          console.log(supplierForm.value);
          supplierForm.reset();
      }
  }
}