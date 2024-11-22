import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserModalComponent } from '../../../components/user-modal.component';
import { DeleteModalComponent } from '../../../components/delete-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserModalComponent, DeleteModalComponent],
  template: `
    <div class="min-h-screen bg-netflix-black">
      <nav class="bg-netflix-black shadow border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <span class="text-netflix-red text-2xl font-bold">MYAPP</span>
              <h1 class="ml-8 text-xl font-medium text-gray-200">User Management</h1>
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

      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">Users</h2>
          <button
            (click)="openUserModal()"
            class="px-4 py-2 text-sm text-white bg-netflix-red rounded hover:bg-[#f40612]"
          >
            Add User
          </button>
        </div>

        <div class="bg-netflix-dark-gray rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr *ngFor="let user of users()" class="hover:bg-black/30">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img 
                      [src]="user.image" 
                      [alt]="user.firstName"
                      class="h-10 w-10 rounded-full object-cover"
                    >
                    <div class="ml-4">
                      <div class="text-sm font-medium text-white">
                        {{user.firstName}} {{user.lastName}}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-300">{{user.email}}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-300">{{user.phone}}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    (click)="openUserModal(user)"
                    class="text-netflix-red hover:text-red-400 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    (click)="openDeleteModal(user)"
                    class="text-gray-400 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <app-user-modal
        *ngIf="selectedModal()"
        [user]="selectedUser()!"
        (close)="selectedModal.set(false)"
        (save)="saveUser($event)"
      ></app-user-modal>

      <app-delete-modal
        *ngIf="userToDelete()"
        [message]="'Are you sure you want to delete ' + userToDelete()?.firstName + ' ' + userToDelete()?.lastName + '?'"
        (close)="userToDelete.set(undefined)"
        (confirm)="confirmDelete()"
      ></app-delete-modal>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users = signal<User[]>([]);
  selectedModal = signal<boolean>(false);
  selectedUser = signal<User | undefined>(undefined);
  userToDelete = signal<User | undefined>(undefined);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      response => this.users.set(response.users)
    );
  }

  openUserModal(user?: User) {
    this.selectedModal.set(true);
    this.selectedUser.set(user);
  }

  openDeleteModal(user: User) {
    this.userToDelete.set(user);
  }

  saveUser(userData: Partial<User>) {
    const currentUser = this.selectedUser();
    
    if (currentUser) {
      // Update existing user
      this.userService.updateUser(currentUser.id, userData).subscribe(() => {
        this.loadUsers();
        this.selectedUser.set(undefined);
      });
    } else {
      // Add new user
      this.userService.addUser(userData).subscribe(() => {
        this.loadUsers();
        this.selectedUser.set(undefined);
      });
    }
  }

  confirmDelete() {
    const user = this.userToDelete();
    if (user) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
        this.userToDelete.set(undefined);
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}