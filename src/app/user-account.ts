export interface UserAddress {
  id?: number;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  provinceCode?: string;
  postalCode: string;
}

export interface UserFinance {
  budgetRangeFromInK: number;
  budgetRangeToInK: number;
}

export interface UserProfile {
  userAddress?: UserAddress;
  userFinance?: UserFinance;
}

export interface UserAccount {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  address?: UserAddress;
}

export type UserProfileMode = 'New' | 'Update' | 'View';
