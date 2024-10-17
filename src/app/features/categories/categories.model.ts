import { IProduct } from '../products/products.model';

export interface ICategory {
  id: number;
  name: string;
  deleted_at?: any;
  created_at?: string;
  updated_at?: string;
  products?: IProduct[];
}
