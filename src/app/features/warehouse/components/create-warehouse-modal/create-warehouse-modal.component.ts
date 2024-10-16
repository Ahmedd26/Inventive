import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IWarehouse } from '../../warehouse.model';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { WarehouseService } from '../../warehouse.service';

@Component({
  selector: 'app-create-warehouse-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule],
  templateUrl: './create-warehouse-modal.component.html',
})
export class CreateWarehouseModalComponent {
  @ViewChild('createWarehouseModal')
  createWarehouseModal!: CustomModalComponent;
  @Output() newWarehouse = new EventEmitter<IWarehouse>();
  capacityValidation = '';
  backendErrorMessages = {
    name: '',
    location: '',
    total_capacity: '',
  };

  constructor(private warehouseService: WarehouseService) {}

  capacityNumberValidator(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    if (input.value !== cleanedValue) {
      this.capacityValidation = 'Numbers only';
    } else {
      this.capacityValidation = '';
    }
    input.value = cleanedValue;
  }

  createWarehouse(form: NgForm) {
    this.warehouseService.createWarehouse(form.value).subscribe({
      next: (res) => {
        this.newWarehouse.emit(res);
      },
      error: (error) => {
        if (error.error.errors) {
          this.backendErrorMessages = {
            name: error.error.errors.name?.[0] || '',
            location: error.error.errors.location?.[0] || '',
            total_capacity: error.error.errors.total_capacity?.[0] || '',
          };
        }
      },
    });
  }
}
