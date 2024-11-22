import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompareService } from '../../services/compare.service';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-netflix-black p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-white">Compare Products</h1>
          <button
            (click)="router.navigate(['/products'])"
            class="text-netflix-red hover:text-red-400"
          >
            Back to Products
          </button>
        </div>

        <div *ngIf="products().length; else noProducts" class="bg-netflix-dark-gray rounded-lg p-6">
          <div class="grid" [style.grid-template-columns]="'repeat(' + products().length + ', 1fr)'">
            <!-- Headers -->
            <div *ngFor="let product of products()" class="p-4 text-center">
              <div class="relative">
                <button
                  (click)="compareService.removeProduct(product.id)"
                  class="absolute -top-2 -right-2 bg-netflix-red text-white w-6 h-6 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
                <img [src]="product.thumbnail" [alt]="product.title" class="w-full h-40 object-cover rounded mb-3">
                <h3 class="text-white font-medium">{{product.title}}</h3>
                <p class="text-netflix-red font-bold mt-2">\${{product.price}}</p>
              </div>
            </div>

            <!-- Brand -->
            <div *ngFor="let product of products()" class="p-4 border-t border-gray-700">
              <p class="text-gray-400">Brand: {{product.brand}}</p>
            </div>

            <!-- Rating -->
            <div *ngFor="let product of products()" class="p-4 border-t border-gray-700">
              <p class="text-gray-400">Rating: {{product.rating}} ★</p>
            </div>

            <!-- Stock -->
            <div *ngFor="let product of products()" class="p-4 border-t border-gray-700">
              <p class="text-gray-400">Stock: {{product.stock}}</p>
            </div>

            <!-- Description -->
            <div *ngFor="let product of products()" class="p-4 border-t border-gray-700">
              <p class="text-gray-400">{{product.description}}</p>
            </div>
          </div>
        </div>

        <ng-template #noProducts>
          <div class="text-center py-12">
            <p class="text-gray-400">No products selected for comparison.</p>
            <button
              (click)="router.navigate(['/products'])"
              class="mt-4 px-6 py-2 bg-netflix-red text-white rounded hover:bg-red-600"
            >
              Select Products
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class CompareComponent {
  public compareService = inject(CompareService);
  protected router = inject(Router);

  products = computed(() => this.compareService.getProducts());
}
