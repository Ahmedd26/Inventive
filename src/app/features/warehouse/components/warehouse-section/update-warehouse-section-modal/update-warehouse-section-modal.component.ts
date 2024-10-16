import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ISection } from '../../../warehouse.model';
import { WarehouseService } from '../../../warehouse.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomModalComponent } from '../../../../../shared/components/custom-modal/custom-modal.component';

@Component({
  selector: 'app-update-warehouse-section-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule],
  templateUrl: './update-warehouse-section-modal.component.html',
})
export class UpdateWarehouseSectionModalComponent implements OnInit {
  @Input({ required: true }) IncomingSection!: ISection;
  section: ISection = {} as ISection;
  @Output() updatedSection = new EventEmitter<ISection>();
  @ViewChild('updateSectionModal') updateSectionModal!: CustomModalComponent;
  errorMessage: string = '';
  capacityErrorMessage = '';
  constructor(private warehouseService: WarehouseService) {}

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

  updateSection(form: NgForm) {
    console.log(form.value);
    this.warehouseService
      .updateWarehouseSection(this.section.id, form.value)
      .subscribe({
        next: (res) => {
          this.updatedSection.emit(res);
          this.updateSectionModal.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
        },
      });
  }

  ngOnInit(): void {
    this.section = JSON.parse(JSON.stringify(this.IncomingSection));
  }
}
