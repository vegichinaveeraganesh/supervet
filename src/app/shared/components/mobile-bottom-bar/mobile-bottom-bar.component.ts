import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { AppointmentService } from '../../../core/services/appointment.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-mobile-bottom-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './mobile-bottom-bar.component.html',
  styleUrl: './mobile-bottom-bar.component.scss'
})
export class MobileBottomBarComponent {
  constructor(
    public aptService: AppointmentService,
    public cartService: CartService,
    public authService: AuthService
  ) {}
}
