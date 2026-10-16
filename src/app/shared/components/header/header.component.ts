
import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import { IconComponent } from '../icon/icon.component';

import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    IconComponent
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isScrolled = false;
  mobileMenuOpen = false;
  searchOpen = false;
  searchQuery = '';

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public aptService: AppointmentService,
    public serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  /* HEADER SCROLL EFFECT */

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  /* OPEN / CLOSE SEARCH */

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;

    if (this.searchOpen) {
      this.mobileMenuOpen = false;
    }
  }

  /* MOBILE MENU */

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      this.searchOpen = false;
    }
  }

  /* CLOSE ALL MENUS */

  closeMenus(): void {
    this.mobileMenuOpen = false;
    this.searchOpen = false;
  }

  /* SEARCH FUNCTION */

  onSearch(): void {
    const query = this.searchQuery.trim();

    if (!query) {
      return;
    }

    this.router.navigate(['/services'], {
      queryParams: {
        q: query
      }
    });

    this.searchQuery = '';
    this.closeMenus();
  }

  /* MOBILE APPOINTMENT */

  bookFromMobile(): void {
    this.closeMenus();
    this.aptService.openQuickBook();
  }

  /* CLOSE MENUS WITH ESCAPE */

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenus();
  }

  /* CLOSE MOBILE MENU ON DESKTOP RESIZE */

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 1250) {
      this.mobileMenuOpen = false;
    }
  }
}
