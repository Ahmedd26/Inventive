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
import { IUser } from '../users/users.model';
export interface IProductError {
  name?: string[];
  description?: string[];
  sku?: string[];
  price?: string[];
  quantity?: string[];
  category_id?: string[];
  supplier_id?: string[];
  image?: string[];
}
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
  product_purchase_orders?: IProductPurchaseOrders[];
  adjustments?: IAdjustment[];
  product_warehouse: ProductWarehouse[];
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
  user: IUser;
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

export interface IProductPurchaseOrders {
  id: number;
  product_id: number;
  purchase_order_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}
export interface ProductWarehouse {
  id: number;
  warehouse_section_id: number;
  product_id: number;
  quantity: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  warehouse_section: WarehouseSection;
}

export interface WarehouseSection {
  id: number;
  warehouse_id: number;
  section_name: string;
  section_type: string;
  capacity: number;
  empty_slots: number;
  reserved_slots: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  warehouse: Warehouse;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  total_capacity: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
