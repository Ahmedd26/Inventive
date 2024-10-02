export interface ISupplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?:string;
  created_at?: string;
  updated_at?: string;
}
