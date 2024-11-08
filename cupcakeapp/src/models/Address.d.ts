export interface Address {
  id: number;
  address: string;
  addressExtended: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
