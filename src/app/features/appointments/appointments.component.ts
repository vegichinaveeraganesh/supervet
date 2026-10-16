import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';
import { DoctorService } from '../../core/services/doctor.service';
import { ServiceService } from '../../core/services/service.service';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="appointments-page">
      <section class="page-hero">
        <div class="container">
          <span class="hero-badge">Clinical Appointment System</span>
          <h1>Book Veterinary Consultation</h1>
          <p>Schedule an in-clinic consultation with top specialists in Hyderabad.</p>
        </div>
      </section>

      <section class="wizard-section">
        <div class="container">
          <div class="wizard-card">
            <!-- Step Indicators -->
            <div class="steps-nav">
              <div class="step-nav-item" [class.active]="currentStep === 1" [class.completed]="currentStep > 1">
                <div class="step-num">1</div>
                <span>Service</span>
              </div>
              <div class="step-line" [class.filled]="currentStep > 1"></div>

              <div class="step-nav-item" [class.active]="currentStep === 2" [class.completed]="currentStep > 2">
                <div class="step-num">2</div>
                <span>Doctor</span>
              </div>
              <div class="step-line" [class.filled]="currentStep > 2"></div>

              <div class="step-nav-item" [class.active]="currentStep === 3" [class.completed]="currentStep > 3">
                <div class="step-num">3</div>
                <span>Date & Time</span>
              </div>
              <div class="step-line" [class.filled]="currentStep > 3"></div>

              <div class="step-nav-item" [class.active]="currentStep === 4" [class.completed]="currentStep > 4">
                <div class="step-num">4</div>
                <span>Pet Details</span>
              </div>
              <div class="step-line" [class.filled]="currentStep > 4"></div>

              <div class="step-nav-item" [class.active]="currentStep === 5">
                <div class="step-num">5</div>
                <span>Confirm</span>
              </div>
            </div>

            <!-- Step 1: Service Selection -->
            @if (currentStep === 1) {
              <div class="step-content">
                <div class="step-header">
                  <h2>Step 1: Choose Specialty or Department</h2>
                  <p>Select the clinical service your pet requires.</p>
                </div>

                <div class="selection-grid">
                  @for (svc of serviceService.getServices(); track svc.id) {
                    <div
                      class="select-card"
                      [class.selected]="selectedService?.id === svc.id"
                      (click)="selectedService = svc"
                    >
                      <div class="select-icon-box">
                        <app-icon [name]="svc.icon" size="24" color="#1261A8"></app-icon>
                      </div>
                      <div class="select-info">
                        <h4>{{ svc.name }}</h4>
                        <span class="cat">{{ svc.category }}</span>
                        <p>{{ svc.shortDescription }}</p>
                      </div>
                      <div class="radio-circle"></div>
                    </div>
                  }
                </div>

                <div class="wizard-actions">
                  <div></div>
                  <button class="btn btn-primary" [disabled]="!selectedService" (click)="currentStep = 2">
                    <span>Next: Choose Doctor</span>
                    <app-icon name="arrow-right" size="16" color="#FFFFFF"></app-icon>
                  </button>
                </div>
              </div>
            }

            <!-- Step 2: Doctor Selection -->
            @if (currentStep === 2) {
              <div class="step-content">
                <div class="step-header">
                  <h2>Step 2: Choose Specialist Doctor</h2>
                  <p>Select a specialist for {{ selectedService?.name }}</p>
                </div>

                <div class="selection-grid">
                  <div
                    class="select-card"
                    [class.selected]="selectedDoctor === null"
                    (click)="selectedDoctor = null"
                  >
                    <div class="select-icon-box">
                      <app-icon name="zap" size="24" color="#1261A8"></app-icon>
                    </div>
                    <div class="select-info">
                      <h4>Any Available Specialist Doctor</h4>
                      <span class="cat">Fastest Availability (Recommended)</span>
                      <p>Assign the best available on-duty senior veterinary doctor.</p>
                    </div>
                    <div class="radio-circle"></div>
                  </div>

                  @for (doc of doctorService.getDoctors(); track doc.id) {
                    <div
                      class="select-card"
                      [class.selected]="selectedDoctor?.id === doc.id"
                      (click)="selectedDoctor = doc"
                    >
                      <div class="select-icon-box">
                        <app-icon name="stethoscope" size="24" color="#1261A8"></app-icon>
                      </div>
                      <div class="select-info">
                        <h4>{{ doc.name }}</h4>
                        <span class="cat">{{ doc.primarySpecialty }} • {{ doc.experienceText }} exp</span>
                        <p>₹{{ doc.consultationFee }} Consultation Fee</p>
                      </div>
                      <div class="radio-circle"></div>
                    </div>
                  }
                </div>

                <div class="wizard-actions">
                  <button class="btn btn-secondary" (click)="currentStep = 1">Back</button>
                  <button class="btn btn-primary" (click)="currentStep = 3">
                    <span>Next: Date & Time</span>
                    <app-icon name="arrow-right" size="16" color="#FFFFFF"></app-icon>
                  </button>
                </div>
              </div>
            }

            <!-- Step 3: Date & Slot Selection -->
            @if (currentStep === 3) {
              <div class="step-content">
                <div class="step-header">
                  <h2>Step 3: Select Date & Time Slot</h2>
                  <p>Pick a convenient schedule for your visit.</p>
                </div>

                <div class="date-slot-layout">
                  <div class="date-picker-box">
                    <label>Appointment Date</label>
                    <input type="date" [(ngModel)]="bookingDate" [min]="todayDate" class="date-input" />
                  </div>

                  <div class="slots-box">
                    <label>Available Slots for {{ bookingDate }}</label>
                    <div class="slots-grid">
                      @for (slot of timeSlots; track slot) {
                        <button
                          class="slot-btn"
                          [class.selected]="selectedSlot === slot"
                          (click)="selectedSlot = slot"
                        >
                          <app-icon name="clock" size="14"></app-icon>
                          <span>{{ slot }}</span>
                        </button>
                      }
                    </div>
                  </div>
                </div>

                <div class="wizard-actions">
                  <button class="btn btn-secondary" (click)="currentStep = 2">Back</button>
                  <button class="btn btn-primary" [disabled]="!selectedSlot" (click)="currentStep = 4">
                    <span>Next: Pet Details</span>
                    <app-icon name="arrow-right" size="16" color="#FFFFFF"></app-icon>
                  </button>
                </div>
              </div>
            }

            <!-- Step 4: Pet & Parent Details -->
            @if (currentStep === 4) {
              <div class="step-content">
                <div class="step-header">
                  <h2>Step 4: Pet & Medical Details</h2>
                  <p>Tell us a little about your pet.</p>
                </div>

                <div class="form-grid">
                  <div class="form-group">
                    <label>Pet Species</label>
                    <select [(ngModel)]="petSpecies">
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Exotic">Exotic</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Pet Name</label>
                    <input type="text" [(ngModel)]="petName" placeholder="e.g. Bruno" />
                  </div>

                  <div class="form-group">
                    <label>Breed</label>
                    <input type="text" [(ngModel)]="petBreed" placeholder="e.g. Golden Retriever" />
                  </div>

                  <div class="form-group">
                    <label>Pet Age / Gender</label>
                    <input type="text" [(ngModel)]="petAgeGender" placeholder="e.g. 2 Years, Male" />
                  </div>

                  <div class="form-group full-width">
                    <label>Reason for Visit / Symptoms</label>
                    <textarea
                      [(ngModel)]="symptoms"
                      rows="3"
                      placeholder="Describe what your pet is experiencing or specific medical checkup required..."
                    ></textarea>
                  </div>
                </div>

                <div class="wizard-actions">
                  <button class="btn btn-secondary" (click)="currentStep = 3">Back</button>
                  <button class="btn btn-primary" [disabled]="!petName" (click)="currentStep = 5">
                    <span>Review & Confirm</span>
                    <app-icon name="arrow-right" size="16" color="#FFFFFF"></app-icon>
                  </button>
                </div>
              </div>
            }

            <!-- Step 5: Review & Confirmation -->
            @if (currentStep === 5) {
              <div class="step-content">
                @if (!bookingConfirmed) {
                  <div class="step-header">
                    <h2>Step 5: Review & Confirm Appointment</h2>
                    <p>Please check your appointment summary before final confirmation.</p>
                  </div>

                  <div class="review-box">
                    <div class="review-row">
                      <span class="lbl">Department / Service:</span>
                      <strong>{{ selectedService?.name }}</strong>
                    </div>
                    <div class="review-row">
                      <span class="lbl">Specialist Doctor:</span>
                      <strong>{{ selectedDoctor ? selectedDoctor.name : 'Any Available Senior Specialist' }}</strong>
                    </div>
                    <div class="review-row">
                      <span class="lbl">Date & Time:</span>
                      <strong>{{ bookingDate }} at {{ selectedSlot }}</strong>
                    </div>
                    <div class="review-row">
                      <span class="lbl">Pet Details:</span>
                      <strong>{{ petName }} ({{ petSpecies }}, {{ petBreed || 'Mixed' }})</strong>
                    </div>
                    <div class="review-row">
                      <span class="lbl">Consultation Fee:</span>
                      <strong>₹{{ selectedDoctor ? selectedDoctor.consultationFee : 800 }} (Pay at Clinic)</strong>
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn btn-secondary" (click)="currentStep = 4">Back</button>
                    <button class="btn btn-confirm" (click)="confirmBooking()">
                      <app-icon name="check-circle" size="18" color="#FFFFFF"></app-icon>
                      <span>Confirm & Book Appointment</span>
                    </button>
                  </div>
                } @else {
                  <div class="confirmed-box">
                    <div class="success-icon-wrap">
                      <app-icon name="check-circle" size="64" color="#10B981"></app-icon>
                    </div>
                    <h2>Appointment Confirmed!</h2>
                    <p class="ref-badge">Booking ID: #{{ confirmedId }}</p>
                    <p class="sub-msg">
                      We have sent the confirmation SMS & WhatsApp details. Please arrive 10 minutes prior to your slot at Road No. 12, Banjara Hills, Hyderabad.
                    </p>

                    <div class="confirmed-actions">
                      <button class="btn btn-primary" (click)="goToDashboard()">
                        <span>View in Pet Medical Dashboard</span>
                      </button>
                      <button class="btn btn-secondary" (click)="resetWizard()">
                        <span>Book Another Appointment</span>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .appointments-page {
      background: #F8FBFE;
      padding-bottom: 80px;
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .page-hero {
      background: linear-gradient(135deg, #073B6F 0%, #1261A8 100%);
      color: #FFFFFF;
      padding: 50px 0;
      text-align: center;

      .hero-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 4px 14px;
        border-radius: 999px;
        margin-bottom: 10px;
        text-transform: uppercase;
      }

      h1 {
        font-size: 2.4rem;
        color: #FFFFFF;
        font-weight: 900;
        margin-bottom: 8px;
      }

      p {
        font-size: 1rem;
        color: #E2E8F0;
      }
    }

    .wizard-section {
      margin-top: -30px;

      .wizard-card {
        background: #FFFFFF;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 20px 48px rgba(7, 59, 111, 0.1);
        border: 1px solid #E2E8F0;
      }
    }

    .steps-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;

      .step-nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;

        .step-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #64748B;
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span {
          font-size: 0.78rem;
          color: #64748B;
          font-weight: 600;
        }

        &.active {
          .step-num {
            background: #1261A8;
            color: #FFFFFF;
          }
          span {
            color: #1261A8;
            font-weight: 700;
          }
        }

        &.completed {
          .step-num {
            background: #10B981;
            color: #FFFFFF;
          }
        }
      }

      .step-line {
        flex: 1;
        height: 2px;
        background: #E2E8F0;
        margin: 0 8px;
        margin-bottom: 20px;

        &.filled {
          background: #10B981;
        }
      }
    }

    .step-content {
      .step-header {
        margin-bottom: 28px;

        h2 {
          font-size: 1.4rem;
          color: #073B6F;
          font-weight: 800;
          margin-bottom: 4px;
        }

        p {
          font-size: 0.9rem;
          color: #64748B;
          margin: 0;
        }
      }
    }

    .selection-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;

      .select-card {
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 16px;
        padding: 18px;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;

        &:hover {
          border-color: #CBD5E1;
          background: #FFFFFF;
        }

        &.selected {
          border-color: #1261A8;
          background: #F0F7FF;

          .radio-circle {
            border-color: #1261A8;
            background: #1261A8;
          }
        }

        .select-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .select-info {
          flex: 1;

          h4 {
            font-size: 1rem;
            color: #073B6F;
            font-weight: 700;
            margin-bottom: 2px;
          }

          .cat {
            font-size: 0.75rem;
            color: #1261A8;
            font-weight: 700;
            display: block;
            margin-bottom: 4px;
          }

          p {
            font-size: 0.8rem;
            color: #64748B;
            margin: 0;
            line-height: 1.35;
          }
        }

        .radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #CBD5E1;
          flex-shrink: 0;
        }
      }
    }

    .date-slot-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 32px;
      margin-bottom: 32px;

      .date-picker-box, .slots-box {
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
        }
      }

      .date-input {
        padding: 12px 14px;
        border: 1.5px solid #E2E8F0;
        border-radius: 12px;
        font-size: 0.95rem;
        outline: none;
      }

      .slots-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;

        .slot-btn {
          padding: 12px;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;

          &:hover {
            border-color: #1261A8;
          }

          &.selected {
            background: #1261A8;
            color: #FFFFFF;
            border-color: #1261A8;
          }
        }
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;

      .full-width {
        grid-column: span 2;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;

        label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
        }

        input, select, textarea {
          padding: 12px 14px;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          font-size: 0.92rem;
          font-family: inherit;
          outline: none;
          background: #FFFFFF;

          &:focus {
            border-color: #1261A8;
          }
        }
      }
    }

    .review-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 32px;

      .review-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;

        .lbl {
          color: #64748B;
        }

        strong {
          color: #073B6F;
        }
      }
    }

    .wizard-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      border-top: 1px solid #F1F5F9;

      .btn {
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.92rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: none;

        &.btn-primary {
          background: #1261A8;
          color: #FFFFFF;
          &:disabled { opacity: 0.5; cursor: not-allowed; }
          &:hover:not(:disabled) { background: #073B6F; }
        }

        &.btn-secondary {
          background: #F1F5F9;
          color: #475569;
          &:hover { background: #E2E8F0; }
        }

        &.btn-confirm {
          background: #10B981;
          color: #FFFFFF;
          &:hover { background: #059669; }
        }
      }
    }

    .confirmed-box {
      text-align: center;
      padding: 40px 20px;

      .success-icon-wrap {
        margin-bottom: 16px;
      }

      h2 {
        font-size: 1.8rem;
        color: #073B6F;
        font-weight: 800;
        margin-bottom: 8px;
      }

      .ref-badge {
        display: inline-block;
        background: #EAF5FF;
        color: #1261A8;
        font-weight: 800;
        font-size: 0.95rem;
        padding: 6px 16px;
        border-radius: 999px;
        margin-bottom: 16px;
      }

      .sub-msg {
        font-size: 0.95rem;
        color: #64748B;
        max-width: 540px;
        margin: 0 auto 32px;
        line-height: 1.6;
      }

      .confirmed-actions {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      }
    }

    @media (max-width: 768px) {
      .selection-grid, .date-slot-layout, .form-grid {
        grid-template-columns: 1fr !important;
      }
      .form-grid .full-width {
        grid-column: span 1 !important;
      }
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  currentStep = 1;
  selectedService: any = null;
  selectedDoctor: any = null;
  bookingDate: string = '';
  selectedSlot: string = '10:30 AM - 11:00 AM';
  todayDate: string = '';

  petSpecies = 'Dog';
  petName = 'Bruno';
  petBreed = 'Golden Retriever';
  petAgeGender = '2.5 Years, Male';
  symptoms = '';

  bookingConfirmed = false;
  confirmedId = '';

  timeSlots = [
    '09:00 AM - 09:30 AM',
    '10:30 AM - 11:00 AM',
    '11:45 AM - 12:15 PM',
    '02:30 PM - 03:00 PM',
    '04:15 PM - 04:45 PM',
    '06:00 PM - 06:30 PM'
  ];

  constructor(
    public serviceService: ServiceService,
    public doctorService: DoctorService,
    public aptService: AppointmentService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    this.bookingDate = d.toISOString().split('T')[0];
    this.todayDate = new Date().toISOString().split('T')[0];

    this.selectedService = this.serviceService.getServices()[0];
  }

  confirmBooking() {
    const apt = this.aptService.createAppointment({
      petName: `${this.petName} (${this.petSpecies})`,
      serviceName: this.selectedService?.name || 'General Consultation',
      doctorName: this.selectedDoctor ? this.selectedDoctor.name : 'Senior Specialist Doctor',
      timeSlot: this.selectedSlot,
      date: new Date(this.bookingDate),
      notes: this.symptoms,
      amount: this.selectedDoctor ? this.selectedDoctor.consultationFee : 800
    });

    this.confirmedId = apt.id;
    this.bookingConfirmed = true;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  resetWizard() {
    this.currentStep = 1;
    this.bookingConfirmed = false;
  }
}
