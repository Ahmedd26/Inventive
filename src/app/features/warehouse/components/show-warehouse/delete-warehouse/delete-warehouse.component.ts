import { Router } from '@angular/router';
import { WarehouseService } from '../../../warehouse.service';
import { Component, Input, ViewChild } from '@angular/core';
import { CustomModalComponent } from '../../../../../shared/components/custom-modal/custom-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-warehouse',
  standalone: true,
  imports: [CustomModalComponent],
  templateUrl: './delete-warehouse.component.html',
})
export class DeleteWarehouseComponent {
  @Input() id!: number | string;
  @ViewChild('DeleteModal') deleteModal!: CustomModalComponent;
  error = '';
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
  ) {}
  onDelete(id: number | string) {
    this.warehouseService.deleteWarehouse(id).subscribe({
      next: () => {
        this.deleteModal.closeModal();
        this.router.navigate(['/warehouse']);
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.message;
      },
    });
  }
}
