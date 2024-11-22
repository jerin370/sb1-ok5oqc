import { computed, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../services/product.service';

export interface SearchState {
  global: string;
  electronics: string;
  fashion: string;
  home: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppState {
  // Products state
  private readonly _products = signal<Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);

  // Search state
  private readonly _search = signal<SearchState>({
    global: '',
    electronics: '',
    fashion: '',
    home: ''
  });

  // Pagination state
  private readonly _pagination = signal<PaginationState>({
    currentPage: 0,
    pageSize: 5,
    category: ''
  });

  // Computed products by category
  readonly electronics = computed(() => 
    this._products().filter(p => 
      ['smartphones', 'laptops'].includes(p.category)
    )
  );

  readonly fashion = computed(() => 
    this._products().filter(p => 
      ['mens-watches', 'womens-watches', 'mens-shirts', 'womens-dresses', 
       'mens-shoes', 'womens-shoes', 'womens-bags'].includes(p.category)
    )
  );

  readonly home = computed(() => 
    this._products().filter(p => 
      ['furniture', 'home-decoration', 'lighting'].includes(p.category)
    )
  );

  // Computed filtered products
  readonly filteredElectronics = computed(() => {
    const globalTerm = this._search().global.toLowerCase();
    const categoryTerm = this._search().electronics.toLowerCase();
    return this.electronics().filter(p => 
      (!globalTerm || p.title.toLowerCase().includes(globalTerm)) &&
      (!categoryTerm || p.title.toLowerCase().includes(categoryTerm))
    );
  });

  readonly filteredFashion = computed(() => {
    const globalTerm = this._search().global.toLowerCase();
    const categoryTerm = this._search().fashion.toLowerCase();
    return this.fashion().filter(p => 
      (!globalTerm || p.title.toLowerCase().includes(globalTerm)) &&
      (!categoryTerm || p.title.toLowerCase().includes(categoryTerm))
    );
  });

  readonly filteredHome = computed(() => {
    const globalTerm = this._search().global.toLowerCase();
    const categoryTerm = this._search().home.toLowerCase();
    return this.home().filter(p => 
      (!globalTerm || p.title.toLowerCase().includes(globalTerm)) &&
      (!categoryTerm || p.title.toLowerCase().includes(categoryTerm))
    );
  });

  // Getters
  getProducts() { return this._products(); }
  getSelectedProduct() { return this._selectedProduct(); }
  getSearch() { return this._search(); }
  getPagination() { return this._pagination(); }

  // Setters
  setProducts(products: Product[]) {
    this._products.set(products);
  }

  setSelectedProduct(product: Product | null) {
    this._selectedProduct.set(product);
  }

  updateSearch(category: keyof SearchState, value: string) {
    this._search.update(state => ({
      ...state,
      [category]: value
    }));
  }

  updatePagination(update: Partial<PaginationState>) {
    this._pagination.update(state => ({
      ...state,
      ...update
    }));
  }
}