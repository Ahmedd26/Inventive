import { IProduct } from '../products/products.model';
import { IProductPurchaseOrders } from '../products/products.model';
import { IUser } from '../users/users.model';

export interface ISupplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  products?: IProduct[];
  purchase_orders?: ISupplierPurchaseOrders[];
}

export interface ISupplierError {
  name?: string[];
  email?: string[];
  phone?: string[];
  address?: string[];
  image?: string[];
}

export interface ISupplierPurchaseOrders {
  id: number;
  user_id: number;
  supplier_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}
