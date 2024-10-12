import { Component } from '@angular/core';
import { InventoryService } from './inventory.service';
import { IInventory } from './inventory.model';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { FormsModule } from '@angular/forms';
import { IWarehouseDetails } from '../warehouse-details/warehouse-details.model';
import { IProduct } from '../../products/products.model';
import { WarehouseDetailsService } from '../warehouse-details/warehouse-details.service';
import { ProductsService } from '../../products/products.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [LoadingComponent, FormsModule, NgIf],
  templateUrl: './inventory.component.html'
})


export class InventoryComponent {

  isLoading = true;
  inventoryArray!: IInventory[]
  sectionsArray!: IWarehouseDetails[]
  productsArray!: IProduct[]
  quantityPattern = "^[1-9][0-9]*$"
  APIerrors = null;
  updateAPIerrors = null

  constructor(private inventoryService: InventoryService, private warehouseDetailsService: WarehouseDetailsService, private productService: ProductsService) { }


  ngOnInit() {
    this.isLoading = true;
    this.inventoryService.getAll().subscribe({
      next: response => {
        this.isLoading = false;
        this.inventoryArray = response
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })

    this.warehouseDetailsService.getAll().subscribe({
      next: response => {
        this.isLoading = false;
        this.sectionsArray = response
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })

    this.productService.getAll().subscribe({
      next: response => {
        this.isLoading = false;
        this.productsArray = response
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })

  }


  onCreateInventory(form: IInventory) {
    this.inventoryService.create(form).subscribe({
      next: respose => {
        this.APIerrors = null
        this.inventoryArray.push(respose)
      },
      error: errorRes => {
        this.APIerrors = errorRes.error.errors;
        // console.log(errorRes)
      }
    })
  }

  onUpdateInventory(form: IInventory, id: number) {
    this.inventoryService.update(form, id).subscribe({
      next: data => {
        this.updateAPIerrors = null
        this.inventoryArray = this.inventoryArray.map((element) => {
          if (element.id === id) {
            return {
              ...element, warehouse_section_id: form.warehouse_section_id,
              product_id: form.product_id,
              quantity: form.quantity
            };
          }
          return element;
        })
      },
      error: errorRes => {
        this.updateAPIerrors = errorRes.error.errors
        // console.log(errorRes)
      }
    })
  }

  onDeleteInventory(id: number) {
    this.inventoryService.delete(id).subscribe({
      next: respose => {
        this.inventoryArray = this.inventoryArray.filter(
          (element) => element.id !== id
        );
      },
      error: errorRes => {
        // console.log(errorRes)
      }
    })
  }

}
