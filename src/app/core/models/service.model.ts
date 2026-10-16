export interface VetService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  priceRange?: string;
  duration?: string;
  animalTypes: string[];
  isEmergency: boolean;
  isPopular: boolean;
  image?: string;
  relatedDoctorIds?: string[];
  features?: string[];
}

export type ServiceCategory =
  | 'Consultation'
  | 'Emergency'
  | 'Preventive Care'
  | 'Specialty'
  | 'Diagnostics'
  | 'Surgery'
  | 'Wellness'
  | 'Grooming';
