import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCategory, ShoppingItem } from './shopping-item.model';
import { ShoppingListService } from './shopping-list.service';

type FilterValue = 'toate' | 'active' | 'cumparate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly fb = inject(FormBuilder);
  readonly shoppingService = inject(ShoppingListService);

  readonly categories: Array<{ value: ShoppingCategory; label: string }> = [
    { value: 'alimente', label: 'Alimente' },
    { value: 'curatenie', label: 'Curatenie' },
    { value: 'igiena', label: 'Igiena' },
    { value: 'diverse', label: 'Diverse' },
  ];

  readonly filter = signal<FilterValue>('toate');
  readonly editingId = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]],
    category: ['alimente' as ShoppingCategory, Validators.required],
  });

  readonly filteredItems = computed(() => {
    const items = this.shoppingService.items();
    const filter = this.filter();

    if (filter === 'active') {
      return items.filter((item) => !item.bought);
    }

    if (filter === 'cumparate') {
      return items.filter((item) => item.bought);
    }

    return items;
  });

  readonly stats = computed(() => {
    const items = this.shoppingService.items();
    const bought = items.filter((item) => item.bought).length;

    return {
      total: items.length,
      active: items.length - bought,
      bought,
    };
  });

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const editingId = this.editingId();

    if (editingId) {
      this.shoppingService.updateItem(editingId, value);
      this.editingId.set(null);
    } else {
      this.shoppingService.addItem(value);
    }

    this.form.reset({
      name: '',
      quantity: 1,
      category: 'alimente',
    });
  }

  startEdit(item: ShoppingItem): void {
    this.editingId.set(item.id);
    this.form.setValue({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({
      name: '',
      quantity: 1,
      category: 'alimente',
    });
  }

  setFilter(value: FilterValue): void {
    this.filter.set(value);
  }

  categoryLabel(value: ShoppingCategory): string {
    return this.categories.find((category) => category.value === value)?.label ?? value;
  }

  trackById(_: number, item: ShoppingItem): string {
    return item.id;
  }
}
