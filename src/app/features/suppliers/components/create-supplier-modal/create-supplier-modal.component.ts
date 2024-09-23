import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type ISuppliers } from '../../suppliers.model';

@Component({
  selector: 'app-create-supplier-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-supplier-modal.component.html',
})
export class CreateSupplierModalComponent {
  @Output() supplierCreated = new EventEmitter<ISuppliers>();

  onSubmit(supplierForm: NgForm) {
    if (supplierForm.valid) {
      this.supplierCreated.emit(supplierForm.value);
      console.log(supplierForm);
      supplierForm.reset();
    }
  }
}
