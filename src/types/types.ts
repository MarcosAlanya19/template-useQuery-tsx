export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  inStock: boolean;
}

export type PartialProduct = Partial<IProduct>;
