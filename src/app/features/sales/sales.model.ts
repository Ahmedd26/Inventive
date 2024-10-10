import { IProduct } from '../products/products.model';
import { IUser } from '../users/users.model';

export interface ISalesOrder {
  id: number;
  user_id: number;
  total_amount: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  customer_id: number;
  user: IUser;
  product_sales_orders: ProductSalesOrder[];
  customer: Customer;
}

export interface ProductSalesOrder {
  id: number;
  product_id: number;
  sales_order_id: number;
  quantity: number;
  price: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
