export interface PaymentMethod {
  id: number;
  name: string;
  enabled: boolean;
  requireCardInfo: boolean;
}
