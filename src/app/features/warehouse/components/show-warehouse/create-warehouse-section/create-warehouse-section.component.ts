import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomModalComponent } from '../../../../../shared/components/custom-modal/custom-modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { WarehouseService } from '../../../warehouse.service';

@Component({
  selector: 'app-create-warehouse-section',
  standalone: true,
  imports: [CustomModalComponent, FormsModule],
  templateUrl: './create-warehouse-section.component.html',
})
export class CreateWarehouseSectionComponent {
  @Input() warehouseId!: number | string;
  @Output() newSection = new EventEmitter();
  @ViewChild('createSectionModal') createSectionModal!: CustomModalComponent;
  errorMessage: string = '';
  capacityErrorMessage = '';
  constructor(private warehouseService: WarehouseService) {}

  openModal() {
    this.createSectionModal.openModal();
  }

  capacityNumberValidator(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    if (input.value !== cleanedValue) {
      this.errorMessage = 'Numbers only';
    } else {
      this.errorMessage = '';
    }
    input.value = cleanedValue;
  }
  createSection(form: NgForm) {
    const body = {
      warehouse_id: this.warehouseId,
      section_name: form.value.section_name,
      section_type: form.value.section_type,
      capacity: form.value.capacity,
    };
    this.warehouseService.createWarehouseSection(body).subscribe({
      next: (res) => {
        this.newSection.emit(res);
        this.createSectionModal.closeModal();
      },
      error: (error) => {
        this.capacityErrorMessage = error.error.message;
      },
    });
  }
}
