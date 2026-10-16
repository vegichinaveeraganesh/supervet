export interface Doctor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  specialties: string[];
  primarySpecialty: string;
  experience: number;
  experienceText: string;
  bio: string;
  languages: string[];
  availableTimings: DoctorSchedule[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  isAvailable: boolean;
  isEmergencyDoctor: boolean;
  registrationNumber?: string;
  awards?: string[];
  publications?: string[];
  createdAt: Date;
}

export interface DoctorSchedule {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number;
  currentPatients: number;
}
