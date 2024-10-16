import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ISection } from '../../warehouse.model';
import { WarehouseService } from '../../warehouse.service';
import { SectionTypeSvgComponent } from '../section-type-svg/section-type-svg.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { UpdateWarehouseSectionModalComponent } from './update-warehouse-section-modal/update-warehouse-section-modal.component';
import { DeleteWarehouseSectionModalComponent } from './delete-warehouse-section-modal/delete-warehouse-section-modal.component';

@Component({
  selector: 'app-warehouse-section',
  standalone: true,
  imports: [
    SectionTypeSvgComponent,
    CommonModule,
    ProductCardComponent,
    UpdateWarehouseSectionModalComponent,
    DeleteWarehouseSectionModalComponent,
  ],
  templateUrl: './warehouse-section.component.html',
})
export class WarehouseSectionComponent implements OnInit {
  isLoading = false;
  section!: ISection;

  constructor(
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.warehouseService.getWarehouseSection(routeId).subscribe({
      next: (section) => {
        this.isLoading = false;
        this.section = section;
        console.log(section);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
  modifySections(section: ISection) {
    this.section = section;
  }
}
