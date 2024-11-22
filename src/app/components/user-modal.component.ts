import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../services/user.service';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="elevation-4 rounded-lg max-w-2xl w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-high">{{ user ? 'Edit' : 'Add' }} User</h2>
            <button 
              (click)="close.emit()"
              class="text-text-medium hover:text-text-high transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-text-medium mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  class="input-dark"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-text-medium mb-1">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  class="input-dark"
                >
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-text-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="input-dark"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-text-medium mb-1">Phone</label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                class="input-dark"
              >
            </div>

            <div>
              <label for="image" class="block text-sm font-medium text-text-medium mb-1">Image URL</label>
              <input
                id="image"
                type="url"
                formControlName="image"
                class="input-dark"
              >
            </div>

            <div class="flex justify-end space-x-4">
              <button
                type="button"
                (click)="close.emit()"
                class="px-4 py-2 rounded-lg text-text-medium hover:text-text-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="!userForm.valid"
                class="btn-primary disabled:opacity-50"
              >
                {{ user ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class UserModalComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<User>>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
    }
  }
}