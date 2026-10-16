import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { VetService } from '../../core/models/service.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  selectedCategory = 'All';
  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredServices: VetService[] = [];
  private readonly assetBase = 'assets/images/services/';

  constructor(
    public serviceService: ServiceService,
    public aptService: AppointmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'All';
      this.applyFilters();
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredServices = this.serviceService.filterServices(this.selectedCategory, this.searchQuery);
  }

  resetFilters(): void {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.applyFilters();
  }

  getCardTheme(service: VetService, index: number): string {
    if (service.isEmergency) return 'theme-rose';
    const name = service.name.toLowerCase();
    if (name.includes('surg') || name.includes('ortho')) return 'theme-violet';
    if (name.includes('groom')) return 'theme-rose';
    if (name.includes('nutrition') || name.includes('pharma')) return 'theme-amber';
    if (name.includes('dental')) return 'theme-cyan';
    if (name.includes('diagnos') || name.includes('derma')) return 'theme-mint';
    return ['theme-blue', 'theme-mint', 'theme-violet', 'theme-cyan'][index % 4];
  }

  getServiceImage(service: VetService): string {
    const name = service.name.toLowerCase();
    const mapping: [string, string][] = [
      ['emergency', 'emergency.png'], ['vaccin', 'vaccination.png'],
      ['diagnos', 'diagnostics.png'], ['surg', 'surgery.png'],
      ['ortho', 'surgery.png'], ['consult', 'consultation.png'],
      ['groom', 'grooming.png'], ['dental', 'dental.png'],
      ['pharma', 'nutrition.png'], ['nutrition', 'nutrition.png'],
      ['imag', 'imaging.png'], ['ultrasound', 'imaging.png'],
      ['cardio', 'cardiology.png'], ['derma', 'dermatology.png'],
      ['ophthal', 'ophthalmology.png'], ['eye', 'ophthalmology.png']
    ];
    const found = mapping.find(([keyword]) => name.includes(keyword));
    return this.assetBase + (found?.[1] || 'consultation.png');
  }
}
