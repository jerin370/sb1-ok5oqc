import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-netflix-black">
      <nav class="bg-netflix-black shadow border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <span class="text-netflix-red text-2xl font-bold">MYAPP</span>
              <h1 class="ml-8 text-xl font-medium text-gray-200">Admin Dashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
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
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-netflix-dark-gray overflow-hidden shadow rounded-lg hover:scale-105 transition-transform duration-200">
              <div class="p-5">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-medium text-gray-200">Total Users</h3>
                  <span class="text-2xl font-bold text-netflix-red">{{ stats().users }}</span>
                </div>
                <p class="mt-1 text-gray-400">Active subscriptions</p>
                <div class="mt-4">
                  <a 
                    routerLink="/admin/users"
                    class="text-netflix-red hover:text-red-400"
                  >
                    Manage Users →
                  </a>
                </div>
              </div>
            </div>
            <div class="bg-netflix-dark-gray overflow-hidden shadow rounded-lg hover:scale-105 transition-transform duration-200">
              <div class="p-5">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-medium text-gray-200">Revenue</h3>
                  <span class="text-2xl font-bold text-netflix-red">{{ stats().revenue }}k</span>
                </div>
                <p class="mt-1 text-gray-400">Monthly recurring</p>
              </div>
            </div>
            <div class="bg-netflix-dark-gray overflow-hidden shadow rounded-lg hover:scale-105 transition-transform duration-200">
              <div class="p-5">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-medium text-gray-200">Active Sessions</h3>
                  <span class="text-2xl font-bold text-netflix-red">{{ stats().sessions }}</span>
                </div>
                <p class="mt-1 text-gray-400">Current viewers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class AdminComponent {
  stats = signal({
    users: 2547,
    revenue: 125.4,
    sessions: 1832,
  });

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}