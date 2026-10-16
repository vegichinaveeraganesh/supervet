import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./features/doctors/doctors.component').then(m => m.DoctorsComponent)
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./features/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  {
    path: 'grooming',
    loadComponent: () =>
      import('./features/grooming/grooming.component').then(m => m.GroomingComponent)
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./features/pet-store/pet-store.component').then(m => m.PetStoreComponent)
  },
  {
    path: 'emergency',
    loadComponent: () =>
      import('./features/emergency/emergency.component').then(m => m.EmergencyComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
