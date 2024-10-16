import { Component, Input, ViewChild } from '@angular/core';
import { CustomModalComponent } from '../../../../../shared/components/custom-modal/custom-modal.component';
import { WarehouseService } from '../../../warehouse.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-warehouse-section-modal',
  standalone: true,
  imports: [CustomModalComponent],
  templateUrl: './delete-warehouse-section-modal.component.html',
})
export class DeleteWarehouseSectionModalComponent {
  @Input({ required: true }) sectionId!: number | string;
  @Input({ required: true }) warehouseId!: number | string;
  @ViewChild('DeleteModal') deleteModal!: CustomModalComponent;
  error = '';
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
  ) {}
  onDelete(id: number | string) {
    this.warehouseService.deleteWarehouseSection(id).subscribe({
      next: () => {
        this.deleteModal.closeModal();
        this.router.navigate(['/warehouse', this.warehouseId]);
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.message;
      },
    });
  }
}
