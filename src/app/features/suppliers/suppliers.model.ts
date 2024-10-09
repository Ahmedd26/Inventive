import { IProduct } from '../products/products.model';

export interface ISupplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at?: string;
  updated_at?: string;
  products?: IProduct[];
}
