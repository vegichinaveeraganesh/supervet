import { Injectable, signal } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  public isQuickBookOpen = signal<boolean>(false);
  public selectedPreFillService = signal<string | null>(null);
  public selectedPreFillDoctor = signal<string | null>(null);

  private appointmentsSignal = signal<Appointment[]>([
    {
      id: 'apt-101',
      userId: 'usr-1',
      petId: 'pet-1',
      petName: 'Bruno (Golden Retriever)',
      doctorId: 'doc-1',
      doctorName: 'Dr. Priya Sharma',
      serviceId: 'svc-3',
      serviceName: 'Annual Booster Vaccination',
      type: 'Vaccination',
      status: 'Confirmed',
      date: new Date(Date.now() + 86400000 * 2),
      timeSlot: '10:30 AM - 11:00 AM',
      notes: 'Regular annual DHPPiL booster vaccination and general health screening.',
      amount: 1200,
      paymentStatus: 'Paid',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'apt-102',
      userId: 'usr-1',
      petId: 'pet-2',
      petName: 'Milo (Persian Cat)',
      doctorId: 'doc-2',
      doctorName: 'Dr. Rajesh Kumar',
      serviceId: 'svc-5',
      serviceName: 'Dermatology & Skin Check',
      type: 'Clinic Consultation',
      status: 'Scheduled',
      date: new Date(Date.now() + 86400000 * 5),
      timeSlot: '04:00 PM - 04:30 PM',
      notes: 'Mild scratching near ear fold and dandruff issues.',
      amount: 800,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  public appointments = this.appointmentsSignal.asReadonly();

  constructor(private toastService: ToastService) {}

  getAppointments(): Appointment[] {
    return this.appointmentsSignal();
  }

  createAppointment(aptData: Partial<Appointment>): Appointment {
    const newApt: Appointment = {
      id: 'apt-' + Math.floor(1000 + Math.random() * 9000),
      userId: aptData.userId || 'usr-1',
      petId: aptData.petId || 'pet-new',
      petName: aptData.petName || 'My Pet',
      doctorId: aptData.doctorId || 'doc-1',
      doctorName: aptData.doctorName || 'Dr. Specialist',
      serviceId: aptData.serviceId || 'svc-1',
      serviceName: aptData.serviceName || 'General Consultation',
      type: aptData.type || 'Clinic Consultation',
      status: 'Confirmed',
      date: aptData.date || new Date(),
      timeSlot: aptData.timeSlot || '11:00 AM - 11:30 AM',
      notes: aptData.notes || '',
      amount: aptData.amount || 800,
      paymentStatus: aptData.paymentStatus || 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.appointmentsSignal.update(list => [newApt, ...list]);
    this.toastService.success(
      'Appointment Booked!',
      `Confirmed for ${newApt.petName} with ${newApt.doctorName} on ${new Date(newApt.date).toLocaleDateString()}.`
    );

    return newApt;
  }

  cancelAppointment(id: string) {
    this.appointmentsSignal.update(list =>
      list.map(apt => (apt.id === id ? { ...apt, status: 'Cancelled' } : apt))
    );
    this.toastService.info('Appointment Cancelled', 'The appointment has been marked as cancelled.');
  }

  openQuickBook(serviceName?: string, doctorName?: string) {
    if (serviceName) this.selectedPreFillService.set(serviceName);
    if (doctorName) this.selectedPreFillDoctor.set(doctorName);
    this.isQuickBookOpen.set(true);
  }

  closeQuickBook() {
    this.isQuickBookOpen.set(false);
    this.selectedPreFillService.set(null);
    this.selectedPreFillDoctor.set(null);
  }
}
