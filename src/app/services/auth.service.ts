import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(subscriber => {
      const mockUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 'customer'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      this.currentUser.set(mockUser);
      subscriber.next(mockUser);
      subscriber.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}