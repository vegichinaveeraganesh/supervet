import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AppointmentService } from '../../core/services/appointment.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="about-page">

      <!-- Hero -->
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-text">
            <span class="eyebrow">About SuperVets</span>
            <h1>
              A clinic that never closes,<br />
              <em>for pets who never warn you.</em>
            </h1>
            <p>
              SuperVets Pet Clinic &amp; Spa is a 24/7 veterinary clinic, pet spa and supply
              store in Seethammadhara, Visakhapatnam. Emergencies, check-ups, grooming and
              everyday pet needs are all handled under one roof.
            </p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="tel:+917842626060">Call +91 78426 26060</a>
              <a class="btn btn-ghost" routerLink="/services">Explore services</a>
            </div>
          </div>

          <aside class="visit-card" aria-label="Clinic details">
            <div class="open-pill"><span class="dot"></span> Open now · 24 hours, every day</div>
            <dl>
              <div>
                <dt>Address</dt>
                <dd>TPT Colony, P &amp; T Colony, Balayya Sastri Layout, Seethammadhara, Visakhapatnam, Andhra Pradesh 530013</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:+917842626060">+91 78426 26060</a></dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href="https://www.instagram.com/supervets_petclinic_spa/" target="_blank" rel="noopener">
                    &#64;supervets_petclinic_spa
                  </a>
                </dd>
              </div>
            </dl>
            <a class="btn btn-light"
               href="https://www.google.com/maps/search/?api=1&query=SuperVets+Pet+Clinic+and+Spa+Seethammadhara+Visakhapatnam"
               target="_blank" rel="noopener">Get directions</a>
          </aside>
        </div>
      </section>

      <!-- Story -->
      <section class="story">
        <div class="container story-grid">
          <div>
            <span class="eyebrow">Our story</span>
            <h2>Care that shows up at 3 a.m.</h2>
          </div>
          <div class="story-copy">
            <p>
              Pets get sick on weekends, at night and on holidays. We built SuperVets so
              families in Visakhapatnam always have somewhere to go: a clinic that is open
              around the clock, with experienced veterinarians on hand for emergencies,
              surgeries, vaccinations and recovery care.
            </p>
            <p>
              The same roof also holds a calm pet spa, comfortable boarding and a store with
              good food, treats and accessories. So routine care and the little things your
              pet needs don't mean three different trips.
            </p>
          </div>
        </div>
      </section>

      <!-- What we do -->
      <section class="offer">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow light">What we do</span>
            <h2>Four ways we look after your pet.</h2>
          </div>

          <div class="offer-grid">
            <article class="offer-card">
              <div class="icon-box"><app-icon name="heart" size="24" color="#E4572E"></app-icon></div>
              <h3>Emergency &amp; medical care</h3>
              <p>24/7 emergency treatment, surgeries, vaccinations and recovery care from experienced veterinarians.</p>
            </article>

            <article class="offer-card">
              <div class="icon-box"><app-icon name="scissors" size="24" color="#E4572E"></app-icon></div>
              <h3>Pet spa &amp; grooming</h3>
              <p>Stress-free dog styling and specialised cat grooming, done gently so pets leave relaxed.</p>
            </article>

            <article class="offer-card">
              <div class="icon-box"><app-icon name="shield" size="24" color="#E4572E"></app-icon></div>
              <h3>Boarding &amp; daycare</h3>
              <p>Climate-controlled overnight boarding with round-the-clock medical supervision.</p>
            </article>

            <article class="offer-card">
              <div class="icon-box"><app-icon name="flask" size="24" color="#E4572E"></app-icon></div>
              <h3>Pet store</h3>
              <p>Premium pet food, treats and accessories, available whenever you visit the clinic.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Principles -->
      <section class="principles">
        <div class="container principles-grid">
          <div class="principle">
            <h3>Always open</h3>
            <p>Open 24 hours, Monday to Sunday. Emergencies are never turned away or scheduled for later.</p>
          </div>
          <div class="principle">
            <h3>Gentle by default</h3>
            <p>Calm handling and patient grooming, because a relaxed pet is easier to treat and happier to return.</p>
          </div>
          <div class="principle">
            <h3>Care that continues</h3>
            <p>From surgery to recovery to boarding, the same team follows your pet through the whole journey.</p>
          </div>
        </div>
      </section>

      <!-- Doctors -->
      <section class="team">
        <div class="container">
          <div class="section-head left">
            <span class="eyebrow">Meet the vets</span>
            <h2>The doctors behind the clinic.</h2>
          </div>

          <div class="team-grid">
            <article class="doc-card">
              <div class="avatar">S</div>
              <div>
                <h3>Dr. Sravya</h3>
                <p>Veterinarian · Emergency &amp; medical care</p>
              </div>
            </article>
            <article class="doc-card">
              <div class="avatar">SS</div>
              <div>
                <h3>Dr. Sai Srinivas</h3>
                <p>Veterinarian · Emergency &amp; medical care</p>
              </div>
            </article>
            <a class="doc-card more" routerLink="/doctors">
              <div>
                <h3>See the full team</h3>
                <p>Specialties, experience and availability</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="container cta-box">
          <div>
            <h2>When every second matters, we're here.</h2>
            <p>Call us any time of day. For emergencies, call before you travel so the team can prepare.</p>
          </div>
          <div class="cta-actions">
            <a class="btn btn-primary" href="tel:+917842626060">Call now</a>
            <a class="btn btn-ghost-light" routerLink="/contact">Contact us</a>
          </div>
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

    .about-page { background: #FFFFFF; color: var(--ink); }

    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

    h1, h2, h3 { font-family: var(--serif); letter-spacing: -0.01em; margin: 0; }
    h1 em { font-style: italic; color: var(--orange); font-weight: 500; }
    p { line-height: 1.65; }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--orange);
      margin-bottom: 14px;
    }
    .eyebrow::before {
      content: '';
      width: 28px;
      height: 2px;
      background: currentColor;
    }
    .eyebrow.light { color: #F6A98F; }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 13px 26px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      border: 1.5px solid transparent;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .btn:focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }
    .btn-primary { background: var(--orange); color: #fff; }
    .btn-primary:hover { background: var(--orange-dark); }
    .btn-ghost { border-color: var(--green-900); color: var(--green-900); }
    .btn-ghost:hover { background: var(--green-900); color: #fff; }
    .btn-light { background: #fff; color: var(--green-900); }
    .btn-light:hover { background: var(--green-100); }
    .btn-ghost-light { border-color: rgba(255,255,255,0.5); color: #fff; }
    .btn-ghost-light:hover { background: rgba(255,255,255,0.12); }

    /* Hero */
    .hero { background: var(--green-50); padding: 72px 0 80px; }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 56px;
      align-items: center;
    }
    .hero-text h1 { font-size: clamp(2.3rem, 4.6vw, 3.7rem); line-height: 1.08; font-weight: 700; color: var(--green-900); }
    .hero-text p { font-size: 1.05rem; color: var(--muted); max-width: 560px; margin: 20px 0 28px; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

    .visit-card {
      background: var(--green-900);
      color: #fff;
      border-radius: 28px;
      padding: 30px;
      box-shadow: 0 24px 48px rgba(11, 58, 44, 0.18);
    }
    .open-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.1);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 22px;
    }
    .open-pill .dot { width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; }
    .visit-card dl { margin: 0 0 24px; display: grid; gap: 18px; }
    .visit-card dt { font-size: 0.78rem; color: #9FC7B6; margin-bottom: 3px; }
    .visit-card dd { margin: 0; font-size: 0.95rem; line-height: 1.5; }
    .visit-card a:not(.btn) { color: #fff; text-decoration: underline; text-underline-offset: 3px; }

    /* Story */
    .story { padding: 88px 0 72px; }
    .story-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 56px; align-items: start; }
    .story h2 { font-size: clamp(1.9rem, 3.4vw, 2.7rem); line-height: 1.12; color: var(--green-900); }
    .story-copy p { font-size: 1.02rem; color: var(--muted); margin: 0 0 18px; max-width: 640px; }

    /* Offer */
    .offer { background: var(--green-900); color: #fff; padding: 80px 0; }
    .section-head { max-width: 640px; margin: 0 auto 44px; text-align: center; }
    .section-head.left { margin-left: 0; text-align: left; }
    .section-head h2 { font-size: clamp(1.8rem, 3.2vw, 2.5rem); line-height: 1.15; }
    .offer .section-head { text-align: left; margin-left: 0; }

    .offer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .offer-card {
      background: var(--green-800);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 22px;
      padding: 26px 22px;
    }
    .icon-box {
      width: 48px; height: 48px;
      border-radius: 14px;
      background: rgba(228, 87, 46, 0.14);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 18px;
    }
    .offer-card h3 { font-size: 1.15rem; margin-bottom: 8px; }
    .offer-card p { margin: 0; font-size: 0.9rem; color: #BCD6CA; }

    /* Principles */
    .principles { padding: 80px 0 40px; }
    .principles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
    .principle { border-top: 2px solid var(--green-900); padding-top: 18px; }
    .principle h3 { font-size: 1.3rem; color: var(--green-900); margin-bottom: 8px; }
    .principle p { margin: 0; color: var(--muted); font-size: 0.95rem; }

    /* Team */
    .team { padding: 56px 0 80px; }
    .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .doc-card {
      display: flex; align-items: center; gap: 16px;
      background: var(--green-50);
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 22px;
      text-decoration: none;
      color: inherit;
    }
    .doc-card h3 { font-size: 1.1rem; color: var(--green-900); }
    .doc-card p { margin: 4px 0 0; font-size: 0.85rem; color: var(--muted); line-height: 1.4; }
    .avatar {
      width: 56px; height: 56px; flex-shrink: 0;
      border-radius: 50%;
      background: var(--green-900);
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--serif);
      font-size: 1.1rem;
      font-weight: 600;
    }
    .doc-card.more { background: #fff; border-style: dashed; }
    .doc-card.more:hover { border-color: var(--orange); }
    .doc-card.more:focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }

    /* CTA */
    .cta { padding: 0 0 88px; }
    .cta-box {
      background: var(--green-900);
      color: #fff;
      border-radius: 32px;
      padding: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
      max-width: 1232px;
    }
    .cta-box h2 { font-size: clamp(1.7rem, 3vw, 2.3rem); margin-bottom: 8px; }
    .cta-box p { margin: 0; color: #BCD6CA; max-width: 520px; }
    .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }

    @media (max-width: 1024px) {
      .hero-grid, .story-grid { grid-template-columns: 1fr; gap: 36px; }
      .offer-grid { grid-template-columns: repeat(2, 1fr); }
      .team-grid, .principles-grid { grid-template-columns: 1fr; }
      .cta-box { flex-direction: column; align-items: flex-start; padding: 36px 28px; }
    }

    @media (max-width: 640px) {
      .hero { padding: 48px 0 56px; }
      .offer-grid { grid-template-columns: 1fr; }
      .story, .offer { padding: 56px 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .btn { transition: none; }
    }
  `]
})
export class AboutComponent {
  constructor(public aptService: AppointmentService) { }
}