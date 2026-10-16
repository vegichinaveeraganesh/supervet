import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EmergencyStripComponent } from './shared/components/emergency-strip/emergency-strip.component';
import { MobileBottomBarComponent } from './shared/components/mobile-bottom-bar/mobile-bottom-bar.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';
import { AuthModalComponent } from './shared/components/auth-modal/auth-modal.component';
import { QuickBookModalComponent } from './shared/components/quick-book-modal/quick-book-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    EmergencyStripComponent,
    MobileBottomBarComponent,
    ToastComponent,
    CartDrawerComponent,
    AuthModalComponent,
    QuickBookModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SuperVet — Super Specialty Veterinary Hospital';
}
