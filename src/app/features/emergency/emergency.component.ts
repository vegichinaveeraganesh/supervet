import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="emergency">
      <!-- HERO -->
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <span class="live">
              <span class="dot"></span>
              Trauma and ICU team on duty now, 24/7
            </span>

            <h1>When every second matters, <em>we're ready.</em></h1>
            <p>
              If your pet is in critical condition, bring them straight to our hospital.
              Our trauma surgeons, ICU nurses and oxygen therapy units work with zero-wait triage.
            </p>

            <div class="actions">
              <a href="tel:+919100088899" class="call">
                <span class="call-icon"><app-icon name="phone-call" size="22" color="#FFFFFF"></app-icon></span>
                <span>
                  <small>Emergency hotline, 24/7</small>
                  <strong>+91 91000 88899</strong>
                </span>
              </a>

              <a href="https://maps.google.com" target="_blank" rel="noopener" class="directions">
                <span class="dir-icon"><app-icon name="map-pin" size="22" color="#0F3D33"></app-icon></span>
                <span>
                  <small>Hospital location</small>
                  <strong>Banjara Hills, Road 12</strong>
                </span>
              </a>
            </div>
          </div>

          <aside class="readiness" aria-label="Emergency readiness">
            <h2>What's ready when you arrive</h2>
            <ul>
              <li><app-icon name="check" size="16" color="#BFE3D1"></app-icon>Triage nurse at the entrance</li>
              <li><app-icon name="check" size="16" color="#BFE3D1"></app-icon>Oxygen chamber and ICU bay</li>
              <li><app-icon name="check" size="16" color="#BFE3D1"></app-icon>On-call trauma surgeon</li>
              <li><app-icon name="check" size="16" color="#BFE3D1"></app-icon>In-house diagnostics and imaging</li>
            </ul>
          </aside>
        </div>
      </section>

      <!-- TRIAGE -->
      <section class="triage">
        <div class="wrap">
          <header class="head">
            <h2>Is your pet facing an <em>emergency?</em></h2>
            <p>If you see any of these signs, don't wait. Call us and come in right away.</p>
          </header>

          <div class="triage-grid">
            @for (group of triage; track group.title) {
              <article class="t-card">
                <div class="t-head">
                  <span class="t-icon"><app-icon [name]="group.icon" size="24" color="#C8372D"></app-icon></span>
                  <h3>{{ group.title }}</h3>
                </div>
                <ul>
                  @for (item of group.items; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- FIRST AID -->
      <section class="aid">
        <div class="wrap">
          <div class="aid-card">
            <header class="head left">
              <h2>First aid on the way to <em>SuperVet</em></h2>
              <p>Four things that protect your pet during the journey. Stay calm, and call us while you travel.</p>
            </header>

            <ol class="steps">
              @for (s of steps; track s.title; let i = $index) {
                <li class="step">
                  <span class="num">{{ i + 1 }}</span>
                  <h4>{{ s.title }}</h4>
                  <p>{{ s.text }}</p>
                </li>
              }
            </ol>

            <p class="note">
              This guide is for transit only and doesn't replace professional care.
              Get your pet to a veterinarian as quickly as you safely can.
            </p>
          </div>
        </div>
      </section>

      <!-- MOBILE CALL BAR -->
      <a href="tel:+919100088899" class="sticky-call">
        <app-icon name="phone-call" size="20" color="#FFFFFF"></app-icon>
        Call emergency line
      </a>
    </div>
  `,
  styles: [`
    :host {
      --green-900: #0A2E26;
      --green-800: #0F3D33;
      --green-700: #17503F;
      --mint-100: #E8F4EE;
      --mint-50: #F3FAF6;
      --coral: #E8643C;
      --coral-dark: #CF512B;
      --alert: #C8372D;
      --ink: #16302A;
      --muted: #5B6F68;
      --line: #DCE9E2;
      --serif: 'Fraunces', 'Playfair Display', Georgia, serif;
      display: block;
    }

    .emergency { background: var(--mint-50); color: var(--ink); padding-bottom: 80px; }
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    a:focus-visible { outline: 2px solid var(--coral); outline-offset: 3px; }

    /* HERO */
    .hero { background: var(--green-800); color: #fff; padding: 72px 0; }
    .hero-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 56px; align-items: center; }

    .live {
      display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,.12);
      padding: 7px 16px; border-radius: 999px; font-size: .84rem; font-weight: 600; margin-bottom: 22px;
    }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: #FF6B5C; animation: pulse 1.8s infinite; }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255,107,92,.7); }
      70% { box-shadow: 0 0 0 10px rgba(255,107,92,0); }
      100% { box-shadow: 0 0 0 0 rgba(255,107,92,0); }
    }

    .hero h1 { font-family: var(--serif); font-size: clamp(2.3rem, 4.6vw, 3.7rem); line-height: 1.06; font-weight: 600; margin: 0 0 18px; color: #fff; }
    .hero h1 em { font-weight: 400; color: #BFE3D1; }
    .hero-copy > p { color: #CFE3DA; font-size: 1.05rem; line-height: 1.7; max-width: 600px; margin: 0 0 32px; }

    .actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .call, .directions {
      display: inline-flex; align-items: center; gap: 14px; padding: 14px 26px 14px 16px;
      border-radius: 999px; text-decoration: none; transition: transform .2s, background .2s;
    }
    .call small, .directions small { display: block; font-size: .76rem; margin-bottom: 2px; }
    .call strong, .directions strong { font-size: 1.15rem; font-weight: 700; }
    .call { background: var(--coral); color: #fff; }
    .call:hover { background: var(--coral-dark); transform: translateY(-2px); }
    .call small { color: #FFE3D8; }
    .call-icon, .dir-icon {
      width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none;
    }
    .call-icon { background: rgba(255,255,255,.2); }
    .directions { background: #fff; color: var(--green-800); }
    .directions:hover { background: var(--mint-100); transform: translateY(-2px); }
    .directions small { color: var(--muted); }
    .dir-icon { background: var(--mint-100); }

    .readiness { background: rgba(255,255,255,.07); border-radius: 26px; padding: 32px; }
    .readiness h2 { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; margin: 0 0 18px; color: #fff; }
    .readiness ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
    .readiness li { display: flex; align-items: center; gap: 12px; color: #E3F1EA; font-size: .95rem; }

    /* SECTION HEADERS */
    .head { text-align: center; max-width: 660px; margin: 0 auto 40px; }
    .head.left { text-align: left; margin: 0 0 32px; max-width: none; }
    .head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 600; line-height: 1.12; color: var(--green-800); margin: 0 0 10px; }
    .head h2 em { font-weight: 400; color: var(--green-700); }
    .head p { color: var(--muted); font-size: 1rem; line-height: 1.6; margin: 0; }

    /* TRIAGE */
    .triage { padding: 72px 0 40px; }
    .triage-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
    .t-card {
      background: #fff; border: 1px solid var(--line); border-left: 5px solid var(--alert);
      border-radius: 22px; padding: 28px 30px;
    }
    .t-head { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
    .t-icon { width: 46px; height: 46px; border-radius: 14px; background: #FBEAE8; display: flex; align-items: center; justify-content: center; flex: none; }
    .t-head h3 { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; color: var(--green-800); margin: 0; }
    .t-card ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 11px; }
    .t-card li { position: relative; padding-left: 20px; font-size: .92rem; line-height: 1.5; color: var(--muted); }
    .t-card li::before {
      content: ''; position: absolute; left: 0; top: .55em; width: 8px; height: 8px; border-radius: 50%; background: var(--alert);
    }

    /* FIRST AID */
    .aid { padding: 0 0 40px; }
    .aid-card { background: #fff; border: 1px solid var(--line); border-radius: 30px; padding: 48px; }
    .steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .step { background: var(--mint-50); border: 1px solid var(--line); border-radius: 20px; padding: 24px; }
    .num {
      width: 38px; height: 38px; border-radius: 50%; background: var(--green-800); color: #fff;
      display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-weight: 600; margin-bottom: 16px;
    }
    .step h4 { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: var(--green-800); margin: 0 0 8px; }
    .step p { font-size: .86rem; line-height: 1.6; color: var(--muted); margin: 0; }
    .note { margin: 28px 0 0; padding: 14px 20px; background: var(--mint-100); border-radius: 14px; color: var(--green-700); font-size: .86rem; line-height: 1.55; }

    .sticky-call { display: none; }

    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr; gap: 36px; }
      .steps { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 700px) {
      .hero { padding: 48px 0; }
      .triage-grid, .steps { grid-template-columns: 1fr; }
      .aid-card { padding: 28px 22px; }
      .call, .directions { width: 100%; }
      .sticky-call {
        display: flex; align-items: center; justify-content: center; gap: 10px;
        position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 50;
        background: var(--coral); color: #fff; text-decoration: none; font-weight: 700;
        padding: 16px; border-radius: 999px; box-shadow: 0 10px 28px rgba(0,0,0,.28);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .dot { animation: none; }
      * { transition: none !important; }
    }
  `]
})
export class EmergencyComponent {
  triage = [
    {
      icon: 'alert-triangle',
      title: 'Breathing difficulty and choking',
      items: [
        'Open-mouth breathing or gasping in cats',
        'Blue, purple or pale white gums',
        'Severe wheezing or continuous coughing',
        'Inability to stand or sudden collapse',
      ],
    },
    {
      icon: 'alert-circle',
      title: 'Toxic ingestion and poisoning',
      items: [
        'Chocolate, raisins, grapes or xylitol intake',
        'Rat poison, pesticide or insecticide exposure',
        'Human painkiller or prescription drug ingestion',
        'Continuous vomiting with blood or froth',
      ],
    },
    {
      icon: 'shield',
      title: 'Trauma, fractures and accidents',
      items: [
        'Hit by a car or a high fall',
        "Severe bleeding that won't stop with pressure",
        'Visible bone fracture or unnatural limb angle',
        'Deep animal bites or puncture wounds',
      ],
    },
    {
      icon: 'zap',
      title: 'Seizures and neurological distress',
      items: [
        'Violent tremors or seizures lasting over 2 minutes',
        'Unresponsiveness or extreme disorientation',
        'Sudden blindness or bumping into objects',
        'Severe head tilt with rapid eye darting',
      ],
    },
  ];

  steps = [
    {
      title: 'Keep the airway clear',
      text: 'If your pet is unconscious, gently pull the tongue forward and clear any vomit or mucus. Never put your hand in the mouth of a conscious, panicked pet.',
    },
    {
      title: 'Control bleeding',
      text: 'Press firmly with a clean cloth or towel over the wound. Avoid tight tourniquets unless our emergency doctor tells you to over the phone.',
    },
    {
      title: 'Limit movement',
      text: 'For a suspected spinal injury or fracture, carry your pet on a rigid board or firm cardboard, or wrap them snugly in a thick blanket.',
    },
    {
      title: 'Call ahead',
      text: 'Dial +91 91000 88899 so our trauma ICU and oxygen chamber are ready before you reach the emergency bay.',
    },
  ];
}