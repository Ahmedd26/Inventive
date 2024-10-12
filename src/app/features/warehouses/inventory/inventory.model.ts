import { IProduct } from "../../products/products.model"
import { IWarehouseDetails } from "../warehouse-details/warehouse-details.model"

export interface IInventory {
  id: number
  warehouse_section_id: number
  product_id: number
  quantity: number
  deleted_at?: any
  created_at?: string
  updated_at?: string
  product: IProduct
  warehouse_section: IWarehouseDetails
}
