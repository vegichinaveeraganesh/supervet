import { Injectable, signal, computed } from '@angular/core';
import { VetService, ServiceCategory } from '../models/service.model';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private servicesSignal = signal<VetService[]>([]);
  public services = this.servicesSignal.asReadonly();

  public categories = computed<string[]>(() => {
    const list = Array.from(new Set(this.servicesSignal().map(s => s.category)));
    return ['All', ...list];
  });

  constructor(private mockData: MockDataService) {
    this.servicesSignal.set(this.mockData.getServices());
  }

  getServices(): VetService[] {
    return this.servicesSignal();
  }

  getPopularServices(): VetService[] {
    return this.servicesSignal().filter(s => s.isPopular);
  }

  getSpecialtyTreatments(): VetService[] {
    return this.servicesSignal();
  }

  getServiceBySlug(slug: string): VetService | undefined {
    return this.servicesSignal().find(s => s.slug === slug);
  }

  getServiceById(id: string): VetService | undefined {
    return this.servicesSignal().find(s => s.id === id);
  }

  filterServices(category?: string, query?: string): VetService[] {
    let result = this.servicesSignal();

    if (category && category !== 'All') {
      result = result.filter(s => s.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    return result;
  }
}
