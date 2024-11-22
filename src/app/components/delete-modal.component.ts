import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="elevation-4 rounded-lg max-w-md w-full mx-4">
        <div class="p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 class="text-xl font-bold text-high mb-4">Confirm Delete</h2>
          <p class="text-text-medium mb-8">{{message}}</p>
          
          <div class="flex justify-center space-x-4">
            <button
              (click)="close.emit()"
              class="px-4 py-2 rounded-lg text-text-medium hover:text-text-high transition-colors"
            >
              Cancel
            </button>
            <button
              (click)="confirm.emit()"
              class="px-4 py-2 rounded-lg bg-error text-white hover:bg-error/90 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DeleteModalComponent {
  @Input() message = 'Are you sure you want to delete this item?';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}