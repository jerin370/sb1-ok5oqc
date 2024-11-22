import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../state/app.state';
import { ProductModalComponent } from '../../components/product-modal.component';
import { CartModalComponent } from '../../components/cart-modal.component';
import { CategorySectionComponent } from '../../components/category-section.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductModalComponent,
    CartModalComponent,
    CategorySectionComponent,
  ],
  template: `
    <div class="min-h-screen bg-surface-0">
      <!-- Navigation -->
      <nav class="nav-dark">
        <div class="container-responsive mx-auto">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-4">
              <span class="text-primary text-2xl font-bold">MYAPP</span>
              <h1 class="text-xl font-medium text-high hidden sm:block">Products</h1>
            </div>
            
            <div class="flex items-center space-x-3">
              <button
                *ngIf="compareService.getSelectedIds().length > 0"
                (click)="router.navigate(['/compare'])"
                class="btn-primary hidden sm:flex items-center space-x-2"
              >
                <span>Compare</span>
                <span class="bg-surface-0/20 px-2 py-0.5 rounded-full text-sm">
                  {{compareService.getSelectedIds().length}}
                </span>
              </button>
              
              <button
                (click)="showCart = true"
                class="relative text-high hover:text-primary transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span 
                  *ngIf="cartService.totalItems() > 0"
                  class="absolute -top-1 -right-1 bg-primary text-surface-0 text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{cartService.totalItems()}}
                </span>
              </button>
              
              <button
                (click)="logout()"
                class="btn-primary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="container-responsive mx-auto pt-24 pb-12">
        <!-- Global Search -->
        <div class="mb-8">
          <input
            type="text"
            [value]="state.getSearch().global"
            (input)="updateGlobalSearch($event)"
            placeholder="Search all products..."
            class="input-dark"
          >
        </div>

        <!-- Categories -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <app-category-section
            title="Electronics"
            [products]="state.filteredElectronics()"
            [searchValue]="state.getSearch().electronics"
            [selectedProducts]="compareService.getSelectedIds()"
            (search)="updateElectronicsSearch($event)"
            (viewDetails)="openProductModal($event)"
            (toggleCompare)="toggleCompare($event)"
          ></app-category-section>

          <app-category-section
            title="Fashion"
            [products]="state.filteredFashion()"
            [searchValue]="state.getSearch().fashion"
            [selectedProducts]="compareService.getSelectedIds()"
            (search)="updateFashionSearch($event)"
            (viewDetails)="openProductModal($event)"
            (toggleCompare)="toggleCompare($event)"
          ></app-category-section>

          <app-category-section
            title="Home & Living"
            [products]="state.filteredHome()"
            [searchValue]="state.getSearch().home"
            [selectedProducts]="compareService.getSelectedIds()"
            (search)="updateHomeSearch($event)"
            (viewDetails)="openProductModal($event)"
            (toggleCompare)="toggleCompare($event)"
          ></app-category-section>
        </div>
      </main>

      <!-- Modals -->
      <app-product-modal
        *ngIf="state.getSelectedProduct()"
        [product]="state.getSelectedProduct()!"
        (close)="state.setSelectedProduct(null)"
        (addToCart)="addToCart($event)"
      ></app-product-modal>

      <app-cart-modal
        *ngIf="showCart"
        (close)="showCart = false"
      ></app-cart-modal>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  public compareService = inject(CompareService);
  protected router = inject(Router);
  protected state = inject(AppState);

  showCart = false;

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.state.setProducts(products);
      this.compareService.setProducts(products);
    });
  }

  updateGlobalSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.state.updateSearch('global', input.value);
  }

  updateElectronicsSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.state.updateSearch('electronics', input.value);
  }

  updateFashionSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.state.updateSearch('fashion', input.value);
  }

  updateHomeSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.state.updateSearch('home', input.value);
  }

  toggleCompare(product: Product) {
    this.compareService.toggleProduct(product);
  }

  openProductModal(product: Product) {
    this.state.setSelectedProduct(product);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.state.setSelectedProduct(null);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}