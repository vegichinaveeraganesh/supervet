import { Pet } from './pet.model';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  pets: Pet[];
  addresses: Address[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'user' | 'doctor' | 'staff' | 'admin';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
