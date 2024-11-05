export interface Address {
  id: number;
  address1: string;
  addressExtended: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
