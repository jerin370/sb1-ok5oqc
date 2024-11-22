import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-netflix-black">
      <nav class="bg-netflix-black shadow border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <span class="text-netflix-red text-2xl font-bold">MYAPP</span>
              <h1 class="ml-8 text-xl font-medium text-gray-200">My Dashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
              <a
                routerLink="/products"
                class="px-4 py-2 text-sm text-white bg-netflix-red rounded hover:bg-[#f40612]"
              >
                View Products
              </a>
              <button
                (click)="logout()"
                class="px-4 py-2 text-sm text-white bg-netflix-red rounded hover:bg-[#f40612]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <h2 class="text-2xl font-bold mb-6 text-gray-200">Continue Watching</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div *ngFor="let show of watchlist()"
                 class="bg-netflix-dark-gray overflow-hidden shadow rounded-lg hover:scale-105 transition-transform duration-200">
              <img [src]="show.image" [alt]="show.title" class="w-full h-48 object-cover">
              <div class="p-5">
                <h3 class="text-lg font-medium text-gray-200">{{ show.title }}</h3>
                <div class="mt-2 bg-gray-700 rounded-full h-1.5">
                  <div class="bg-netflix-red h-1.5 rounded-full" [style.width]="show.progress + '%'"></div>
                </div>
                <p class="mt-2 text-sm text-gray-400">{{ show.progress }}% completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class CustomerComponent {
  watchlist = signal([
    {
      title: 'Stranger Things',
      image: 'https://source.unsplash.com/random/800x600?sci-fi',
      progress: 75
    },
    {
      title: 'The Crown',
      image: 'https://source.unsplash.com/random/800x600?drama',
      progress: 30
    },
    {
      title: 'Wednesday',
      image: 'https://source.unsplash.com/random/800x600?dark',
      progress: 90
    }
  ]);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}