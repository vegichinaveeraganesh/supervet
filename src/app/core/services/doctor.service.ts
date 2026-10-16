import { Injectable, signal, computed } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private doctorsSignal = signal<Doctor[]>([]);
  public doctors = this.doctorsSignal.asReadonly();

  public specialties = computed(() => {
    const set = new Set<string>();
    this.doctorsSignal().forEach(doc => {
      doc.specialties.forEach(s => set.add(s));
    });
    return Array.from(set);
  });

  constructor(private mockData: MockDataService) {
    this.doctorsSignal.set(this.mockData.getDoctors());
  }

  getDoctors(): Doctor[] {
    return this.doctorsSignal();
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctorsSignal().find(d => d.id === id);
  }

  getDoctorsBySpecialty(specialty: string): Doctor[] {
    if (!specialty || specialty === 'All') return this.doctorsSignal();
    return this.doctorsSignal().filter(d =>
      d.specialties.some(s => s.toLowerCase() === specialty.toLowerCase())
    );
  }

  getEmergencyDoctors(): Doctor[] {
    return this.doctorsSignal().filter(d => d.isEmergencyDoctor);
  }

  getFeaturedDoctors(): Doctor[] {
    return this.doctorsSignal().slice(0, 4);
  }

  searchDoctors(query: string, specialty?: string): Doctor[] {
    let result = this.doctorsSignal();
    if (specialty && specialty !== 'All') {
      result = result.filter(d =>
        d.specialties.some(s => s.toLowerCase() === specialty.toLowerCase())
      );
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.primarySpecialty.toLowerCase().includes(q) ||
          d.qualification.toLowerCase().includes(q)
      );
    }
    return result;
  }
}
