import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetService } from '../../core/services/pet.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';
import { Pet, PetSpecies } from '../../core/models/pet.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedPet: Pet | null = null;
  showAddPetModal = false;
  activeTab: 'vaccines' | 'consultations' | 'diet' = 'vaccines';

  speciesList: PetSpecies[] = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Exotic'];
  newPetSpecies: PetSpecies = 'Dog';
  newPetName = '';
  newPetBreed = '';
  newPetGender: 'Male' | 'Female' = 'Male';
  newPetAge = '';
  newPetWeight = 10;
  newPetNeutered = true;

  constructor(
    public petService: PetService,
    public aptService: AppointmentService,
    public authService: AuthService
  ) {
    const list = this.petService.getPets();
    if (list.length > 0) {
      this.selectedPet = list[0];
    }
  }

  setSpecies(sp: PetSpecies) {
    this.newPetSpecies = sp;
  }

  getPetEmoji(species: string): string {
    switch (species) {
      case 'Dog': return '🐶';
      case 'Cat': return '🐱';
      case 'Bird': return '🦜';
      case 'Rabbit': return '🐰';
      default: return '🐾';
    }
  }

  onAddPet(e: Event) {
    e.preventDefault();
    if (this.newPetName && this.newPetBreed) {
      const added = this.petService.addPet({
        name: this.newPetName.trim(),
        species: this.newPetSpecies,
        breed: this.newPetBreed.trim(),
        gender: this.newPetGender,
        age: this.newPetAge?.trim() || '1 Year',
        weight: Number(this.newPetWeight) || 5,
        isNeutered: this.newPetNeutered
      });
      this.selectedPet = added;
      this.showAddPetModal = false;
      this.newPetName = '';
      this.newPetBreed = '';
      this.newPetAge = '';
      this.newPetWeight = 10;
      this.newPetSpecies = 'Dog';
    }
  }
}
