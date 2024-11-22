import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-black flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-no-repeat bg-center bg-cover">
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      <div class="relative max-w-md w-full space-y-8 p-12 bg-black bg-opacity-75 rounded">
        <div>
          <h2 class="text-3xl font-bold text-white">Sign In</h2>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="mt-1 block w-full p-4 rounded bg-[#333] text-white border-0 focus:ring-2 focus:ring-netflix-red"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="mt-1 block w-full p-4 rounded bg-[#333] text-white border-0 focus:ring-2 focus:ring-netflix-red"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              [disabled]="!loginForm.valid"
              class="w-full py-4 px-4 border border-transparent rounded text-base font-medium text-white bg-netflix-red hover:bg-[#f40612] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-netflix-red disabled:opacity-50"
            >
              Sign In
            </button>
          </div>
          <div *ngIf="errorMessage()" class="text-netflix-red text-sm text-center">
            {{ errorMessage() }}
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.router.navigate([user.role === 'admin' ? '/admin' : '/dashboard']);
        },
        error: () => {
          this.errorMessage.set('Invalid email or password');
        }
      });
    }
  }
}