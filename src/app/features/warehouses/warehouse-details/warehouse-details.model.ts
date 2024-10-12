export interface IWarehouseDetails {
  id: number
  warehouse_id: number
  section_name: string
  section_type: string
  capacity: number
  empty_slots: number
  reserved_slots: number
  deleted_at?: string | null
  created_at?: string
  updated_at?: string
}
