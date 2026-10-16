import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IconComponent } from '../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

import { DoctorService } from '../../core/services/doctor.service';
import { ServiceService } from '../../core/services/service.service';
import { ProductService } from '../../core/services/product.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { CartService } from '../../core/services/cart.service';
import { MockDataService } from '../../core/services/mock-data.service';

import { Doctor } from '../../core/models/doctor.model';
import { Product } from '../../core/models/product.model';
import { VetService } from '../../core/models/service.model';

interface HomeService {
  title: string;
  route: string;
  cardImage: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    IconComponent,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredDoctors: Doctor[] = [];
  featuredProducts: Product[] = [];
  specialtyTreatments: VetService[] = [];
  testimonials: any[] = [];
  faqs: FAQ[] = [];

  testimonialIndex = 0;

  readonly species = [
    'Dogs', 'Cats', 'Rabbits', 'Birds', 'Hamsters', 'Guinea pigs', 'Exotic pets'
  ];

  readonly stats = [
    { value: '24/7', label: 'Emergency & ICU care' },
    { value: '10,000+', label: 'Pets treated' },
    { value: '15+', label: 'Years of experience' },
    { value: '8', label: 'Specialist services' }
  ];

  readonly steps = [
    { title: 'Book', text: 'Pick a service and time online, or call us.' },
    { title: 'Examine', text: 'A full check-up with clear, honest answers.' },
    { title: 'Treat', text: 'Diagnostics, treatment or surgery under one roof.' },
    { title: 'Follow up', text: 'Care plans and reminders until they are fully well.' }
  ];

  services: HomeService[] = [
    { title: 'General Consultation', route: '/services/general-consultation', cardImage: 'general-consultation.png' },
    { title: 'Vaccination & Preventive Care', route: '/services/vaccination', cardImage: 'vaccination.png' },
    { title: 'Surgery & Orthopedics', route: '/services/surgery', cardImage: 'surgery.png' },
    { title: 'Emergency & Critical Care', route: '/services/emergency', cardImage: 'emergency.png' },
    { title: 'Diagnostic & Imaging', route: '/services/diagnostics', cardImage: 'diagnostics.png' },
    { title: 'Grooming & Spa', route: '/services/grooming', cardImage: 'grooming.png' },
    { title: 'Dental Care', route: '/services/dental', cardImage: 'dental.png' },
    { title: 'Pharmacy & Nutrition', route: '/services/pharmacy', cardImage: 'pharmacy.png' }
  ];

  readonly careHighlights = [
    { icon: 'heart-pulse', title: 'Compassionate care', text: 'Thoughtful treatment tailored to each pet.' },
    { icon: 'shield', title: 'Preventive focus', text: 'Helping pets stay healthy, not just recover.' },
    { icon: 'clock', title: 'Emergency support', text: 'Contact our team when urgent care is needed.' },
    { icon: 'sparkles', title: 'Complete wellness', text: 'From medical care to grooming and nutrition.' }
  ];

  constructor(
    public aptService: AppointmentService,
    public cartService: CartService,
    public doctorService: DoctorService,
    public serviceService: ServiceService,
    public productService: ProductService,
    private mockData: MockDataService
  ) {
    this.featuredDoctors = this.mockData.getDoctors().slice(0, 4);
    this.featuredProducts = this.mockData.getProducts().slice(0, 3);
    this.specialtyTreatments = this.mockData.getServices();
    this.testimonials = this.mockData.getTestimonials();

    this.faqs = this.mockData.getFAQs()
      .slice(0, 6)
      .map(f => ({ ...f, isOpen: !!f.isOpen }));
  }

  get activeTestimonials(): any[] {
    if (!this.testimonials.length) return [];

    return Array.from(
      { length: Math.min(3, this.testimonials.length) },
      (_, i) => this.testimonials[(this.testimonialIndex + i) % this.testimonials.length]
    );
  }

  moveTestimonials(direction: number): void {
    if (this.testimonials.length) {
      this.testimonialIndex =
        (this.testimonialIndex + direction + this.testimonials.length) % this.testimonials.length;
    }
  }

  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    }));
  }
}