import { IProduct } from '../products/products.model';

export interface IWarehouse {
  id: number;
  name: string;
  location: string;
  total_capacity: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  sections: ISection[];
}

export type TSectionType = 'refrigerator' | 'shelves' | 'other';

export interface ISection {
  id: number;
  warehouse_id: number;
  section_name: string;
  section_type: TSectionType;
  capacity: number;
  empty_slots: number;
  reserved_slots: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  products_warehouse: IProductsWarehouse[];
}

export interface IProductsWarehouse {
  id: number;
  warehouse_section_id: number;
  product_id: number;
  quantity: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  product: IProduct;
}
