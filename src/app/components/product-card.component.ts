import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card group">
      <div class="relative aspect-w-16 aspect-h-9 mb-4">
        <img 
          [src]="product.thumbnail" 
          [alt]="product.title" 
          class="w-full h-48 object-cover rounded-lg"
        >
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200"></div>
      </div>
      
      <div class="space-y-2">
        <div class="flex justify-between items-start">
          <h3 class="text-high font-medium flex-grow line-clamp-2">{{product.title}}</h3>
          <span class="ml-2 px-2 py-1 text-xs rounded bg-primary/10 text-primary">
            {{product.rating}} ★
          </span>
        </div>
        
        <p class="text-medium text-sm line-clamp-2">{{product.description}}</p>
        
        <div class="flex justify-between items-center">
          <p class="text-primary font-bold">\${{product.price}}</p>
          <span class="text-medium text-sm">Stock: {{product.stock}}</span>
        </div>
        
        <p class="text-disabled text-xs">{{product.brand}}</p>
        
        <div class="flex justify-between items-center pt-2 space-x-2">
          <button
            (click)="viewDetails.emit(product)"
            class="btn-secondary flex-1"
          >
            View Details
          </button>
          <button
            (click)="toggleCompare.emit(product)"
            [class.bg-primary]="isSelected"
            [class.text-surface-0]="isSelected"
            [class.bg-surface-4]="!isSelected"
            [class.hover:bg-primary]="!isSelected"
            class="px-3 py-2 rounded-lg text-sm transition-colors flex-1"
          >
            {{ isSelected ? 'Selected' : 'Compare' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isSelected = false;
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() toggleCompare = new EventEmitter<Product>();
}