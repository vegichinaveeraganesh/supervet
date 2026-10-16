import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../core/services/pet.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/pet.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="dashboard-page">
      <!-- Top Banner -->
      <section class="dash-hero">
        <div class="container dash-hero-inner">
          <div class="user-greeting">
            <div class="user-avatar-circle">
              <app-icon name="user" size="32" color="#1261A8"></app-icon>
            </div>
            <div>
              <h1>Welcome, {{ authService.currentUser()?.name || 'Pet Parent' }}</h1>
              <p>SuperVet Pet Parent Portal • Hyderabad</p>
            </div>
          </div>

          <button class="btn btn-add-pet" (click)="showAddPetModal = true">
            <app-icon name="plus" size="18" color="#FFFFFF"></app-icon>
            <span>Add New Pet</span>
          </button>
        </div>
      </section>

      <!-- Dashboard Main -->
      <section class="dash-content-section">
        <div class="container">
          <div class="dash-grid">
            <!-- Left Column: Pets Profiles -->
            <div class="left-col">
              <div class="section-card">
                <div class="card-head-row">
                  <h3>🐾 My Registered Pets ({{ petService.pets().length }})</h3>
                </div>

                <div class="pets-cards-list">
                  @for (pet of petService.pets(); track pet.id) {
                    <div
                      class="pet-profile-summary"
                      [class.active]="selectedPet?.id === pet.id"
                      (click)="selectedPet = pet"
                    >
                      <div class="pet-icon-wrap">
                        <span class="pet-emoji">{{ pet.species === 'Dog' ? '🐶' : (pet.species === 'Cat' ? '🐱' : '🦜') }}</span>
                      </div>
                      <div class="pet-info-text">
                        <h4>{{ pet.name }}</h4>
                        <span class="pet-breed">{{ pet.breed }} ({{ pet.species }})</span>
                        <div class="pet-micro-meta">
                          <span>Age: {{ pet.age }}</span> • <span>Weight: {{ pet.weight }}kg</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Upcoming Appointments Card -->
              <div class="section-card">
                <div class="card-head-row">
                  <h3>🗓️ Scheduled Appointments</h3>
                  <button class="link-btn" (click)="aptService.openQuickBook()">+ Book New</button>
                </div>

                <div class="apt-list">
                  @for (apt of aptService.appointments(); track apt.id) {
                    <div class="apt-item-card">
                      <div class="apt-status-chip" [class.confirmed]="apt.status === 'Confirmed'">
                        {{ apt.status }}
                      </div>
                      <h4>{{ apt.serviceName }}</h4>
                      <p class="doc-line">{{ apt.doctorName }}</p>
                      <div class="apt-meta-row">
                        <span><app-icon name="calendar" size="13"></app-icon> {{ apt.date | date:'mediumDate' }}</span>
                        <span><app-icon name="clock" size="13"></app-icon> {{ apt.timeSlot }}</span>
                      </div>
                      <span class="pet-tag-apt">For: {{ apt.petName }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Right Column: Pet Details, Vaccinations & Medical Records -->
            <div class="right-col">
              @if (selectedPet) {
                <!-- Pet Detailed Header -->
                <div class="section-card pet-detail-header-card">
                  <div class="pet-header-flex">
                    <div class="pet-header-left">
                      <div class="huge-pet-avatar">
                        <span>{{ selectedPet.species === 'Dog' ? '🐶' : (selectedPet.species === 'Cat' ? '🐱' : '🦜') }}</span>
                      </div>
                      <div>
                        <h2>{{ selectedPet.name }}</h2>
                        <span class="breed-badge">{{ selectedPet.breed }} • {{ selectedPet.gender }}</span>
                        <div class="microchip-text" *ngIf="selectedPet.microchipId">
                          <app-icon name="shield" size="14" color="#10B981"></app-icon>
                          <span>Microchip: <strong>{{ selectedPet.microchipId }}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button class="btn btn-primary btn-quick-book-for-pet" (click)="aptService.openQuickBook(undefined, undefined)">
                      Book Appointment for {{ selectedPet.name }}
                    </button>
                  </div>

                  <!-- Pet Metrics Grid -->
                  <div class="pet-stats-row">
                    <div class="stat-pill">
                      <span class="stat-lbl">Age</span>
                      <strong>{{ selectedPet.age || '2 Years' }}</strong>
                    </div>
                    <div class="stat-pill">
                      <span class="stat-lbl">Weight</span>
                      <strong>{{ selectedPet.weight }} {{ selectedPet.weightUnit }}</strong>
                    </div>
                    <div class="stat-pill">
                      <span class="stat-lbl">Neutered</span>
                      <strong>{{ selectedPet.isNeutered ? 'Yes' : 'No' }}</strong>
                    </div>
                    <div class="stat-pill">
                      <span class="stat-lbl">Allergies</span>
                      <strong>{{ selectedPet.allergies.length > 0 ? selectedPet.allergies.join(', ') : 'None' }}</strong>
                    </div>
                  </div>
                </div>

                <!-- Vaccination Tracker Card -->
                <div class="section-card">
                  <div class="card-head-row">
                    <h3>💉 Vaccination Passport & History</h3>
                    <span class="vac-status-all">✓ Up to Date</span>
                  </div>

                  <div class="table-wrap">
                    <table class="vac-table">
                      <thead>
                        <tr>
                          <th>Vaccine Name</th>
                          <th>Administered Date</th>
                          <th>Next Due Date</th>
                          <th>Veterinarian</th>
                          <th>Batch No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (vac of selectedPet.vaccinationRecords; track vac.id) {
                          <tr>
                            <td><strong>{{ vac.vaccineName }}</strong></td>
                            <td>{{ vac.dateAdministered | date:'mediumDate' }}</td>
                            <td><span class="due-badge">{{ vac.nextDueDate | date:'mediumDate' }}</span></td>
                            <td>{{ vac.administeredBy }}</td>
                            <td><code>{{ vac.batchNumber || 'N/A' }}</code></td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Medical History Card -->
                <div class="section-card">
                  <div class="card-head-row">
                    <h3>📋 Clinical Consultations & Prescriptions</h3>
                  </div>

                  @if (selectedPet.medicalHistory.length === 0) {
                    <div class="empty-records">
                      <p>No past medical records logged for {{ selectedPet.name }}.</p>
                    </div>
                  } @else {
                    <div class="med-history-list">
                      @for (rec of selectedPet.medicalHistory; track rec.id) {
                        <div class="med-rec-item">
                          <div class="rec-date">{{ rec.date | date:'mediumDate' }}</div>
                          <div class="rec-body">
                            <h4>{{ rec.diagnosis }}</h4>
                            <span class="doc-credit">Doctor: {{ rec.doctorName }}</span>
                            <p class="treatment-text">{{ rec.treatment }}</p>
                            @if (rec.notes) {
                              <span class="rec-notes">Notes: {{ rec.notes }}</span>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Add New Pet Modal -->
      @if (showAddPetModal) {
        <div class="modal-backdrop" (click)="showAddPetModal = false"></div>
        <div class="add-pet-modal">
          <button class="modal-close" (click)="showAddPetModal = false">
            <app-icon name="x" size="20" color="#64748B"></app-icon>
          </button>

          <div class="modal-head">
            <h3>Register New Pet Patient</h3>
            <p>Create medical profile & vaccination passport for your pet.</p>
          </div>

          <form class="pet-form" (submit)="onAddPet($event)">
            <div class="form-row">
              <div class="form-group">
                <label>Species</label>
                <select [(ngModel)]="newPetSpecies" name="species">
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Exotic">Exotic</option>
                </select>
              </div>

              <div class="form-group">
                <label>Pet Name</label>
                <input type="text" [(ngModel)]="newPetName" name="name" placeholder="e.g. Leo" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Breed</label>
                <input type="text" [(ngModel)]="newPetBreed" name="breed" placeholder="e.g. Beagle" required />
              </div>

              <div class="form-group">
                <label>Gender</label>
                <select [(ngModel)]="newPetGender" name="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Age</label>
                <input type="text" [(ngModel)]="newPetAge" name="age" placeholder="e.g. 1 Year" />
              </div>

              <div class="form-group">
                <label>Weight (kg)</label>
                <input type="number" [(ngModel)]="newPetWeight" name="weight" placeholder="e.g. 12" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100">
              Save Pet Profile
            </button>
          </form>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-page {
      background: #F8FBFE;
      padding-bottom: 80px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .dash-hero {
      background: linear-gradient(135deg, #073B6F 0%, #1261A8 100%);
      color: #FFFFFF;
      padding: 40px 0;

      .dash-hero-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
      }

      .user-greeting {
        display: flex;
        align-items: center;
        gap: 16px;

        .user-avatar-circle {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          font-size: 1.8rem;
          color: #FFFFFF;
          font-weight: 800;
          margin-bottom: 2px;
        }

        p {
          font-size: 0.85rem;
          color: #E2E8F0;
          margin: 0;
        }
      }

      .btn-add-pet {
        background: #10B981;
        color: #FFFFFF;
        border: none;
        padding: 12px 22px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: background 0.2s;

        &:hover {
          background: #059669;
        }
      }
    }

    .dash-content-section {
      padding: 40px 0;

      .dash-grid {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 28px;
      }
    }

    .section-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
      margin-bottom: 24px;

      .card-head-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        padding-bottom: 12px;
        border-bottom: 1px solid #F1F5F9;

        h3 {
          font-size: 1.15rem;
          color: #073B6F;
          font-weight: 800;
          margin: 0;
        }

        .link-btn {
          background: none;
          border: none;
          color: #1261A8;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .vac-status-all {
          background: #ECFDF5;
          color: #059669;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
        }
      }
    }

    .pets-cards-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .pet-profile-summary {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px;
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #FFFFFF;
          border-color: #CBD5E1;
        }

        &.active {
          background: #F0F7FF;
          border-color: #1261A8;
        }

        .pet-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .pet-info-text {
          h4 {
            font-size: 1rem;
            color: #073B6F;
            font-weight: 700;
            margin-bottom: 2px;
          }

          .pet-breed {
            font-size: 0.78rem;
            color: #64748B;
            display: block;
            margin-bottom: 4px;
          }

          .pet-micro-meta {
            font-size: 0.72rem;
            color: #94A3B8;
          }
        }
      }
    }

    .apt-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .apt-item-card {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 14px;
        padding: 14px;
        position: relative;

        .apt-status-chip {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 999px;
          background: #FEF3C7;
          color: #D97706;

          &.confirmed {
            background: #ECFDF5;
            color: #059669;
          }
        }

        h4 {
          font-size: 0.95rem;
          color: #073B6F;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .doc-line {
          font-size: 0.8rem;
          color: #1261A8;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .apt-meta-row {
          display: flex;
          gap: 14px;
          font-size: 0.75rem;
          color: #64748B;
          margin-bottom: 6px;

          span {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }

        .pet-tag-apt {
          font-size: 0.72rem;
          color: #94A3B8;
          font-weight: 600;
        }
      }
    }

    .pet-detail-header-card {
      .pet-header-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 16px;

        .pet-header-left {
          display: flex;
          align-items: center;
          gap: 16px;

          .huge-pet-avatar {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            background: #EAF5FF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
          }

          h2 {
            font-size: 1.6rem;
            color: #073B6F;
            font-weight: 800;
            margin-bottom: 4px;
          }

          .breed-badge {
            font-size: 0.82rem;
            color: #1261A8;
            font-weight: 600;
          }

          .microchip-text {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.75rem;
            color: #475569;
            margin-top: 4px;
          }
        }

        .btn-quick-book-for-pet {
          padding: 10px 20px;
          border-radius: 10px;
          background: #1261A8;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;

          &:hover {
            background: #073B6F;
          }
        }
      }

      .pet-stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;

        .stat-pill {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 10px 14px;

          .stat-lbl {
            font-size: 0.7rem;
            color: #94A3B8;
            display: block;
            margin-bottom: 2px;
          }

          strong {
            font-size: 0.92rem;
            color: #152536;
          }
        }
      }
    }

    .table-wrap {
      overflow-x: auto;
    }

    .vac-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;

      th {
        text-align: left;
        padding: 10px 12px;
        background: #F8FAFC;
        color: #64748B;
        font-weight: 700;
        font-size: 0.78rem;
        border-bottom: 1.5px solid #E2E8F0;
      }

      td {
        padding: 12px;
        border-bottom: 1px solid #F1F5F9;
        color: #334155;

        .due-badge {
          background: #FEF3C7;
          color: #B45309;
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.75rem;
        }

        code {
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
      }
    }

    .med-history-list {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .med-rec-item {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 16px;
        padding: 14px;
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 14px;

        .rec-date {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 700;
        }

        .rec-body {
          h4 {
            font-size: 0.95rem;
            color: #073B6F;
            font-weight: 700;
            margin-bottom: 2px;
          }

          .doc-credit {
            font-size: 0.75rem;
            color: #1261A8;
            display: block;
            margin-bottom: 6px;
          }

          .treatment-text {
            font-size: 0.85rem;
            color: #475569;
            margin-bottom: 4px;
          }

          .rec-notes {
            font-size: 0.78rem;
            color: #94A3B8;
            font-style: italic;
          }
        }
      }
    }

    .empty-records {
      padding: 24px;
      text-align: center;
      color: #94A3B8;
      font-size: 0.9rem;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(7, 59, 111, 0.55);
      z-index: 10000;
    }

    .add-pet-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 480px;
      background: #FFFFFF;
      border-radius: 24px;
      padding: 32px;
      z-index: 10001;
      box-shadow: 0 24px 64px rgba(7, 59, 111, 0.25);

      .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #F1F5F9;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .modal-head {
        margin-bottom: 20px;

        h3 {
          font-size: 1.3rem;
          color: #073B6F;
          font-weight: 800;
          margin-bottom: 4px;
        }

        p {
          font-size: 0.85rem;
          color: #64748B;
          margin: 0;
        }
      }

      .pet-form {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;

          label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #1E293B;
          }

          input, select {
            padding: 10px 12px;
            border: 1.5px solid #E2E8F0;
            border-radius: 10px;
            font-size: 0.9rem;
            outline: none;
            background: #FFFFFF;
          }
        }

        .w-100 {
          margin-top: 8px;
          padding: 13px;
          border-radius: 12px;
          background: #1261A8;
          color: #FFFFFF;
          font-weight: 700;
          border: none;
          cursor: pointer;
          &:hover { background: #073B6F; }
        }
      }
    }

    @media (max-width: 900px) {
      .dash-grid {
        grid-template-columns: 1fr !important;
      }
      .pet-stats-row {
        grid-template-columns: 1fr 1fr !important;
      }
    }
  `]
})
export class DashboardComponent {
  selectedPet: Pet | null = null;
  showAddPetModal = false;

  newPetSpecies: any = 'Dog';
  newPetName = '';
  newPetBreed = '';
  newPetGender: any = 'Male';
  newPetAge = '';
  newPetWeight = 10;

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

  onAddPet(e: Event) {
    e.preventDefault();
    if (this.newPetName && this.newPetBreed) {
      const added = this.petService.addPet({
        name: this.newPetName,
        species: this.newPetSpecies,
        breed: this.newPetBreed,
        gender: this.newPetGender,
        age: this.newPetAge || '1 Year',
        weight: this.newPetWeight || 5
      });
      this.selectedPet = added;
      this.showAddPetModal = false;
      this.newPetName = '';
      this.newPetBreed = '';
    }
  }
}
