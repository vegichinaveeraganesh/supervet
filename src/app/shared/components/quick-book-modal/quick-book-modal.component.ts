import { Component, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { ServiceService } from '../../../core/services/service.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-quick-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './quick-book-modal.component.html',
  styleUrl: './quick-book-modal.component.scss'
})
export class QuickBookModalComponent {
  readonly species = [
    { value: 'Dog', label: 'Dog', emoji: '🐶' },
    { value: 'Cat', label: 'Cat', emoji: '🐱' },
    { value: 'Bird', label: 'Bird', emoji: '🦜' },
    { value: 'Rabbit', label: 'Rabbit / small pet', emoji: '🐰' },
    { value: 'Exotic', label: 'Exotic', emoji: '🦎' },
  ];

  readonly timeSlots = [
    '09:00 AM - 09:30 AM',
    '10:30 AM - 11:00 AM',
    '12:00 PM - 12:30 PM',
    '03:00 PM - 03:30 PM',
    '05:30 PM - 06:00 PM',
    '07:00 PM - 07:30 PM',
  ];

  petSpecies = 'Dog';
  petName = '';
  selectedService = 'General Health Consultation';
  selectedDoctor = 'Any Available Specialist';
  bookDate: string = '';
  timeSlot = '10:30 AM - 11:00 AM';
  notes = '';
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(
    public aptService: AppointmentService,
    public doctorService: DoctorService,
    public serviceService: ServiceService
  ) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    this.bookDate = d.toISOString().split('T')[0];

    // Listen for prefill values
    effect(() => {
      const s = this.aptService.selectedPreFillService();
      if (s) this.selectedService = s;
      const doc = this.aptService.selectedPreFillDoctor();
      if (doc) this.selectedDoctor = doc;
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.aptService.isQuickBookOpen()) this.aptService.closeQuickBook();
  }

  onServiceChange() { }

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.petName.trim() || !this.bookDate) return;

    this.aptService.createAppointment({
      petName: `${this.petName.trim()} (${this.petSpecies})`,
      serviceName: this.selectedService,
      doctorName: this.selectedDoctor,
      timeSlot: this.timeSlot,
      date: new Date(this.bookDate),
      notes: this.notes,
      amount: 800
    });
    this.aptService.closeQuickBook();
  }
}