import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="elevation-4 rounded-lg max-w-2xl w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-high">Shopping Cart</h2>
            <button 
              (click)="close.emit()"
              class="text-text-medium hover:text-text-high transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div *ngIf="cartService.getItems()().length; else emptyCart" class="space-y-4">
            <div *ngFor="let item of cartService.getItems()()" class="elevation-2 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img [src]="item.thumbnail" [alt]="item.title" class="w-16 h-16 rounded-lg object-cover">
                  <div>
                    <h3 class="text-high font-medium">{{item.title}}</h3>
                    <p class="text-primary">\${{item.price}}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <button 
                      (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
                      class="elevation-1 w-8 h-8 rounded-lg flex items-center justify-center text-text-high hover:text-primary transition-colors"
                    >
                      -
                    </button>
                    <span class="text-text-high w-8 text-center">{{item.quantity}}</span>
                    <button 
                      (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
                      class="elevation-1 w-8 h-8 rounded-lg flex items-center justify-center text-text-high hover:text-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    (click)="cartService.removeFromCart(item.id)"
                    class="text-error hover:text-error/80 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div class="pt-4 border-t border-surface-4">
              <div class="flex justify-between items-center">
                <span class="text-text-medium">Total:</span>
                <span class="text-2xl font-bold text-primary">\${{cartService.totalAmount()}}</span>
              </div>
            </div>
          </div>
          
          <ng-template #emptyCart>
            <div class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-text-disabled mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p class="text-text-medium">Your cart is empty</p>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class CartModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}
}