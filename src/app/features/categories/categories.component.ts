import { AfterViewInit, Component, OnChanges } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ICategory } from './categories.model';
import { initFlowbite } from 'flowbite';
import { HttpClient } from '@angular/common/http';
import { API } from '../../core/utils/constants.utils';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements AfterViewInit, OnChanges {

  ngAfterViewInit() {
    initFlowbite();
  }
  ngOnChanges() {
    initFlowbite();
  }


  categoriesArray!: ICategory[]
  errorTypes = null
  errorUpdates = null
  constructor(private categoryServ: CategoriesService, private http: HttpClient) { }

  onCreateCategory(categoryData: ICategory) {
    this.categoryServ.createCategory(categoryData)
      .subscribe({
        next: data => {
          console.log("inside subscribe")
          console.log(data)
        },
        error: error => {
          console.log(error)
          this.errorTypes = error.error.errors
          console.log(this.errorTypes)
        }
      })
    console.log(categoryData)
  }

  onDeleteCategory(categId: any) {
    this.categoryServ.deleteCategory(categId).subscribe({
      next: () => {
        console.log(categId, "deleted")
      },
      error: error => {
        console.log("alert ERRORRRRR")
        console.log(error)
      }
    })
    console.log(categId)
    console.log(this.categoriesArray.length)
    this.categoriesArray = this.categoriesArray.filter((element) => element.id !== categId)
    console.log(this.categoriesArray.length)
  }

  ngOnInit() {
    this.categoryServ.getAllCategories().subscribe({
      next: data => {
        // console.log(data)
        this.categoriesArray = data
        console.log("Products array length is", this.categoriesArray.length)
      }
    })
  }

  onUpdateCategory(categoryData: ICategory, categId: any) {
    console.log(categoryData, categId)
    this.categoryServ.updateCategory(categoryData, categId).subscribe({
      next: data => {
        console.log(data)
        this.categoriesArray = this.categoriesArray.map((element) => {
          if (element.id === categId) {
            return { ...element, name: categoryData.name }
          }
          return element
        });
      },
      error: errorRes => {
        this.errorUpdates = errorRes.error.errors
        console.log(errorRes)
      }
    })
  }

}
