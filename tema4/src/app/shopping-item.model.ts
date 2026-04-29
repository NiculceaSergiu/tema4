export type ShoppingCategory = 'alimente' | 'curatenie' | 'igiena' | 'diverse';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: ShoppingCategory;
  bought: boolean;
  createdAt: string;
}
