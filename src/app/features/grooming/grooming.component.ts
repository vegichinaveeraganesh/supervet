
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { GroomingPackage } from '../../core/models/grooming.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface SpaAddon {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  selected: boolean;
  color: string;
}

@Component({
  selector: 'app-grooming',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './grooming.component.html',
  styleUrl: './grooming.component.scss'
})
export class GroomingComponent {

  packages: GroomingPackage[] = [];
  selectedPackage: GroomingPackage | null = null;

  addons: SpaAddon[] = [
    {
      id: 1,
      name: 'Dental Cleaning',
      description: 'Gentle oral hygiene & fresh breath',
      price: 499,
      icon: 'smile',
      selected: false,
      color: 'lavender'
    },
    {
      id: 2,
      name: 'Anti-Tick & Flea Wash',
      description: 'Specialized parasite-care treatment',
      price: 399,
      icon: 'shield-check',
      selected: false,
      color: 'mint'
    },
    {
      id: 3,
      name: 'Paw Butter Massage',
      description: 'Deep moisturizing paw treatment',
      price: 199,
      icon: 'heart',
      selected: false,
      color: 'peach'
    },
    {
      id: 4,
      name: 'Ozone Spa Bath',
      description: 'Refreshing premium spa experience',
      price: 599,
      icon: 'droplets',
      selected: false,
      color: 'blue'
    }
  ];

  constructor(
    private mockData: MockDataService,
    public aptService: AppointmentService
  ) {
    this.packages = this.mockData.getGroomingPackages();
  }

  get packagePrice(): number {
    return Number(this.selectedPackage?.price ?? 0);
  }

  get addonsTotal(): number {
    return this.addons
      .filter(addon => addon.selected)
      .reduce((total, addon) => total + addon.price, 0);
  }

  get grandTotal(): number {
    return this.packagePrice + this.addonsTotal;
  }

  get selectedAddonsCount(): number {
    return this.addons.filter(addon => addon.selected).length;
  }

  toggleAddon(addon: SpaAddon): void {
    addon.selected = !addon.selected;
  }

  selectPackage(pkg: GroomingPackage): void {
    this.selectedPackage = pkg;
    document.getElementById('custom-spa')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  bookPackage(pkg: GroomingPackage): void {
    this.aptService.openQuickBook('Grooming: ' + pkg.name);
  }

  bookCustomSpa(): void {
    const selected = this.addons
      .filter(addon => addon.selected)
      .map(addon => addon.name);

    const service = [
      this.selectedPackage
        ? 'Grooming: ' + this.selectedPackage.name
        : 'Custom Grooming',
      ...selected
    ].join(' + ');

    this.aptService.openQuickBook(service);
  }

  scrollToPackages(): void {
    document.getElementById('spa-packages')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  getPackageIcon(index: number): string {
    return ['droplets', 'sparkles', 'crown', 'heart'][index % 4];
  }

  getPackageTheme(index: number): string {
    return ['blue', 'lavender', 'peach', 'mint'][index % 4];
  }
}
