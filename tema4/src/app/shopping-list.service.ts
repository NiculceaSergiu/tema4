import { Injectable, signal } from '@angular/core';
import { ShoppingItem } from './shopping-item.model';

const STORAGE_KEY = 'tema4-shopping-list';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private readonly itemsSignal = signal<ShoppingItem[]>(this.loadItems());
  readonly items = this.itemsSignal.asReadonly();

  addItem(data: Omit<ShoppingItem, 'id' | 'bought' | 'createdAt'>): void {
    const item: ShoppingItem = {
      ...data,
      id: crypto.randomUUID(),
      bought: false,
      createdAt: new Date().toISOString(),
    };

    this.updateItems([item, ...this.itemsSignal()]);
  }

  updateItem(id: string, data: Omit<ShoppingItem, 'id' | 'bought' | 'createdAt'>): void {
    const items = this.itemsSignal().map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );
    this.updateItems(items);
  }

  toggleBought(id: string): void {
    const items = this.itemsSignal().map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item,
    );
    this.updateItems(items);
  }

  deleteItem(id: string): void {
    this.updateItems(this.itemsSignal().filter((item) => item.id !== id));
  }

  clearBought(): void {
    this.updateItems(this.itemsSignal().filter((item) => !item.bought));
  }

  private updateItems(items: ShoppingItem[]): void {
    this.itemsSignal.set(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private loadItems(): ShoppingItem[] {
    const savedItems = localStorage.getItem(STORAGE_KEY);

    if (savedItems) {
      try {
        return JSON.parse(savedItems) as ShoppingItem[];
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return [
      {
        id: 'demo-1',
        name: 'Lapte',
        quantity: 2,
        category: 'alimente',
        bought: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-2',
        name: 'Detergent',
        quantity: 1,
        category: 'curatenie',
        bought: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-3',
        name: 'Pasta de dinti',
        quantity: 1,
        category: 'igiena',
        bought: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
