// export interface IProduct {
//   name: string;
//   description: string;
//   sku: string;
//   price: string;
//   quantity: string;
//   category_id: string;
//   supplier_id: string;
//   image: File | string;
//   updated_at?: string;
//   created_at?: string;
//   id?: number;
// }

import { ICategory } from '../categories/categories.model';
import { ISupplier } from '../suppliers/suppliers.model';

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  category_id: number;
  supplier_id: number;
  image: string;
  created_at?: string;
  updated_at?: string;
  category?: ICategory;
  supplier?: ISupplier;
  inventory_movements?: IInventoryMovement[];
  product_sales_orders?: IProductSalesOrder[];
  product_purchase_orders?: any[];
  adjustments?: IAdjustment[];
}

export interface IInventoryMovement {
  id: number;
  product_id: number;
  quantity: number;
  related_order_id: number;
  movement_type: string;
  created_at: string;
  updated_at: string;
}

export interface IProductSalesOrder {
  id: number;
  product_id: number;
  sales_order_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  sales_order: ISalesOrder;
}

export interface ISalesOrder {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IAdjustment {
  id: number;
  product_id: number;
  quantity_adjusted: number;
  reason: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
