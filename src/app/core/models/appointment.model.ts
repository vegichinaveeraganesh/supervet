export interface Appointment {
  id: string;
  userId: string;
  petId: string;
  petName: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  type: AppointmentType;
  status: AppointmentStatus;
  date: Date;
  timeSlot: string;
  notes?: string;
  diagnosis?: string;
  prescription?: string;
  followUpDate?: Date;
  amount: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentType =
  | 'Clinic Consultation'
  | 'Emergency'
  | 'Grooming'
  | 'Vaccination'
  | 'Follow-up';

export type AppointmentStatus =
  | 'Scheduled'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'No Show';

export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded' | 'Failed';

export interface AppointmentBookingStep {
  step: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}
