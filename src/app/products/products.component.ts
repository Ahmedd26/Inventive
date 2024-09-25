import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type IProduct } from './products.model';
import { ProductsService } from './products.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, NgIf,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {

  productsArray!: IProduct[]
  errorTypes = null
  isLoading = false;

  constructor(private productServ: ProductsService) { }

  onCreateProduct(productData: IProduct) {
    console.log(productData)
    this.isLoading = true;
    this.productServ.createNewProduct(productData)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.productsArray.push(data);
          console.log(data)
        },
        error: error => {
          console.log('alert1')
          console.log(error)
          this.errorTypes = error.error.errors
          console.log('alert2')
          console.log(this.errorTypes)
        }
      })
  }

  ngOnInit() {
    this.productServ.getAllProducts().subscribe((data) => {
      this.productsArray = data
      console.log("Products array length is", this.productsArray.length)
    })
  }
  onDeleteProduct(proId: any) {
    console.log(proId)
    this.productServ.delete(proId).subscribe({
      next: () => {
        console.log(proId, "deleted")
      },
      error: error => {
        console.log(error)
      }
    })
    console.log(this.productsArray.length)
    this.productsArray = this.productsArray.filter((element) => element.id !== proId)
    console.log(this.productsArray.length)
  }
}

