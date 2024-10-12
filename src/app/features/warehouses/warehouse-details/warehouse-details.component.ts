import { Component } from '@angular/core';
import { WarehouseDetailsService } from './warehouse-details.service';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IWarehouseDetails } from './warehouse-details.model';
import { IWarehouse } from '../warehouse/warehouse.model';
import { WarehouseService } from '../warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse-details',
  standalone: true,
  imports: [LoadingComponent, NgIf, FormsModule],
  templateUrl: './warehouse-details.component.html'
})
export class WarehouseDetailsComponent {

  isLoading = true;
  warehouseSectionsArray!: IWarehouseDetails[]
  warehousesArray!: IWarehouse[]
  numbersPattern = "^[1-9][0-9]*$"
  APIerrors = null;
  APICapacityError = null;
  APIUpdateCapErr = null;
  updateAPIerrors = null;

  constructor(private warehouseDetailsService: WarehouseDetailsService, private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.isLoading = true
    this.warehouseDetailsService.getAll().subscribe({
      next: response => {
        this.isLoading = false;
        // console.log(response)
        this.warehouseSectionsArray = response
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })

    this.warehouseService.getAll().subscribe({
      next: response => {
        this.isLoading = false;
        // console.log(response)
        this.warehousesArray = response
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })
  }

  onCreateSection(section: IWarehouseDetails) {
    console.log(section)
    this.warehouseDetailsService.create(section).subscribe({
      next: response => {
        this.APIerrors = null
        this.APICapacityError = null
        this.warehouseSectionsArray.push(response)
      },
      error: errorRes => {
        this.APIerrors = errorRes.error.errors;
        this.APICapacityError = errorRes.error.message;
        // console.log(errorRes)
      }
    })
  }

  onDeleteSection(id: number) {
    this.warehouseDetailsService.delete(id).subscribe({
      next: response => {
        this.warehouseSectionsArray = this.warehouseSectionsArray.filter(
          (element) => element.id !== id
        );
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })
  }

  onUpdateSection(form: IWarehouseDetails, id: number) {
    console.log(form)
    this.warehouseDetailsService.update(form, id).subscribe({
      next: data => {
        this.updateAPIerrors = null
        this.APIUpdateCapErr = null
        this.warehouseSectionsArray = this.warehouseSectionsArray.map((element) => {
          if (element.id === id) {
            return {
              ...element, section_name: form.section_name,
              section_type: form.section_type,
              capacity: form.capacity,
              empty_slots: form.empty_slots,
              reserved_slots: form.reserved_slots,
              warehouse_id: form.warehouse_id
            };
          }
          return element;
        })
      },
      error: errorRes => {
        this.updateAPIerrors = errorRes.error.errors
        this.APIUpdateCapErr = errorRes.error.message;
      }
    })
  }
}
