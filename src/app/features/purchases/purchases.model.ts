import { IProduct } from "../products/products.model"
import { ISupplier } from "../suppliers/suppliers.model"

export interface IPurchase {
  id?: number
  user_id: number
  supplier_id: number
  total_amount: number
  status: string
  created_at?: string
  updated_at?: string
  user: IUser
  supplier: ISupplier
  product_purchase_orders: IProductPurchaseOrder[]
}

export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: string
  role_id: number
  created_at?: string
  updated_at?: string
}


export interface IProductPurchaseOrder {
  id: number
  product_id: number
  purchase_order_id: number
  quantity: number
  price: number
  created_at?: string
  updated_at?: string
  product: IProduct
}

