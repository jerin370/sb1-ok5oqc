import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private selectedIds = signal<number[]>([]);
  private productList = signal<Product[]>([]);

  maxProducts = 5;

  setProducts(products: Product[]) {
    this.productList.set(products);
  }

  getProducts = computed(() => 
    this.productList().filter(p => this.selectedIds().includes(p.id))
  );

  toggleProduct(product: Product) {
    const currentIds = this.selectedIds();
    if (currentIds.includes(product.id)) {
      this.selectedIds.set(currentIds.filter(id => id !== product.id));
    } else if (currentIds.length < this.maxProducts) {
      this.selectedIds.set([...currentIds, product.id]);
    }
  }

  removeProduct(productId: number) {
    this.selectedIds.set(
      this.selectedIds().filter(id => id !== productId)
    );
  }

  isSelected(productId: number): boolean {
    return this.selectedIds().includes(productId);
  }

  getSelectedIds = computed(() => this.selectedIds());
}