import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type IProduct } from './products.model';
import { ProductsService } from './products.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {

  productsArray!: IProduct[]
  errorTypes = null
  constructor(private productServ: ProductsService) { }

  onCreateProduct(productData: IProduct) {
    let newId = this.productsArray.length + 1
    const newProduct = { ...productData, id: newId };
    console.log(newProduct)
    this.productServ.createNewProduct(newProduct)
      .subscribe({
        next: (data) => {
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
    console.log(this.productsArray[proId - 1])
    this.productsArray = this.productsArray.filter((element) => element.id !== proId)
    // this.productsArray = this.productsArray.filter((element) => element !== this.productsArray[proId - 1])
    console.log(this.productsArray.length)
  }
}
