import { HttpErrorResponse } from '@angular/common/http';
import { WarehouseService } from './warehouse.service';
import { Component, OnInit } from '@angular/core';
import { IWarehouse } from './warehouse.model';
import { IconsModule } from '../../shared/icons/icons.module';
import { SectionTypeSvgComponent } from './components/section-type-svg/section-type-svg.component';
import { WarehouseCardComponent } from './components/ui/warehouse-card/warehouse-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CreateWarehouseModalComponent } from './components/create-warehouse-modal/create-warehouse-modal.component';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    IconsModule,
    SectionTypeSvgComponent,
    WarehouseCardComponent,
    LoadingComponent,
    CreateWarehouseModalComponent,
  ],
  templateUrl: './warehouse.component.html',
})
export class WarehouseComponent implements OnInit {
  isLoading = false;
  warehouses: IWarehouse[] = [];
  constructor(private warehouseService: WarehouseService) {}

  addNewWarehouse(warehouse: IWarehouse) {
    this.warehouses.push(warehouse);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.warehouseService.getAllWarehouses().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.warehouses = res;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        // TODO
        console.error(error);
      },
    });
  }
}
