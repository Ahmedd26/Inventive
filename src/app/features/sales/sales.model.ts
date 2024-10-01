import { IProduct } from "../products/products.model"

export interface ISalesOrder {
  id: number
  user_id: number
  total_amount: number
  status: string
  created_at?: string
  updated_at?: string
  user: IUser
  product_sales_orders: IProductSalesOrder[]
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

export interface IProductSalesOrder {
  id: number
  product_id: number
  sales_order_id: number
  quantity: number
  price: number
  created_at?: string
  updated_at?: string
  product: IProduct
}

