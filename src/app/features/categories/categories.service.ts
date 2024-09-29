import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { HttpClient } from '@angular/common/http';
import { ICategory } from './categories.model';

const ENDPOINT = `${API}categories/`;


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<ICategory[]>(ENDPOINT)
  }

  createCategory(category: ICategory) {
    return this.http.post<ICategory>(ENDPOINT, category)
  }

  deleteCategory(categId: any) {
    return this.http.delete(ENDPOINT + categId)
  }

  updateCategory(categoryData: ICategory, categId: any) {
    return this.http.patch<ICategory>(ENDPOINT + categId, categoryData)
  }


}
