export interface UserAddress {
  id?: number;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  provinceCode?: string;
  postalCode: string;
}

export interface UserAccount {
  id?: number;
  email: string;
  password?: string;
  phone?: string;
  address?: UserAddress;
}
