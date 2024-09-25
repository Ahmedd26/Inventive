import { SuppliersService } from './../../suppliers.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISupplier } from '../../suppliers.model';

interface Errors {
  name?: string[];
  email?: string[];
  phone?: string[];
  address?: string[];
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

  constructor(private suppliersService: SuppliersService) {}

  onSubmit(updatedSupplier: ISupplier) {
    this.suppliersService.update(updatedSupplier, this.supplier.id).subscribe(
      (res) => {
        this.updatedSupplier.emit(res);
        this.onCloseModal();
      },
      (error) => {
        this.errors.name = error.error.errors.name;
        this.errors.email = error.error.errors.email;
        this.errors.phone = error.error.errors.phone;
        this.errors.address = error.error.errors.address;
      }
    );
  }
  onCloseModal() {
    this.closeModal.emit();
  }
}
