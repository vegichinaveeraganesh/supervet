import { Injectable, signal } from '@angular/core';
import { Pet, MedicalRecord, VaccinationRecord } from '../models/pet.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class PetService {
  private petsSignal = signal<Pet[]>([
    {
      id: 'pet-1',
      ownerId: 'usr-1',
      name: 'Bruno',
      species: 'Dog',
      breed: 'Golden Retriever',
      gender: 'Male',
      age: '2.5 Years',
      weight: 29.5,
      weightUnit: 'kg',
      color: 'Honey Golden',
      microchipId: '985141002348911',
      allergies: ['Chicken Byproducts', 'Pollen'],
      isNeutered: true,
      dietaryNotes: 'High-protein grain-free kibble twice daily with omega-3 salmon oil.',
      medicalHistory: [
        {
          id: 'med-1',
          date: new Date('2026-07-14'),
          doctorId: 'doc-1',
          doctorName: 'Dr. Priya Sharma',
          diagnosis: 'Mild Ear Canal Erythema',
          treatment: 'Topical antibacterial / antifungal drops for 7 days.',
          notes: 'Ear canal clean and clear at follow-up check.'
        }
      ],
      vaccinationRecords: [
        {
          id: 'vac-1',
          vaccineName: 'Rabies (Defensor 3)',
          dateAdministered: new Date('2026-02-10'),
          nextDueDate: new Date('2027-02-10'),
          administeredBy: 'Dr. Rajesh Kumar',
          batchNumber: 'RB-99201'
        },
        {
          id: 'vac-2',
          vaccineName: 'DHPPiL 7-in-1 Booster',
          dateAdministered: new Date('2026-02-10'),
          nextDueDate: new Date('2027-02-10'),
          administeredBy: 'Dr. Rajesh Kumar',
          batchNumber: 'DH-84721'
        },
        {
          id: 'vac-3',
          vaccineName: 'Kennel Cough (Bordetella)',
          dateAdministered: new Date('2026-05-18'),
          nextDueDate: new Date('2027-05-18'),
          administeredBy: 'Dr. Priya Sharma',
          batchNumber: 'KC-11029'
        }
      ],
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date()
    },
    {
      id: 'pet-2',
      ownerId: 'usr-1',
      name: 'Milo',
      species: 'Cat',
      breed: 'Persian Longhair',
      gender: 'Female',
      age: '1.5 Years',
      weight: 4.2,
      weightUnit: 'kg',
      color: 'Silver Chinchilla',
      microchipId: '985141009841203',
      allergies: ['Dairy'],
      isNeutered: true,
      dietaryNotes: 'Wet food salmon & tuna formulation, indoor urinary health support.',
      medicalHistory: [],
      vaccinationRecords: [
        {
          id: 'vac-4',
          vaccineName: 'Feline FVRCP (3-in-1)',
          dateAdministered: new Date('2026-03-01'),
          nextDueDate: new Date('2027-03-01'),
          administeredBy: 'Dr. Rajesh Kumar',
          batchNumber: 'FC-44391'
        },
        {
          id: 'vac-5',
          vaccineName: 'Feline Rabies',
          dateAdministered: new Date('2026-03-01'),
          nextDueDate: new Date('2027-03-01'),
          administeredBy: 'Dr. Rajesh Kumar',
          batchNumber: 'FR-91028'
        }
      ],
      createdAt: new Date('2025-06-15'),
      updatedAt: new Date()
    }
  ]);

  public pets = this.petsSignal.asReadonly();

  constructor(private toastService: ToastService) {}

  getPets(): Pet[] {
    return this.petsSignal();
  }

  getPetById(id: string): Pet | undefined {
    return this.petsSignal().find(p => p.id === id);
  }

  addPet(pet: Partial<Pet>): Pet {
    const newPet: Pet = {
      id: 'pet-' + Math.floor(100 + Math.random() * 900),
      ownerId: 'usr-1',
      name: pet.name || 'Unnamed Pet',
      species: pet.species || 'Dog',
      breed: pet.breed || 'Mixed',
      gender: pet.gender || 'Male',
      age: pet.age || '1 Year',
      weight: pet.weight || 5,
      weightUnit: 'kg',
      color: pet.color || 'Brown',
      allergies: pet.allergies || [],
      medicalHistory: [],
      vaccinationRecords: [],
      isNeutered: pet.isNeutered ?? false,
      dietaryNotes: pet.dietaryNotes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.petsSignal.update(pets => [...pets, newPet]);
    this.toastService.success(
      'Pet Added!',
      `${newPet.name} has been added to your SuperVet pet profile.`
    );
    return newPet;
  }

  addVaccineRecord(petId: string, record: Omit<VaccinationRecord, 'id'>) {
    const vacId = 'vac-' + Math.random().toString(36).substring(2, 7);
    this.petsSignal.update(pets =>
      pets.map(p => {
        if (p.id === petId) {
          return {
            ...p,
            vaccinationRecords: [...p.vaccinationRecords, { ...record, id: vacId }]
          };
        }
        return p;
      })
    );
    this.toastService.success('Vaccine Logged', `Vaccine record updated successfully.`);
  }
}
