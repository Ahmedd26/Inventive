import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { RouterLink } from '@angular/router';
import { IWarehouse } from '../../../warehouse.model';
import { WarehouseSectionCardComponent } from '../warehouse-section-card/warehouse-section-card.component';

@Component({
  selector: 'app-warehouse-card',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    RouterLink,
    WarehouseSectionCardComponent,
  ],
  templateUrl: './warehouse-card.component.html',
})
export class WarehouseCardComponent {
  @Input() warehouse!: IWarehouse;
}
