import { HttpErrorResponse } from '@angular/common/http';
import { WarehouseService } from './warehouse.service';
import { Component, OnInit } from '@angular/core';
import { IWarehouse } from './warehouse.model';
import { IconsModule } from '../../shared/icons/icons.module';
import { SectionTypeSvgComponent } from './components/section-type-svg/section-type-svg.component';
import { WarehouseCardComponent } from './components/ui/warehouse-card/warehouse-card.component';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [IconsModule, SectionTypeSvgComponent, WarehouseCardComponent],
  templateUrl: './warehouse.component.html',
})
export class WarehouseComponent implements OnInit {
  isLoading = false;
  warehouses: IWarehouse[] = [];
  constructor(private warehouseService: WarehouseService) {}

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
