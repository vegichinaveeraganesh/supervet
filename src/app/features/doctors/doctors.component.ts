import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../core/services/doctor.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { Doctor } from '../../core/models/doctor.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="doctors-page">

      <!-- Hero -->
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Meet the vets</span>
          <h1>Trusted hands, <em>kind hearts.</em></h1>
          <p>
            The veterinarians and specialists at SuperVets Pet Clinic &amp; Spa in
            Visakhapatnam, caring for your companion day and night.
          </p>
        </div>
      </section>

      <!-- Filters -->
      <section class="filter-bar-section">
        <div class="container filter-row">
          <label class="search-input-wrap">
            <app-icon name="search" size="18" color="#5C6F67"></app-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="filterDoctors()"
              placeholder="Search by doctor name or specialty"
              aria-label="Search doctors"
            />
          </label>

          <div class="specialty-pills" role="group" aria-label="Specialties">
            <button
              type="button"
              class="spec-btn"
              [class.active]="selectedSpecialty === 'All'"
              [attr.aria-pressed]="selectedSpecialty === 'All'"
              (click)="selectSpecialty('All')"
            >
              All doctors ({{ doctorService.getDoctors().length }})
            </button>
            @for (spec of doctorService.specialties(); track spec) {
              <button
                type="button"
                class="spec-btn"
                [class.active]="selectedSpecialty === spec"
                [attr.aria-pressed]="selectedSpecialty === spec"
                (click)="selectSpecialty(spec)"
              >
                {{ spec }}
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Doctors -->
      <section class="doctors-grid-section">
        <div class="container">
          @if (filteredDoctors.length === 0) {
            <div class="no-results">
              <h3>No doctors match your search</h3>
              <p>Try another name or specialty, or view all doctors.</p>
              <button type="button" class="reset-btn" (click)="searchQuery = ''; selectSpecialty('All')">
                Show all doctors
              </button>
            </div>
          } @else {
            <div class="doctors-grid">
              @for (doc of filteredDoctors; track doc.id) {
                <article class="doctor-profile-card">
                  <div class="avatar-col">
                    <div class="avatar-large">
                      <app-icon name="stethoscope" size="44" color="#FFFFFF"></app-icon>
                    </div>
                    @if (doc.isEmergencyDoctor) {
                      <span class="er-badge">24/7 ER on call</span>
                    }
                    <div class="rating-box">
                      <span>★ {{ doc.rating }}</span>
                      <small>{{ doc.reviewCount }} reviews</small>
                    </div>
                  </div>

                  <div class="details-col">
                    <div class="doc-title-row">
                      <div>
                        <span class="dept-tag">{{ doc.primarySpecialty }}</span>
                        <h2>{{ doc.name }}</h2>
                        <span class="qual-text">{{ doc.qualification }}</span>
                      </div>

                      <div class="fee-badge">
                        <span class="fee-lbl">Consultation fee</span>
                        <strong class="fee-amt">₹{{ doc.consultationFee }}</strong>
                      </div>
                    </div>

                    <p class="bio-text">{{ doc.bio }}</p>

                    <div class="tags-row">
                      <div class="info-tag">
                        <app-icon name="clock" size="14" color="#0F4A39"></app-icon>
                        <span>{{ doc.experienceText }} of experience</span>
                      </div>
                      <div class="info-tag">
                        <app-icon name="globe" size="14" color="#0F4A39"></app-icon>
                        <span>Speaks {{ doc.languages.join(', ') }}</span>
                      </div>
                    </div>

                    <div class="specialties-chips">
                      @for (s of doc.specialties; track s) {
                        <span class="chip-item">{{ s }}</span>
                      }
                    </div>

                    <div class="card-actions">
                      <button type="button" class="book-btn" (click)="aptService.openQuickBook(undefined, doc.name)">
                        <app-icon name="calendar" size="16" color="#FFFFFF"></app-icon>
                        <span>Book with {{ doc.name }}</span>
                      </button>
                    </div>
                  </div>
                </article>
              }
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      --green-900: #0B3A2C;
      --green-800: #0F4A39;
      --green-100: #E3F3EB;
      --green-50: #F1F8F4;
      --orange: #E4572E;
      --orange-dark: #C94624;
      --ink: #12261F;
      --muted: #5C6F67;
      --line: #D9E7DF;
      --serif: 'Fraunces', 'Playfair Display', Georgia, serif;
      display: block;
    }

    * { box-sizing: border-box; }
    button, input { font: inherit; }
    button { cursor: pointer; }
    h1, h2, h3 { font-family: var(--serif); letter-spacing: -0.01em; margin: 0; }

    .doctors-page { background: #fff; color: var(--ink); padding-bottom: 80px; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--orange);
      margin-bottom: 14px;

      &::before { content: ''; width: 28px; height: 2px; background: currentColor; }
    }

    /* Hero */
    .page-hero {
      background: var(--green-50);
      padding: 64px 0 56px;

      h1 {
        font-size: clamp(2.2rem, 4.2vw, 3.4rem);
        line-height: 1.1;
        font-weight: 700;
        color: var(--green-900);
        margin-bottom: 14px;

        em { font-style: italic; font-weight: 500; color: var(--orange); }
      }

      p { font-size: 1.02rem; line-height: 1.65; color: var(--muted); max-width: 600px; margin: 0; }
    }

    /* Filters */
    .filter-bar-section {
      background: #fff;
      border-bottom: 1px solid var(--line);
      padding: 22px 0;

      .filter-row { display: flex; flex-direction: column; gap: 14px; }

      .search-input-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 52px;
        padding: 0 18px;
        border: 1.5px solid var(--line);
        border-radius: 999px;
        background: #fff;

        &:focus-within {
          border-color: var(--green-800);
          box-shadow: 0 0 0 3px rgba(15, 74, 57, 0.12);
        }

        input {
          flex: 1;
          min-width: 0;
          border: none;
          background: none;
          outline: none;
          font-size: 0.92rem;
          color: var(--ink);

          &::placeholder { color: #7F918A; }
        }
      }

      .specialty-pills {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px;
        scrollbar-width: none;

        &::-webkit-scrollbar { display: none; }
      }

      .spec-btn {
        background: #fff;
        border: 1.5px solid var(--line);
        color: var(--green-900);
        font-size: 0.85rem;
        font-weight: 600;
        padding: 10px 18px;
        border-radius: 999px;
        white-space: nowrap;
        transition: background 0.2s, color 0.2s, border-color 0.2s;

        &:hover { background: var(--green-50); border-color: var(--green-800); }
        &.active { background: var(--green-900); border-color: var(--green-900); color: #fff; }
        &:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }
      }
    }

    /* Cards */
    .doctors-grid-section { padding: 40px 0; }
    .doctors-grid { display: flex; flex-direction: column; gap: 22px; }

    .doctor-profile-card {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 32px;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 30px;
      transition: box-shadow 0.25s ease, border-color 0.25s ease;

      &:hover { box-shadow: 0 16px 36px rgba(11, 58, 44, 0.1); border-color: #BFD6CA; }
    }

    .avatar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 10px;

      .avatar-large {
        width: 112px; height: 112px;
        border-radius: 50% 50% 28px 28px;
        background: var(--green-900);
        display: flex; align-items: center; justify-content: center;
      }

      .er-badge {
        background: #FDECE6;
        color: var(--orange-dark);
        font-size: 0.74rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 999px;
      }

      .rating-box {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--green-900);

        small { display: block; margin-top: 2px; font-size: 0.75rem; font-weight: 500; color: var(--muted); }
      }
    }

    .details-col { display: flex; flex-direction: column; min-width: 0; }

    .doc-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 14px;

      .dept-tag { font-size: 0.85rem; font-weight: 600; color: var(--orange); }

      h2 { font-size: 1.6rem; font-weight: 700; color: var(--green-900); margin: 4px 0 2px; }

      .qual-text { font-size: 0.85rem; color: var(--muted); font-weight: 600; }
    }

    .fee-badge {
      text-align: right;
      background: var(--green-50);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 10px 16px;
      white-space: nowrap;

      .fee-lbl { display: block; font-size: 0.72rem; color: var(--muted); }
      .fee-amt { font-family: var(--serif); font-size: 1.3rem; color: var(--green-900); }
    }

    .bio-text { font-size: 0.93rem; line-height: 1.65; color: var(--muted); margin: 0 0 16px; max-width: 720px; }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      margin-bottom: 14px;

      .info-tag { display: flex; align-items: center; gap: 6px; font-size: 0.83rem; font-weight: 600; color: var(--green-900); }
    }

    .specialties-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 22px;

      .chip-item {
        background: var(--green-100);
        color: var(--green-900);
        font-size: 0.78rem;
        font-weight: 600;
        padding: 5px 12px;
        border-radius: 999px;
      }
    }

    .card-actions { margin-top: auto; }

    .book-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      border-radius: 999px;
      background: var(--orange);
      color: #fff;
      font-weight: 600;
      font-size: 0.92rem;
      padding: 13px 26px;
      transition: background 0.2s;

      &:hover { background: var(--orange-dark); }
      &:focus-visible { outline: 3px solid var(--green-900); outline-offset: 3px; }
    }

    /* Empty */
    .no-results {
      text-align: center;
      padding: 64px 20px;
      background: var(--green-50);
      border: 1px solid var(--line);
      border-radius: 24px;

      h3 { font-size: 1.3rem; color: var(--green-900); margin-bottom: 8px; }
      p { color: var(--muted); margin: 0 0 20px; }
    }

    .reset-btn {
      border: 0;
      border-radius: 999px;
      background: var(--orange);
      color: #fff;
      font-weight: 600;
      padding: 12px 24px;

      &:hover { background: var(--orange-dark); }
    }

    @media (max-width: 768px) {
      .page-hero { padding: 44px 0 40px; }
      .doctor-profile-card { grid-template-columns: 1fr; gap: 20px; padding: 22px; }
      .avatar-col { flex-direction: row; flex-wrap: wrap; justify-content: flex-start; text-align: left; gap: 14px; }
      .avatar-col .avatar-large { width: 80px; height: 80px; }
      .doc-title-row { flex-direction: column; }
      .fee-badge { text-align: left; }
      .book-btn { width: 100%; justify-content: center; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; }
    }
  `]
})
export class DoctorsComponent implements OnInit {
  selectedSpecialty: string = 'All';
  searchQuery: string = '';
  filteredDoctors: Doctor[] = [];

  constructor(
    public doctorService: DoctorService,
    public aptService: AppointmentService
  ) { }

  ngOnInit() {
    this.filterDoctors();
  }

  selectSpecialty(spec: string) {
    this.selectedSpecialty = spec;
    this.filterDoctors();
  }

  filterDoctors() {
    this.filteredDoctors = this.doctorService.searchDoctors(
      this.searchQuery,
      this.selectedSpecialty
    );
  }
}