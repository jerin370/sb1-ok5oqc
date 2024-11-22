import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Product } from '../services/product.service';
import { ProductCardComponent } from './product-card.component';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatPaginatorModule],
  template: `
    <div class="elevation-2 rounded-lg h-full">
      <div class="p-6">
        <div class="flex flex-col space-y-4 mb-6">
          <h2 class="text-2xl font-bold text-high">{{title}}</h2>
          <div class="relative">
            <input
              type="text"
              [value]="searchValue"
              (input)="search.emit($event)"
              [placeholder]="'Search ' + title.toLowerCase() + '...'"
              class="input-dark pr-10"
            >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-text-medium"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        <div class="space-y-4">
          <app-product-card
            *ngFor="let product of getFilteredProducts()"
            [product]="product"
            [isSelected]="selectedProducts.includes(product.id)"
            (viewDetails)="viewDetails.emit($event)"
            (toggleCompare)="toggleCompare.emit($event)"
          ></app-product-card>
        </div>
      </div>
      
      <div class="border-t border-surface-4">
        <mat-paginator
          *ngIf="products.length > state.getPagination().pageSize"
          [length]="products.length"
          [pageSize]="state.getPagination().pageSize"
          [pageSizeOptions]="[5, 10, 25]"
          (page)="onPageChange($event)"
          [hidePageSize]="true"
          class="bg-transparent text-high"
        ></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    ::ng-deep .mat-mdc-paginator {
      background: transparent !important;
    }
    ::ng-deep .mat-mdc-paginator-container {
      color: var(--text-high) !important;
    }
    ::ng-deep .mat-mdc-paginator-range-label {
      color: var(--text-medium) !important;
    }
    ::ng-deep .mat-mdc-icon-button {
      color: var(--primary) !important;
    }
    ::ng-deep .mat-mdc-paginator {
      border-radius: 0 0 0.5rem 0.5rem;
    }
  `]
})
export class CategorySectionComponent {
  @Input() title!: string;
  @Input() products: Product[] = [];
  @Input() searchValue: string = '';
  @Input() selectedProducts: number[] = [];
  @Output() search = new EventEmitter<Event>();
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() toggleCompare = new EventEmitter<Product>();

  protected state = inject(AppState);

  getFilteredProducts(): Product[] {
    const { currentPage, pageSize } = this.state.getPagination();
    const startIndex = currentPage * pageSize;
    return this.products.slice(startIndex, startIndex + pageSize);
  }

  onPageChange(event: PageEvent) {
    this.state.updatePagination({
      currentPage: event.pageIndex,
      pageSize: event.pageSize,
      category: this.title.toLowerCase(),
    });
  }
}