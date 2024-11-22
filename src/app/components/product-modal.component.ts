import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="elevation-4 rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-high">{{product.title}}</h2>
            <button 
              (click)="close.emit()"
              class="text-text-medium hover:text-text-high transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative aspect-w-16 aspect-h-9">
              <img 
                [src]="product.thumbnail" 
                [alt]="product.title"
                class="w-full rounded-lg object-cover"
              >
            </div>
            <div class="space-y-4">
              <p class="text-text-medium">{{product.description}}</p>
              <div class="flex items-center justify-between">
                <p class="text-2xl font-bold text-primary">\${{product.price}}</p>
                <div class="flex items-center space-x-2">
                  <span class="text-primary">{{product.rating}}</span>
                  <span class="text-primary">★</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-text-medium">
                <span>Brand: {{product.brand}}</span>
                <span>Stock: {{product.stock}}</span>
              </div>
              <button
                (click)="addToCart.emit(product)"
                class="w-full btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();
}