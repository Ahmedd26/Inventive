import { Component } from '@angular/core';
import { WarehouseService } from './warehouse.service';
import { IWarehouse } from './warehouse.model';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [LoadingComponent, FormsModule, NgIf],
  templateUrl: './warehouse.component.html',
})


export class WarehouseComponent {

  isLoading = true;
  warehousesArray!: IWarehouse[]
  capacityPattern = "^[1-9][0-9]*$"
  APIerrors = null;
  updateAPIerrors = null

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.isLoading = true;
    this.warehouseService.getAll().subscribe({
      next: data => {
        this.isLoading = false;
        // console.log(data)
        this.warehousesArray = data
      },
      error: errorRes => {
        console.log(errorRes)
      }
    })
  }

  onCreateWarehouse(form: IWarehouse) {
    this.warehouseService.create(form).subscribe({
      next: respose => {
        this.APIerrors = null
        this.warehousesArray.push(respose)
      },
      error: errorRes => {
        this.APIerrors = errorRes.error.errors;
        console.log(errorRes)
      }
    })
  }

  onDeleteWarehouse(id: number) {
    this.warehouseService.delete(id).subscribe({
      next: respose => {
        this.warehousesArray = this.warehousesArray.filter(
          (element) => element.id !== id
        );
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })
  }

  onUpdateWarehouse(form: IWarehouse, id: number) {
    this.warehouseService.update(form, id).subscribe({
      next: data => {
        this.updateAPIerrors = null
        this.warehousesArray = this.warehousesArray.map((element) => {
          if (element.id === id) {
            return {
              ...element, name: form.name,
              location: form.location,
              total_capacity: form.total_capacity
            };
          }
          return element;
        })
      },
      error: errorRes => {
        // console.log(errorRes)
        this.updateAPIerrors = errorRes.error.errors
      }
    })
  }

}
