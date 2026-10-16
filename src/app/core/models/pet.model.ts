export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  photo?: string;
  species: PetSpecies;
  breed: string;
  gender: 'Male' | 'Female';
  dob?: Date;
  age?: string;
  weight?: number;
  weightUnit?: 'kg' | 'lbs';
  color?: string;
  microchipId?: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  vaccinationRecords: VaccinationRecord[];
  isNeutered?: boolean;
  dietaryNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PetSpecies = 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Exotic';

export interface MedicalRecord {
  id: string;
  date: Date;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  prescription?: Prescription[];
  notes?: string;
  followUpDate?: Date;
  attachments?: string[];
}

export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  dateAdministered: Date;
  nextDueDate?: Date;
  batchNumber?: string;
  administeredBy: string;
  notes?: string;
}

export interface Prescription {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}
