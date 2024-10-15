import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection, IWarehouse } from '../../warehouse.model';
import { WarehouseService } from '../../warehouse.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DeleteWarehouseComponent } from './delete-warehouse/delete-warehouse.component';
import { HttpErrorResponse } from '@angular/common/http';
import { WarehouseSectionCardComponent } from '../ui/warehouse-section-card/warehouse-section-card.component';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { CreateWarehouseSectionComponent } from './create-warehouse-section/create-warehouse-section.component';

@Component({
  selector: 'app-show-warehouse',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    FormsModule,
    DeleteWarehouseComponent,
    WarehouseSectionCardComponent,
    CustomModalComponent,
    CreateWarehouseSectionComponent,
  ],
  templateUrl: './show-warehouse.component.html',
})
export class ShowWarehouseComponent implements OnInit {
  isLoading = false;
  warehouse!: IWarehouse;
  warehouseName = '';
  success = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
  ) {}

  warehouseForm(form: NgForm) {
    this.warehouseService
      .updateWarehouse(this.warehouse.id, form.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.warehouse = res;
          this.success = 'Warehouse updated';
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  addSection(section: ISection) {
    this.warehouse.sections.push(section);
  }

  ngOnInit(): void {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.warehouseService.getWarehouse(routeId).subscribe({
      next: (warehouse) => {
        this.isLoading = false;
        this.warehouse = warehouse;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
