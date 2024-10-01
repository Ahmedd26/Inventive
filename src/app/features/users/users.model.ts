export interface IUser {
    id?: number
    name: string
    email: string
    email_verified_at?: string
    role_id: number
    password?: string
    password_confirmation?: string
    created_at?: string
    updated_at?: string
    role?: IRole
  }
  
  export interface IRole {
    id: number
    name: string
    created_at: string
    updated_at: string
  }