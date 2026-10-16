import { Injectable, signal, computed } from '@angular/core';
import { User, Address } from '../models/user.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>({
    id: 'usr-1',
    name: 'Ganesh Vegi',
    email: 'ganesh@supervet.com',
    phone: '+91 98765 43210',
    role: 'user',
    pets: [],
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        street: 'Flat 402, Royal Palms, Banjara Hills Rd 12',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        isDefault: true
      }
    ],
    isVerified: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date()
  });

  public currentUser = this.userSignal.asReadonly();
  public isAuthenticated = computed(() => this.userSignal() !== null);
  public isAuthModalOpen = signal<boolean>(false);
  public authMode = signal<'login' | 'register'>('login');

  constructor(private toastService: ToastService) {}

  openAuth(mode: 'login' | 'register' = 'login') {
    this.authMode.set(mode);
    this.isAuthModalOpen.set(true);
  }

  closeAuth() {
    this.isAuthModalOpen.set(false);
  }

  login(email: string, pass: string): boolean {
    this.userSignal.set({
      id: 'usr-1',
      name: email.split('@')[0].toUpperCase() || 'Pet Parent',
      email: email,
      phone: '+91 98765 43210',
      role: 'user',
      pets: [],
      addresses: [],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.isAuthModalOpen.set(false);
    this.toastService.success('Welcome Back!', `Logged in successfully as ${this.userSignal()?.name}`);
    return true;
  }

  register(name: string, email: string, phone: string): boolean {
    this.userSignal.set({
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name: name,
      email: email,
      phone: phone,
      role: 'user',
      pets: [],
      addresses: [],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.isAuthModalOpen.set(false);
    this.toastService.success('Account Created!', `Welcome to SuperVet family, ${name}!`);
    return true;
  }

  logout() {
    this.userSignal.set(null);
    this.toastService.info('Signed Out', 'You have been logged out of SuperVet.');
  }
}
