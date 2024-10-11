export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  rememberMe: boolean;
  role_id: number;
}
export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserData {
  name: string;
  email: string;
  role_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  image?: string;
  email_verified_at?: Date;
}

export interface AuthResponseData {
  user: UserData;
  token: string;
}
