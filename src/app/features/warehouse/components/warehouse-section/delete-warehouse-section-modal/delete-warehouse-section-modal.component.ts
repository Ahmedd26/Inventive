import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-warehouse-section-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-warehouse-section-modal.component.html',
})
export class DeleteWarehouseSectionModalComponent {
  @Input({ required: true }) sectionId!: number | string;
}
