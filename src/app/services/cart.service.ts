import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  totalAmount = computed(() =>
    this.cartItems()
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  getItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      this.cartItems.set(
        currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.set([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems.set(
      this.cartItems().filter((item) => item.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }
}
